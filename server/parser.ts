import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('WARNING: GEMINI_API_KEY is missing from environment variables.');
}

const ai = new GoogleGenAI({ apiKey });

export interface ParsedBiomarker {
  name: string;
  value: string;
  unit: string;
  status: 'Optimal' | 'Normal' | 'Borderline' | 'High' | 'Low';
  category: 'Metabolic' | 'Vitamins' | 'Lipids' | 'Thyroid' | 'Other';
  explanation: string;
}

export interface ParsedReport {
  summary: string;
  interpretation: string;
  suggestedQuestions: string[];
  biomarkers: ParsedBiomarker[];
}

export async function parseLabReport(pdfBuffer: Buffer): Promise<ParsedReport> {
  const base64Data = pdfBuffer.toString('base64');

  const prompt = `
    You are an expert clinical laboratory interpretation system. 
    Analyze the uploaded blood test PDF report and extract:
    1. A concise plain-language summary of the patient's overall metabolic and general health based on their blood test results.
    2. A plain-language interpretation of what the results show, linking together related values (e.g. lipids, metabolic indicators, vitamin status) and explaining anomalies.
    3. Exactly 3 tailored, professional questions the patient should bring to their clinician based on their findings.
    4. Exactly the 5 most clinically significant or abnormal findings from the report. For each of these 5 biomarkers, determine its category, name, value, unit, and reference status. Most importantly, provide a plain-language explanation of what this specific number means and why it matters to the patient's health.

    Be highly accurate. Do not invent biomarkers. Only extract what is explicitly found in the report.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      { text: prompt },
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: base64Data,
        },
      },
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          summary: { 
            type: 'string', 
            description: 'A 2-3 sentence high-level metabolic health snapshot.' 
          },
          interpretation: { 
            type: 'string', 
            description: 'Comprehensive plain-language interpretation of the blood work findings.' 
          },
          suggestedQuestions: {
            type: 'array',
            items: { type: 'string' },
            description: 'Exactly 3 tailored questions the patient should ask their doctor.'
          },
          biomarkers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'Standard abbreviation or name of the biomarker, e.g., HbA1c, LDL-C, TSH, Vitamin D.' },
                value: { type: 'string', description: 'The numeric value as a string.' },
                unit: { type: 'string', description: 'The measurement unit, e.g., mg/dL, %, ng/mL, mIU/L.' },
                status: { 
                  type: 'string', 
                  enum: ['Optimal', 'Normal', 'Borderline', 'High', 'Low'],
                  description: 'Status relative to standard reference ranges.'
                },
                category: {
                  type: 'string',
                  enum: ['Metabolic', 'Vitamins', 'Lipids', 'Thyroid', 'Other'],
                  description: 'The category this biomarker belongs to.'
                },
                explanation: {
                  type: 'string',
                  description: 'Plain-language explanation of what this number means and why it matters to the patient.'
                }
              },
              required: ['name', 'value', 'unit', 'status', 'category', 'explanation']
            }
          }
        },
        required: ['summary', 'interpretation', 'suggestedQuestions', 'biomarkers']
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error('Google Gemini API returned an empty response.');
  }

  return JSON.parse(text) as ParsedReport;
}
