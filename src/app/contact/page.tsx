import { motion } from 'motion/react';
import { Mail, Briefcase, Newspaper, ChevronRight, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    role: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.role) newErrors.role = true;
    if (!formData.message) newErrors.message = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${hasError ? 'rgba(255,80,80,0.5)' : 'rgba(255,255,255,0.95)'}`,
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  });

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
          Contact · We're here
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          style={{ letterSpacing: "-0.04em", lineHeight: "1.1", fontSize: "4.5rem", marginBottom: "20px" }}
        >
          Get in <span className="shiny">touch.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ maxWidth: '560px', margin: '0 auto' }}
        >
          Whether you're exploring a partnership, have a clinical question, or just want to talk — we respond within one business day.
        </motion.p>
      </section>

      <section className="container" style={{ paddingBottom: '120px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="grid grid-cols-1 md:grid-cols-2 gap-[80px]">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '12px', padding: '28px 32px' }}>
              <Mail size={20} color="#38C8DC" strokeWidth={1.5} className="mb-4" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>General Enquiries</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.95)', marginBottom: '16px' }}>Questions about the product, pricing, or your account.</p>
              <a href="mailto:hello@decodedx.com" style={{ color: '#38C8DC', fontSize: '0.9rem', fontWeight: 500 }}>hello@decodedx.com</a>
            </div>
            
            <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '12px', padding: '28px 32px' }}>
              <Briefcase size={20} color="#38C8DC" strokeWidth={1.5} className="mb-4" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Clinical & Lab Partnerships</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.95)', marginBottom: '16px' }}>Interested in integrating DecodeDx for your clinic, lab, or platform?</p>
              <button className="apple-button outline" style={{ width: '100%', justifyContent: 'center' }}>
                Book a call <ChevronRight size={16} className="ml-2" />
              </button>
            </div>

            <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '12px', padding: '28px 32px' }}>
              <Newspaper size={20} color="#38C8DC" strokeWidth={1.5} className="mb-4" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Press & Media</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.95)', marginBottom: '16px' }}>Media enquiries, interviews, and press kit requests.</p>
              <a href="mailto:press@decodedx.com" style={{ color: '#38C8DC', fontSize: '0.9rem', fontWeight: 500 }}>press@decodedx.com</a>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '16px', padding: '40px' }}>
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                >
                  <div className="w-16 h-16 rounded-full bg-[#38C8DC]/10 flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} color="#38C8DC" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>Message received.</h3>
                  <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.95rem' }}>We'll be in touch within one business day.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Full name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle(errors.name)} className="focus:border-[#38C8DC] focus:ring-1 focus:ring-[#38C8DC]" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Email address</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={inputStyle(errors.email)} className="focus:border-[#38C8DC] focus:ring-1 focus:ring-[#38C8DC]" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Organisation / clinic name <span style={{ color: 'rgba(255,255,255,0.8)' }}>(Optional)</span></label>
                    <input type="text" placeholder="Optional" value={formData.org} onChange={e => setFormData({...formData, org: e.target.value})} style={inputStyle(false)} className="focus:border-[#38C8DC] focus:ring-1 focus:ring-[#38C8DC]" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>I am a...</label>
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{...inputStyle(errors.role), appearance: 'none'}} className="focus:border-[#38C8DC] focus:ring-1 focus:ring-[#38C8DC] bg-[#0d1117]">
                      <option value="" disabled>Select an option</option>
                      <option value="Individual">Individual</option>
                      <option value="Clinician">Clinician</option>
                      <option value="Lab">Lab or Diagnostic Provider</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Message</label>
                    <textarea rows={5} placeholder="What would you like to discuss?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{...inputStyle(errors.message), resize: 'none'}} className="focus:border-[#38C8DC] focus:ring-1 focus:ring-[#38C8DC]" />
                  </div>
                  <button type="submit" className="apple-button" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                    Send message <ChevronRight size={16} className="ml-2" />
                  </button>
                </form>
              )}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', marginTop: '16px', textAlign: 'center' }}>
              We don't share your information. Ever.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
