import express, { Response, NextFunction } from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { 
  supabase, 
  supabaseAdmin, 
  getAuthenticatedSupabaseClient 
} from './supabase';
import { parseLabReport } from './parser';
import { AuthenticatedRequest, authenticateUser, optionalAuth } from './middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing middlewares
app.use(cors());
app.use(express.json());

// Setup Multer for secure memory-based file uploads (max 10MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF documents or images are accepted.'));
    }
  }
});

// Helper: Ensure the Supabase Storage Bucket exists
async function ensureStorageBucket() {
  try {
    const { data: buckets, error } = await supabaseAdmin.storage.listBuckets();
    if (error) {
      console.warn('Could not verify storage buckets:', error.message);
      return;
    }
    const bucketExists = buckets?.some(b => b.name === 'lab-reports');
    if (!bucketExists) {
      const { error: createError } = await supabaseAdmin.storage.createBucket('lab-reports', {
        public: true, // Make public for easy web access, or false if secured
      });
      if (createError) {
        console.error('Failed to auto-create lab-reports storage bucket:', createError.message);
      } else {
        console.log('Successfully initialized lab-reports storage bucket.');
      }
    }
  } catch (err: any) {
    console.error('Error verifying storage bucket:', err.message);
  }
}

// Ensure the bucket exists on server startup
ensureStorageBucket();

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================

// Register a new user
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || 'Patient',
        }
      }
    });

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json({
      message: 'Signup successful! Please check your email for a verification link.',
      user: data.user,
      session: data.session
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Log in an existing user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({
      message: 'Login successful',
      session: data.session,
      user: data.user
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Logout endpoint
app.post('/api/auth/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Get current session user details
app.get('/api/auth/me', authenticateUser, (req: AuthenticatedRequest, res) => {
  return res.status(200).json({ user: req.user });
});

// ==========================================
// LAB REPORTS & AI ENDPOINTS
// ==========================================

// Upload a PDF report and parse it with Gemini
app.post('/api/reports/upload', optionalAuth, upload.single('report'), async (req: AuthenticatedRequest, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a blood work PDF document or image.' });
  }

  const userId = req.user?.id || null; // Allow anonymous for MVP

  try {
    // 1. Upload the PDF file to Supabase Storage
    const folder = userId || 'anonymous';
    const fileName = `${folder}/${Date.now()}-${req.file.originalname}`;
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('lab-reports')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      throw new Error(`File upload failed: ${uploadError.message}`);
    }

    // Get public URL of the uploaded document
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('lab-reports')
      .getPublicUrl(fileName);

    // 2. Parse the PDF using the Gemini AI Pipeline
    console.log(`Sending file ${req.file.originalname} to Google Gemini...`);
    const parsedData = await parseLabReport(req.file.buffer);
    console.log('Successfully parsed lab report with Google Gemini!');

    // 3. Save report metadata and summaries to the PostgreSQL Database
    const { data: reportRow, error: reportError } = await supabaseAdmin
      .from('lab_reports')
      .insert({
        user_id: userId,
        file_name: req.file.originalname,
        file_url: publicUrl,
        summary: parsedData.summary,
        interpretation: parsedData.interpretation,
        suggested_questions: parsedData.suggestedQuestions
      })
      .select()
      .single();

    if (reportError) {
      throw new Error(`Failed to save report: ${reportError.message}`);
    }

    // 4. Save individual biomarker details to the Database
    const biomarkerRows = parsedData.biomarkers.map(b => ({
      report_id: reportRow.id,
      name: b.name,
      value: b.value,
      unit: b.unit,
      status: b.status,
      category: b.category,
      explanation: b.explanation
    }));

    const { error: biomarkerError } = await supabaseAdmin
      .from('biomarkers')
      .insert(biomarkerRows);

    if (biomarkerError) {
      // Gracefully log biomarker insertion failure but return the report metadata
      console.error('Failed to save individual biomarker rows:', biomarkerError.message);
    }

    // Return the comprehensive parsed results back to the client
    return res.status(201).json({
      message: 'Report uploaded and parsed successfully!',
      report: {
        ...reportRow,
        biomarkers: parsedData.biomarkers
      }
    });

  } catch (err: any) {
    console.error('Failed PDF parsing and storage pipeline:', err);
    return res.status(500).json({ error: err.message || 'An error occurred during lab report processing.' });
  }
});

// Fetch all reports uploaded by the logged-in user
app.get('/api/reports', authenticateUser, async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id;
  try {
    const { data, error } = await supabaseAdmin
      .from('lab_reports')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ reports: data });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Fetch a single report's details, including all individual biomarkers
app.get('/api/reports/:id', authenticateUser, async (req: AuthenticatedRequest, res) => {
  const reportId = req.params.id;
  const userId = req.user?.id;

  try {
    // Fetch the report metadata (ensure it belongs to the authenticated user)
    const { data: report, error: reportError } = await supabaseAdmin
      .from('lab_reports')
      .select('*')
      .eq('id', reportId)
      .eq('user_id', userId)
      .single();

    if (reportError || !report) {
      return res.status(404).json({ error: 'Report not found or access denied.' });
    }

    // Fetch individual biomarkers parsed in this report
    const { data: biomarkers, error: biomarkerError } = await supabaseAdmin
      .from('biomarkers')
      .select('*')
      .eq('report_id', reportId);

    if (biomarkerError) {
      return res.status(400).json({ error: biomarkerError.message });
    }

    return res.status(200).json({
      report: {
        ...report,
        biomarkers
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`DecodeDx Backend API is running on http://localhost:${PORT}`);
});
