import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Instagram, FileText, Globe, MessageSquare, ExternalLink } from 'lucide-react';
import { Logo } from './Navbar';

export default function Footer() {
  return (
    <footer className="footer container border-t border-white/10 pt-20 pb-12 mt-20">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
        <div className="col-span-2">
          <Link className="brand-lockup mb-6" to="/">
            <span className="brand-mark">
              <Logo />
            </span>
            <strong>DecodeDx</strong>
          </Link>
          <p className="text-white/90 font-medium text-sm max-w-xs leading-relaxed mb-8">
            Turning raw lab markers into structured, explainable health conversations. Built for humans, loved by clinicians.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white/50 hover:text-white"><Twitter size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white/50 hover:text-white"><Linkedin size={18} /></a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white/50 hover:text-white"><Github size={18} /></a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white/50 hover:text-white"><Instagram size={18} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-70">Product</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-white/90">
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
            <li><Link to="/use-cases" className="hover:text-white transition-colors">Use Cases</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-70">Company</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-white/90">
            <li><Link to="/contact" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Medical Board</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Press Kit</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-70">Legal</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-white/90">
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><FileText size={14} /> Data Processing</a></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10">
        <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
          <span className="flex items-center gap-2"><Globe size={12} /> Global Support</span>
          <span className="flex items-center gap-2"><MessageSquare size={12} /> Live Status</span>
          <span>© 2026 DecodeDx Inc.</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#" className="text-xs font-bold text-white/80 hover:text-white transition-colors flex items-center gap-2">Support Center <ExternalLink size={12} /></a>
        </div>
      </div>
    </footer>
  );
}
