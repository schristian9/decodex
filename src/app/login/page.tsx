import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChevronRight } from 'lucide-react';
import { Logo } from '../../components/layout/Navbar';
import { api } from '../../lib/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    const newErrors: Record<string, boolean> = {};
    if (!email) newErrors.email = true;
    if (!password) newErrors.password = true;
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await api.auth.login(email, password);
        // Refresh page or navigate
        navigate('/');
        window.location.reload(); // Force page refresh to update auth navbar state
      } catch (err: any) {
        setServerError(err.message || 'Invalid email or password. Please try again.');
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

        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'white', marginBottom: '8px', textAlign: 'center' }}>
          Welcome back.
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.9rem', textAlign: 'center' }}>
          Sign in to your DecodeDx account.
        </p>

        <div style={{ margin: '24px 0', borderTop: '1px solid rgba(255,255,255,0.11)' }} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.82)', marginBottom: '8px' }}>
              Email
            </label>
            <input 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
            {errors.password && <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,100,100,0.8)', marginTop: '4px' }}>Password is required</span>}
            <div className="text-right mt-2">
              <a href="#" style={{ fontSize: '0.8rem', color: 'rgba(56,200,220,0.8)' }} className="hover:text-[#38C8DC] transition-colors">
                Forgot password?
              </a>
            </div>
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
                  {loading ? 'Signing in...' : 'Sign in'}
                </span>
                <div className="absolute inset-0 bg-transparent border border-transparent group-hover:border-[#38C8DC]/50 rounded-full transition-all duration-300" />
              </button>
            </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-grow border-t border-white/11" />
          <span className="text-[0.75rem] text-white/35">— or —</span>
          <div className="flex-grow border-t border-white/11" />
        </div>

        <div className="text-center text-[0.85rem] text-white/82">
          Don't have an account? <Link to="/signup" className="text-[#38C8DC] hover:underline font-medium">Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
}
