import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'WARNING: SUPABASE_URL and SUPABASE_ANON_KEY are missing from environment variables.'
  );
}

// Client for normal operations (using anon key)
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Client for administrative/backend-only actions (bypasses RLS)
// Used securely in the backend to store parsed AI blood test results
export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceRoleKey || supabaseAnonKey || ''
);

/**
 * Creates a per-request Supabase client authenticated as the specific user.
 * Useful if we want to perform database actions on their behalf using their JWT token.
 */
export function getAuthenticatedSupabaseClient(token: string) {
  return createClient(supabaseUrl || '', supabaseAnonKey || '', {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
