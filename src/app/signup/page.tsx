import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Logo } from '../../components/layout/Navbar';
import { api } from '../../lib/api';

export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Simple password strength calculation
  const getStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    if (pass.length < 6) return 1;
    if (pass.length < 10) return 2;
    return 3;
  };

  const strength = getStrength(formData.password);
  
  const strengthColors = [
    'rgba(255,255,255,0.1)', // 0: Empty
    'rgba(255,80,80,0.7)',   // 1: Weak
    'rgba(255,180,50,0.7)',  // 2: Medium
    'rgba(56,200,220,0.8)'   // 3: Strong
  ];
  
  const strengthLabels = ['', 'Weak', 'Medium', 'Strong'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    const newErrors: Record<string, boolean> = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.password) newErrors.password = true;
    if (!formData.confirm || formData.confirm !== formData.password) newErrors.confirm = true;
    if (!agreed) newErrors.agreed = true;
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await api.auth.signup(formData.email, formData.password, formData.name);
        setSubmitted(true);
      } catch (err: any) {
        setServerError(err.message || 'Failed to create account. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    background: '#0a0e14',
    border: `1px solid ${hasError ? 'rgba(255,80,80,0.5)' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: '10px',
    padding: '14px 16px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.2s ease',
  });

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-20 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="liquid-glass"
        style={{
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
          borderRadius: '20px',
          padding: '48px',
          position: 'relative'
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="text-[0.75rem] font-bold tracking-[0.2em] uppercase text-[#38C8DC]">DecodeDx</div>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="flex flex-col items-center justify-center text-center min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-full bg-[#38C8DC]/10 flex items-center justify-center mb-6">
              <CheckCircle2 size={32} color="#38C8DC" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>Account created.</h3>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.95rem' }}>Check your email to verify.</p>
          </motion.div>
        ) : (
          <>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'white', marginBottom: '8px', textAlign: 'center' }}>
              Create your account.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.9rem', textAlign: 'center' }}>
              Start understanding your blood results in minutes.
            </p>

            <div style={{ margin: '24px 0', borderTop: '1px solid rgba(255,255,255,0.11)' }} />

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.82)', marginBottom: '8px' }}>
                  Full name
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  style={inputStyle(errors.name)}
                  className="focus:border-[#38C8DC]/50 focus:ring-[3px] focus:ring-[#38C8DC]/10"
                />
                {errors.name && <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,100,100,0.8)', marginTop: '4px' }}>Name is required</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.82)', marginBottom: '8px' }}>
                  Email address
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  style={inputStyle(errors.email)}
                  className="focus:border-[#38C8DC]/50 focus:ring-[3px] focus:ring-[#38C8DC]/10"
                />
                {errors.email && <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,100,100,0.8)', marginTop: '4px' }}>Email is required</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.82)', marginBottom: '8px' }}>
                  Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    style={{ ...inputStyle(errors.password), paddingRight: '40px' }}
                    className="focus:border-[#38C8DC]/50 focus:ring-[3px] focus:ring-[#38C8DC]/10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/55 hover:text-[#38C8DC] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Strength Meter */}
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-grow h-[4px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      initial={false}
                      animate={{ 
                        width: strength === 0 ? '0%' : `${(strength / 3) * 100}%`,
                        backgroundColor: strengthColors[strength]
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: strengthColors[strength], minWidth: '45px', textAlign: 'right' }}>
                    {strengthLabels[strength]}
                  </span>
                </div>
                {errors.password && <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,100,100,0.8)', marginTop: '4px' }}>Password is required</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.82)', marginBottom: '8px' }}>
                  Confirm password
                </label>
                <div className="relative">
                  <input 
                    type={showConfirm ? "text" : "password"} 
                    value={formData.confirm}
                    onChange={e => setFormData({...formData, confirm: e.target.value})}
                    style={{ ...inputStyle(errors.confirm), paddingRight: '40px' }}
                    className="focus:border-[#38C8DC]/50 focus:ring-[3px] focus:ring-[#38C8DC]/10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/55 hover:text-[#38C8DC] transition-colors"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirm && <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,100,100,0.8)', marginTop: '4px' }}>Passwords must match</span>}
              </div>

              <div className="mt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative flex-shrink-0 mt-[2px]">
                    <input 
                      type="checkbox" 
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className={`w-4 h-4 rounded border ${errors.agreed ? 'border-red-500/50' : agreed ? 'border-[#38C8DC] bg-[#38C8DC]/10' : 'border-white/20'} flex items-center justify-center transition-colors`}>
                      <AnimatePresence>
                        {agreed && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <CheckCircle2 size={12} color="#38C8DC" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>
                    I agree to the <a href="#" className="text-white hover:text-[#38C8DC] transition-colors">Terms of Service</a> and <a href="#" className="text-white hover:text-[#38C8DC] transition-colors">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {serverError && (
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,100,100,0.9)', textAlign: 'center', background: 'rgba(255,100,100,0.08)', border: '1px solid rgba(255,100,100,0.2)', padding: '10px', borderRadius: '8px' }}>
                  {serverError}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="apple-button w-full justify-center mt-4 group relative overflow-hidden font-bold"
                style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                <span className="relative z-10 flex items-center">
                  {loading ? 'Creating account...' : 'Create account'}
                </span>
                <div className="absolute inset-0 bg-transparent border border-transparent group-hover:border-[#38C8DC]/50 rounded-full transition-all duration-300" />
              </button>
            </form>

            <div className="text-center text-[0.85rem] text-white/82 mt-6">
              Already have an account? <Link to="/login" className="text-[#38C8DC] hover:underline font-medium">Sign in</Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
