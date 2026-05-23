import { motion } from 'motion/react';
import { ChevronRight, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
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
          Process · Simple by design
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          style={{ letterSpacing: "-0.04em", lineHeight: "1.1", fontSize: "4.5rem", marginBottom: "20px" }}
        >
          From upload to understanding<br />
          <span className="shiny">in under a minute.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ maxWidth: '560px', margin: '0 auto' }}
        >
          No clinic visits. No medical jargon. Just clear answers about your blood.
        </motion.p>
      </section>

      {/* Step 1 */}
      <section className="container" style={{ padding: '80px 0' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>Upload Your Report</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6 }}>
            Drag and drop any blood test PDF or image. We accept reports from Quest, LabCorp, NHS, and hundreds of other providers worldwide.
          </p>
        </motion.div>
      </section>

      <div className="container"><div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}></div></div>

      {/* Step 2 */}
      <section className="container" style={{ padding: '80px 0' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} 
          className="max-w-2xl ml-auto text-right"
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>AI Reads Every Biomarker</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6 }}>
            Our AI scans your entire report, identifies every biomarker, cross-references reference ranges, and flags values that need attention — all in seconds.
          </p>
        </motion.div>
      </section>

      <div className="container"><div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}></div></div>

      {/* Step 3 */}
      <section className="container" style={{ padding: '80px 0' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>Plain-Language Interpretation</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6 }}>
              No medical degree required. Every result gets a clear headline, a plain explanation, and a suggested question to bring to your clinician.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '10px', padding: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/11">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#38C8DC" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#38C8DC' }}>AI summary</span>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.95)', margin: 0 }}>
                Glucose control is drifting upward while vitamin D remains below the target range. LDL-C is borderline, so nutrition and follow-up testing should be prioritised.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container"><div style={{ borderTop: '1px solid rgba(255,255,255,0.11)' }}></div></div>

      {/* Step 4 */}
      <section className="container" style={{ padding: '80px 0' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex items-center justify-center order-2 md:order-1"
          >
            <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '20px' }}>Questions for your next visit:</div>
              <ul className="flex flex-col gap-4 mb-6">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-white/90">1</span></div>
                  <span className="text-[0.85rem] text-white/95 leading-relaxed">Should vitamin D be rechecked?</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-white/90">2</span></div>
                  <span className="text-[0.85rem] text-white/95 leading-relaxed">Should lipid testing be repeated soon?</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-white/90">3</span></div>
                  <span className="text-[0.85rem] text-white/95 leading-relaxed">What lifestyle changes are appropriate given the HbA1c drift?</span>
                </li>
              </ul>
              <button className="apple-button outline" style={{ width: '100%', justifyContent: 'center' }}>
                <Copy size={14} className="mr-2" /> Copy questions
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} 
            className="order-1 md:order-2"
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>Questions for Your Clinician</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6 }}>
              DecodeDx doesn't replace your doctor — it prepares you for them. Leave every session with specific, informed questions ready to go.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container text-center" style={{ padding: '120px 0' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '40px' }}>Ready to understand your results?</h2>
        <Link className="apple-button" to="/contact" style={{ margin: '0 auto', display: 'inline-flex' }}>
          Upload Bloodwork
          <ChevronRight className="icon chevron" />
        </Link>
      </section>
    </>
  );
}
