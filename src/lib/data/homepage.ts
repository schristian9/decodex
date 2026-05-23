export const testimonials = [
  { quote: "The report finally explained which markers mattered together, not just which numbers were red.", profile: "Patient profile", type: "Individual user", tag: "PERSONAL HEALTH" },
  { quote: "Structured summaries help us prepare patients for better conversations while keeping clinical review human-led.", profile: "Care team", type: "Primary clinic", tag: "CLINICIANS" },
  { quote: "White-label interpretation makes lab results easier to understand without adding repetitive manual explanation work.", profile: "Diagnostics lead", type: "Lab operations", tag: "LABS" }
];

export const faqs = [
  { q: "Is DecodeDx a replacement for a doctor?", a: "No. DecodeDx is designed to help users understand blood test results in clearer language, identify patterns, and prepare for better conversations with healthcare professionals. It does not diagnose conditions or replace licensed medical advice." },
  { q: "Can DecodeDx detect abnormal patterns automatically?", a: "Yes. DecodeDx analyzes biomarkers, reference ranges, and result relationships to identify unusual patterns, trend shifts, and clinically relevant changes that may require further attention or follow-up testing." },
  { q: "How accurate are the AI-generated explanations?", a: "DecodeDx is built to generate structured, evidence-aware interpretations using laboratory context and reference-range analysis. The platform is intended for educational and operational support and should always be reviewed alongside clinical judgment." },
  { q: "What happens after I upload my report?", a: "After upload, DecodeDx generates a structured interpretation experience including biomarker explanations, flagged values, trend context, and suggested follow-up questions to help users better understand their results." }
];

export const pricingTiers = [
  {
    name: "Free",
    priceMonthly: "Free",
    priceYearly: "Free",
    description: "For individuals taking their first steps toward understanding lab results.",
    features: [
      "Upload sample blood test reports",
      "Plain-language biomarker explanations",
      "Basic reference-range context",
      "Educational next-step questions",
      "Access via web and mobile app"
    ],
    isPro: false
  },
  {
    name: "Standard",
    priceMonthly: "£9.99/m",
    priceYearly: "£99.99/y",
    description: "For families and care teams who need deeper trends and clearer reports.",
    features: [
      "Up to 50 reports in the cloud",
      "Trend tracking across results",
      "Advanced biomarker summaries",
      "Family profiles (up to 5 members)",
      "Premium report templates"
    ],
    isPro: false
  },
  {
    name: "Pro",
    priceMonthly: "£19.99/m",
    priceYearly: "£199.99/y",
    description: "For clinics, labs, and diagnostic providers working with patients at scale.",
    features: [
      "Unlimited reports",
      "White-label patient exports",
      "AI-powered interpretation workflows",
      "Unlimited care team members",
      "Brand and range customization"
    ],
    isPro: true
  }
];
