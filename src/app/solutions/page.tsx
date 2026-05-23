import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SolutionsPage() {
  return (
    <>
      <section className="hero container" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <motion.div 
          className="kicker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="dot"></span>
          Solutions · Built for every stakeholder
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          style={{ letterSpacing: "-0.04em", lineHeight: "1.1", fontSize: "4.5rem", marginBottom: "20px" }}
        >
          One platform.<br />
          <span className="shiny">Three audiences.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ maxWidth: '560px', margin: '0 auto' }}
        >
          Whether you're a patient, a clinician, or a diagnostic provider — DecodeDx speaks your language.
        </motion.p>
      </section>

      {/* Section A - Individuals */}
      <section className="container" style={{ padding: '100px 0' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ color: '#38C8DC', fontSize: '0.75rem', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '16px' }}>PERSONAL HEALTH</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.1, marginBottom: '24px' }}>Finally understand what your blood is telling you.</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6, marginBottom: '32px' }}>
              Upload any lab report and get a structured breakdown of what changed, what matters, and what to ask your doctor next. No guesswork. No jargon.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {['Plain-language biomarker explanations', 'Trend tracking across multiple reports', 'Suggested clinician questions'].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-[4px] h-[4px] rounded-full bg-[#38C8DC]" />
                  <span className="text-white/95">{f}</span>
                </li>
              ))}
            </ul>
            <Link className="apple-button outline" to="/contact" style={{ display: 'inline-flex' }}>
              Start for free
              <ChevronRight className="icon chevron" />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
            <div className="w-full max-w-[420px] flex flex-col gap-4">
              <div className="bucket liquid-glass" style={{ padding: '24px', background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center' }}><i className="dot" style={{ background: '#ffffff', marginRight: '10px' }}></i>Flagged (4)</h3>
                <ul className="text-sm text-white/95 space-y-2 pl-6">
                  <li>HbA1c — watch trend</li>
                  <li>Vitamin D — below target</li>
                </ul>
              </div>
              <div className="bucket liquid-glass" style={{ padding: '24px', background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center' }}><i className="dot" style={{ background: '#e5e5e5', marginRight: '10px' }}></i>Follow-up (7)</h3>
                <ul className="text-sm text-white/95 space-y-2 pl-6">
                  <li>LDL-C — repeat lipid panel</li>
                  <li>Ferritin — correlate with symptoms</li>
                </ul>
              </div>
              <div className="bucket liquid-glass" style={{ padding: '24px', background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center' }}><i className="dot" style={{ background: '#a3a3a3', marginRight: '10px' }}></i>Stable (18)</h3>
                <ul className="text-sm text-white/95 space-y-2 pl-6">
                  <li>TSH — within range</li>
                  <li>Creatinine — stable kidney marker</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container"><div style={{ borderTop: '1px solid rgba(255,255,255,0.11)' }}></div></div>

      {/* Section B - Clinicians */}
      <section className="container" style={{ padding: '100px 0' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center order-2 md:order-1">
            <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/11">
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>Patient: J.D.</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>Report date: Oct 12, 2026</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/50">JD</div>
              </div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>CLINICAL BRIEF</div>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6, marginBottom: '24px' }}>
                Patient's HbA1c has drifted from 5.4% to 5.7% over 14 months. Vitamin D remains insufficient at 24 ng/mL despite prior recommendation.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '16px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px' }}>Flagged for review</div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white/90">HbA1c</span>
                  <span className="text-sm font-bold text-[#FFBD2E]">5.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/90">Vitamin D, 25-OH</span>
                  <span className="text-sm font-bold text-[#FF5F57]">24 ng/mL</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
            <div style={{ color: '#38C8DC', fontSize: '0.75rem', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '16px' }}>CLINICAL TEAMS</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.1, marginBottom: '24px' }}>Give patients clarity before they walk in.</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6, marginBottom: '32px' }}>
              Share structured, AI-generated summaries with patients ahead of consultations. Reduce appointment time spent on explanation. Keep clinical review where it belongs — with you.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {['White-label patient report exports', 'Bulk upload for care teams', 'AI summaries that defer to clinical judgement'].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-[4px] h-[4px] rounded-full bg-[#38C8DC]" />
                  <span className="text-white/95">{f}</span>
                </li>
              ))}
            </ul>
            <Link className="apple-button outline" to="/contact" style={{ display: 'inline-flex' }}>
              Talk to us about clinician plans
              <ChevronRight className="icon chevron" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="container"><div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}></div></div>

      {/* Section C - Labs & Diagnostics */}
      <section className="container" style={{ padding: '100px 0' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ color: '#38C8DC', fontSize: '0.75rem', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '16px' }}>LABS & DIAGNOSTICS</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.1, marginBottom: '24px' }}>Turn results delivery into a value-add.</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6, marginBottom: '32px' }}>
              Integrate DecodeDx interpretation into your results portal. Patients get understanding. You get differentiation. No change to your existing workflow.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {['API integration available', 'Custom reference range support', 'Branded report templates'].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-[4px] h-[4px] rounded-full bg-[#38C8DC]" />
                  <span className="text-white/95">{f}</span>
                </li>
              ))}
            </ul>
            <Link className="apple-button outline" to="/contact" style={{ display: 'inline-flex' }}>
              Explore lab partnerships
              <ChevronRight className="icon chevron" />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
            {/* Visual element representing API / Integration */}
            <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '420px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(255,255,255,0.95)' }}>
              <div style={{ color: '#38C8DC', marginBottom: '16px' }}>POST /api/v1/interpret</div>
              <div style={{ color: '#a3a3a3', marginBottom: '8px' }}>{'{'}</div>
              <div style={{ paddingLeft: '20px', color: '#e5e5e5', marginBottom: '4px' }}>"patient_id": "px_89213",</div>
              <div style={{ paddingLeft: '20px', color: '#e5e5e5', marginBottom: '4px' }}>"lab_results": [</div>
              <div style={{ paddingLeft: '40px', color: '#e5e5e5', marginBottom: '4px' }}>{'{'} "biomarker": "HbA1c", "value": 5.7, "unit": "%" {'}'}</div>
              <div style={{ paddingLeft: '20px', color: '#e5e5e5', marginBottom: '4px' }}>]</div>
              <div style={{ color: '#a3a3a3', marginBottom: '16px' }}>{'}'}</div>
              
              <div style={{ color: '#28C840', marginBottom: '16px' }}>200 OK</div>
              <div style={{ color: '#a3a3a3', marginBottom: '8px' }}>{'{'}</div>
              <div style={{ paddingLeft: '20px', color: '#e5e5e5', marginBottom: '4px' }}>"summary": "Patient HbA1c is borderline...",</div>
              <div style={{ paddingLeft: '20px', color: '#e5e5e5', marginBottom: '4px' }}>"flagged_items": ["HbA1c"]</div>
              <div style={{ color: '#a3a3a3' }}>{'}'}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="container text-center" style={{ padding: '80px 0 120px 0' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>Find the right plan for you</h3>
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 text-left">
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '12px', padding: '24px', width: '280px' }}>
            <h4 style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '8px' }}>Free</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.95)' }}>Basic explanations for individuals taking their first steps.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '12px', padding: '24px', width: '280px' }}>
            <h4 style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '8px' }}>Standard</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.95)' }}>Trend tracking and deeper summaries for families.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #38C8DC', borderRadius: '12px', padding: '24px', width: '280px' }}>
            <h4 style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '8px', color: '#38C8DC' }}>Pro</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.95)' }}>Unlimited reports and white-label exports for clinics.</p>
          </div>
        </div>
        <Link to="/" style={{ color: '#38C8DC', fontWeight: 500, fontSize: '0.9rem' }} className="hover:underline">View full pricing →</Link>
      </section>
    </>
  );
}
