import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Menu, X, Activity } from 'lucide-react';

export const Logo = ({ className = "w-full h-full" }: { className?: string }) => {
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
      style={{ filter: 'contrast(1.3) brightness(1.1) saturate(1.2)' }}
      onError={() => {
        console.error("Logo failed to load");
        setError(true);
      }}
    />
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('decodedx_token'));
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('decodedx_token');
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <motion.nav 
        className="nav fixed top-0 left-0 w-full z-[100]"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: '64px',
          background: scrolled ? 'rgba(5,5,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          transition: 'all 0.3s ease'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link className="brand-lockup flex items-center" style={{ gap: '10px' }} to="/" aria-label="DecodeDx home">
          <span className="brand-mark">
            <Logo />
          </span>
          <span className="brand-name">
            <strong style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>DecodeDx</strong>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#38C8DC' }}>Blood Intelligence</span>
          </span>
        </Link>
        
        <div className="hidden lg:flex" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', gap: '36px' }}>
          {[
            { label: 'How It Works', path: '/how-it-works' },
            { label: 'Solutions', path: '/solutions' },
            { label: 'Use Cases', path: '/use-cases' },
            { label: 'Contact', path: '/contact' }
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (i * 0.05) }}>
              <Link 
                to={item.path} 
                className="text-[0.95rem] font-semibold text-white/90 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="hidden lg:flex items-center ml-auto"
          style={{ gap: '20px', paddingRight: '24px' }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isLoggedIn ? (
            <>
              <span style={{ fontSize: '0.85rem', color: '#38C8DC', fontWeight: 500, marginRight: '10px' }}>Active Session</span>
              <button 
                onClick={handleSignOut}
                className="text-[0.88rem] text-white/65 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="text-[0.95rem] font-semibold text-white/90 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="flex items-center text-[#000000] font-bold border-none cursor-pointer transition-colors"
                style={{ background: 'white', borderRadius: '999px', padding: '8px 20px', fontSize: '0.88rem', gap: '6px' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.88)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'white'}
              >
                Sign up
              </Link>
            </>
          )}
        </motion.div>

        <button 
          className="mobile-menu-btn lg:hidden ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-[#0c0c0c] p-8 flex flex-col gap-6"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="brand-lockup flex items-center gap-2">
                <span className="brand-mark w-8 h-8">
                  <Logo />
                </span>
                <strong>DecodeDx</strong>
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white"
              >
                <X />
              </button>
            </div>
            {[
              { label: 'How It Works', path: '/how-it-works' },
              { label: 'Solutions', path: '/solutions' },
              { label: 'Use Cases', path: '/use-cases' },
              { label: 'Contact', path: '/contact' }
            ].map(item => (
              <Link key={item.label} to={item.path} className="text-2xl font-bold text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>
            ))}
            <hr className="border-white/10" />
            {isLoggedIn ? (
              <button 
                onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} 
                className="text-xl font-medium text-white/80 hover:text-white text-left bg-transparent border-none p-0 cursor-pointer"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link to="/login" className="text-xl font-medium text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link 
                  className="flex items-center justify-center bg-white text-[#000000] rounded-full px-6 py-4 text-xl font-bold border-none cursor-pointer hover:bg-white/90 w-full"
                  to="/signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
