import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Activity, Plus, Building2, Stethoscope, User, Heart, FlaskConical, UserCircle, Pill, Microscope } from 'lucide-react';
import HeroDashboardSection from '../components/dashboard/DashboardWindow';
import { Link } from 'react-router-dom';
import { testimonials, faqs, pricingTiers } from '../lib/data/homepage';

const Logo = ({ className = "w-full h-full" }: { className?: string }) => {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className={`${className} bg-brand/20 flex items-center justify-center border border-brand/30 rounded-full`}>
        <Activity size={18} className="text-brand" strokeWidth={2.5} />
      </div>
    );
  }

  return (
    <img 
      src="/decodedx-logo.png" 
      alt="DecodeDx Logo" 
      className={className} 
      onError={() => {
        console.error("Logo failed to load");
        setError(true);
      }}
    />
  );
};

const FAQItem: React.FC<{ question: string, answer: string, delay: number }> = ({ question, answer, delay }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="faq-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      style={{ 
        background: isHovered ? '#161c28' : '#111520',
        border: '1px solid rgba(255,255,255,0.11)',
        borderRadius: '10px',
        marginBottom: '12px',
        overflow: 'hidden',
        transition: 'background-color 0.2s ease, border-color 0.2s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        className="faq-q w-full flex justify-between items-center py-5 px-8 text-left transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'rgba(255,255,255,0.82)' }}>{question}</span>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <Plus size={20} color={isOpen ? '#38C8DC' : 'rgba(255,255,255,0.55)'} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-8 pb-5 text-[0.95rem] text-white/80 leading-relaxed max-w-[800px]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function HomePage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <section className="hero container">

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          style={{ letterSpacing: "-0.04em", lineHeight: "1.1", fontSize: "clamp(4.5rem, 8vw, 6.5rem)", marginBottom: "20px" }}
        >
          Understand Your <br />
          <span className="shiny">Blood Beyond the Numbers</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Upload a blood test and get a structured explanation of what changed, what matters, and what to ask next. Built for people, care teams, and diagnostic providers who need clarity without guesswork.
        </motion.p>
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.75, duration: 0.8 }}
        >
          <button 
            className="apple-button"
            onClick={(e) => {
              e.preventDefault();
              const uploadInput = document.getElementById('dashboard-file-upload');
              if (uploadInput) {
                // Scroll down to the dashboard section so they see the loading state
                document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                // Trigger the actual file upload logic
                uploadInput.click();
              }
            }}
          >
            <span className="brand-icon">
              <Logo />
            </span>
            Upload Bloodwork
          </button>
        </motion.div>
      </section>

      <HeroDashboardSection />

      <section className="triage-section w-full bg-transparent section-spacing" id="solutions">
        <div className="container">
          <div className="two-col md:!grid-cols-[45%_1fr] md:!gap-[40px]">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="eyebrow"><i></i>Interpretation <span>AI-native</span></div>
              <h2 style={{ fontSize: "3.5rem", lineHeight: "1.1" }}>From raw biomarkers<br />to clear next steps.</h2>
              <p style={{ fontSize: "1.15rem", color: 'rgba(255,255,255,0.95)' }}>The experience makes abnormal values readable, connects results across time, and separates educational guidance from medical diagnosis. Focus on what changed, what matters, and what to ask next.</p>
              <motion.div 
                className="chips content-spacing-margin"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              >
                {['Reference ranges', 'Trend analysis', 'Risk flags', 'Clinician questions'].map((text, i) => (
                  <motion.span 
                    key={i}
                    style={{ fontSize: "0.9rem", padding: "0.6rem 1.2rem" }}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                    }}
                  >{text}</motion.span>
                ))}
              </motion.div>
            </motion.div>
            <motion.div 
              className="triage-card liquid-glass"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p style={{ color: 'rgba(255,255,255,0.9)' }}>Today · 42 biomarkers reviewed</p>
              <div className="bucket liquid-glass">
                <h3><i className="dot" style={{ background: '#ffffff' }}></i>Flagged (4)</h3>
                <ul>
                  <li>HbA1c — watch trend</li>
                  <li>Vitamin D — below target</li>
                </ul>
              </div>
              <div className="bucket liquid-glass">
                <h3><i className="dot" style={{ background: '#e5e5e5' }}></i>Follow-up (7)</h3>
                <ul>
                  <li>LDL-C — repeat lipid panel</li>
                  <li>Ferritin — correlate with symptoms</li>
                </ul>
              </div>
              <div className="bucket liquid-glass">
                <h3><i className="dot" style={{ background: '#a3a3a3' }}></i>Stable (18)</h3>
                <ul>
                  <li>TSH — within range</li>
                  <li>Creatinine — stable kidney marker</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="w-full border-y border-white/12 bg-transparent overflow-hidden section-spacing" style={{ marginTop: 0 }}>
        <div className="kicker text-center mb-10 mt-4 text-[0.9rem] uppercase tracking-[0.2em] text-white opacity-100">Built for people, clinicians, and diagnostic providers</div>
        <div className="flex justify-center items-center gap-0 flex-wrap xl:flex-nowrap pb-4 content-spacing-margin">
          {[
            { label: 'NHS', icon: Building2 },
            { label: 'GPs', icon: Stethoscope },
            { label: 'Patients', icon: User },
            { label: 'Wellness Centers', icon: Heart },
            { label: 'Labs', icon: FlaskConical },
            { label: 'Individuals', icon: UserCircle },
            { label: 'Pharmacy', icon: Pill },
            { label: 'Researchers', icon: Microscope }
          ].map((item, index, arr) => (
            <div key={item.label} className="flex items-center">
              <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'rgba(255,255,255,0.95)', padding: '0 32px' }} className="whitespace-nowrap flex items-center gap-3">
                <item.icon size={18} className="text-[#38C8DC]" />
                {item.label}
              </span>
              {index < arr.length - 1 && (
                <div style={{ borderRight: '1px solid rgba(255,255,255,0.12)', height: '16px' }}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <section className="testimonials w-full bg-transparent section-spacing" style={{ marginTop: 0 }}>
        <div className="container">
          <motion.div 
            className="testimonial-grid items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {testimonials.map((t, i) => (
              <motion.figure 
                key={i} 
                className="testimonial liquid-glass h-full flex flex-col"
                style={{ padding: "36px 32px", borderTop: "1px solid rgba(56, 200, 220, 0.25)" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                }}
              >
                <blockquote className="text-[1.05rem] leading-[1.7] mb-6" style={{ color: 'rgba(255,255,255,0.95)' }}>"{t.quote}"</blockquote>
                <figcaption className="mt-auto">
                  <strong className="block text-[1rem] font-semibold text-white/95">{t.profile}</strong>
                  <span className="block text-[0.85rem] text-white/80 font-medium mb-1">{t.type}</span>
                  <b className="block text-[0.8rem] tracking-[0.12em] text-white/60">{t.tag}</b>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="questions w-full bg-transparent section-spacing">
        <div className="container">
          <div className="questions-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" }}>
              <h2 style={{ fontSize: "3.5rem", lineHeight: "1.1", marginBottom: "2rem" }}>Healthcare data is serious.<br /><span className="shiny">Your answers should be too.</span></h2>
            </motion.div>
            <div className="faq-list liquid-glass rounded-xl overflow-hidden flex flex-col" style={{ padding: 0 }}>
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="c3-pricing-section w-full bg-transparent section-spacing" id="pricing">
        <div className="c3-watermark-container">
          <div className="c3-watermark-main">
            <span className="c3-watermark-line-1">Your blood.</span>
            <span className="shiny">Understood</span>
          </div>
        </div>
        <motion.div 
          className="c3-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {pricingTiers.map((tier, index) => (
            <motion.article 
              key={index}
              className={`c3-card ${tier.isPro ? 'c3-card-pro' : ''}`}
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } } }}
            >
              <div className="c3-tier-small">{tier.name}</div>
              <div className="c3-tier-large">
                {isYearly ? tier.priceYearly : tier.priceMonthly}
              </div>
              <p className="c3-desc" style={{ color: 'rgba(255,255,255,0.82)' }}>{tier.description}</p>
              <ul className="c3-list">
                {tier.features.map((f, i) => (
                  <li key={i}><span className="c3-check">✓</span>{f}</li>
                ))}
              </ul>
              <button className="c3-btn">Choose Plan</button>
            </motion.article>
          ))}
        </motion.div>
        <div className="c3-toggle-wrap content-spacing-margin">
          <span>Yearly</span>
          <button 
            className={`c3-toggle ${isYearly ? 'active' : ''}`} 
            onClick={() => setIsYearly(!isYearly)}
            aria-label="Toggle yearly pricing"
          >
            <span className="c3-toggle-knob"></span>
          </button>
        </div>
      </section>

      <section className="final-cta w-full bg-transparent section-spacing">
        <div className="container">
          <div className="final-card liquid-glass">
            <h2>Upload the report.<br />Understand what matters.</h2>
            <p style={{ color: 'rgba(255,255,255,0.95)' }}>Join individuals, clinicians, and labs turning raw biomarkers into clear, explainable health conversations.</p>
            <div className="final-actions content-spacing-margin">
              <button 
                className="apple-button"
                onClick={(e) => {
                  e.preventDefault();
                  const uploadInput = document.getElementById('dashboard-file-upload');
                  if (uploadInput) {
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll back up to see it
                    setTimeout(() => uploadInput.click(), 500); // Wait for scroll to finish
                  }
                }}
              >
                <span className="brand-icon">
                  <Logo />
                </span>
                Upload Bloodwork
              </button>
              <Link className="sales-btn" to="/contact">
                Talk to clinics
                <ChevronRight className="icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
