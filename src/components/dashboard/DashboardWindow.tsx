import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  Paperclip, 
  LayoutGrid, 
  Flag, 
  TrendingUp, 
  MessageCircle, 
  Clock, 
  Upload, 
  Activity, 
  Droplet, 
  Heart, 
  ChevronRight 
} from 'lucide-react';
import { api } from '../../lib/api';

export default function HeroDashboardSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Integration States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latestReport, setLatestReport] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('decodedx_token');
    setIsLoggedIn(!!token);
    if (token) {
      fetchLatestReport();
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const fetchLatestReport = async () => {
    setLoading(true);
    try {
      const data = await api.reports.list();
      if (data.reports && data.reports.length > 0) {
        // Fetch detailed report (with parsed biomarkers)
        const detailedReport = await api.reports.get(data.reports[0].id);
        setLatestReport(detailedReport.report);
      }
    } catch (err) {
      console.error('Failed to fetch latest report:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    e.target.value = ''; // Reset so the same file can be re-selected if needed
    setLoading(true);
    setUploadProgress('Uploading report to secure storage...');
    
    try {
      const data = await api.reports.upload(file);
      setLatestReport(data.report);
      setUploadProgress('');
    } catch (err: any) {
      alert(err.message || 'Failed to upload and analyze your report. Please check the backend connection.');
      setUploadProgress('');
    } finally {
      setLoading(false);
    }
  };

  const triggerFileSelect = () => {
    // For MVP demo, bypass login requirement
    fileInputRef.current?.click();
  };

  // Biomarker Mapping Helper
  const getBiomarker = (
    name: string, 
    fallbackValue: string, 
    fallbackStatus: string, 
    fallbackDesc: string, 
    fallbackColor: string
  ) => {
    if (!latestReport?.biomarkers || latestReport.biomarkers.length === 0) {
      return { value: fallbackValue, status: fallbackStatus, desc: fallbackDesc, color: fallbackColor };
    }
    const found = latestReport.biomarkers.find(
      (b: any) => b.name.toLowerCase() === name.toLowerCase()
    );
    if (!found) {
      return { value: fallbackValue, status: fallbackStatus, desc: fallbackDesc, color: fallbackColor };
    }

    let color = '#38C8DC'; // Normal / Optimal
    if (found.status === 'Low' || found.status === 'High') {
      color = 'rgba(235,87,87,1)'; // Red alert
    } else if (found.status === 'Borderline' || found.status === 'Watch') {
      color = 'rgba(230,162,60,1)'; // Orange warning
    }

    let desc = `${found.category} biomarker is currently in the ${found.status.toLowerCase()} range.`;
    if (name.toLowerCase() === 'hba1c' && found.status === 'Borderline') {
      desc = 'Drifting upward compared with reference';
    } else if (name.toLowerCase() === 'vitamin d' && found.status === 'Low') {
      desc = 'Low level worth discussing with a clinician';
    }

    return {
      value: `${found.value} ${found.unit}`,
      status: found.status,
      desc: desc,
      color: color
    };
  };

  // Default lists
  const defaultBiomarkersList = [
    { name: 'HbA1c', value: '5.7%', status: 'Watch glucose control', statusColor: 'rgba(230,162,60,1)', desc: 'Drifting upward compared with prior results' },
    { name: 'Vitamin D', value: '24 ng/mL', status: 'Below target range', statusColor: 'rgba(235,87,87,1)', desc: 'Low level worth discussing with a clinician' },
    { name: 'LDL-C', value: '122 mg/dL', status: 'Borderline cholesterol', statusColor: 'rgba(230,162,60,1)', desc: 'Nutrition and follow-up testing recommended' },
    { name: 'TSH', value: '2.1 mIU/L', status: 'Within reference range', statusColor: '#38C8DC', desc: 'Thyroid marker is currently stable' },
    { name: 'Ferritin', value: '42 ng/mL', status: 'Iron stores snapshot', statusColor: 'rgba(255,255,255,0.55)', desc: 'Interpret alongside full iron panel' },
  ];

  const getRenderBiomarkers = () => {
    if (!latestReport?.biomarkers || latestReport.biomarkers.length === 0) {
      return defaultBiomarkersList;
    }
    return latestReport.biomarkers.map((b: any) => {
      let statusColor = '#38C8DC';
      if (b.status === 'Low' || b.status === 'High') {
        statusColor = 'rgba(235,87,87,1)';
      } else if (b.status === 'Borderline' || b.status === 'Watch') {
        statusColor = 'rgba(230,162,60,1)';
      }
      return {
        name: b.name,
        value: `${b.value} ${b.unit}`,
        status: b.status,
        statusColor,
        desc: `${b.category} biomarker`
      };
    });
  };

  const getBiomarkerPercentage = (name: string, fallbackPct: string) => {
    if (!latestReport?.biomarkers) return fallbackPct;
    const found = latestReport.biomarkers.find((b: any) => b.name.toLowerCase() === name.toLowerCase());
    if (!found) return fallbackPct;
    const val = parseFloat(found.value);
    if (isNaN(val)) return fallbackPct;

    if (name.toLowerCase() === 'hba1c') {
      return `${Math.max(10, Math.min(95, ((val - 4) / 4) * 100))}%`;
    }
    if (name.toLowerCase() === 'vitamin d') {
      return `${Math.max(10, Math.min(95, ((val - 10) / 70) * 100))}%`;
    }
    if (name.toLowerCase() === 'ldl-c') {
      return `${Math.max(10, Math.min(95, ((val - 50) / 130) * 100))}%`;
    }
    if (name.toLowerCase() === 'tsh') {
      return `${Math.max(10, Math.min(95, ((val - 0.1) / 5.9) * 100))}%`;
    }
    return fallbackPct;
  };

  // Biomarkers mapped
  const hba1c = getBiomarker('HbA1c', '5.7%', 'Watch glucose control', 'Drifting upward compared with prior results', 'rgba(230,162,60,1)');
  const vitD = getBiomarker('Vitamin D', '24 ng/mL', 'Below target range', 'Low level worth discussing with a clinician', 'rgba(235,87,87,1)');
  const ldl = getBiomarker('LDL-C', '122 mg/dL', 'Borderline cholesterol', 'Nutrition and follow-up testing recommended', 'rgba(230,162,60,1)');
  const tsh = getBiomarker('TSH', '2.1 mIU/L', 'Within reference range', 'Thyroid marker is currently stable', '#38C8DC');
  const ferritin = getBiomarker('Ferritin', '42 ng/mL', 'Iron stores snapshot', 'Interpret alongside full iron panel', 'rgba(255,255,255,0.55)');
  const magnesium = getBiomarker('Magnesium', '2.1 mg/dL', 'Optimal', 'Within ideal range', '#38C8DC');

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden w-full bg-transparent"
      style={{ padding: '80px 24px', isolation: 'isolate' }}
    >
      {/* Hidden input file element */}
      <input 
        id="dashboard-file-upload"
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="application/pdf,image/*" 
        style={{ display: 'none' }} 
      />
      
      {/* Ambient Cursor Glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(56,180,220,0.08), transparent)`
        }}
      />

      {/* Scroll Depth Glow */}
      <motion.div 
        className="pointer-events-none absolute bottom-[-100px] left-1/2 -translate-x-1/2 z-0"
        style={{
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(30,80,140,0.26), transparent)',
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Light Beam */}
      <motion.div 
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-10"
        style={{
          width: '600px',
          height: '300px',
          top: '0px',
          animation: isInView ? 'beam-pulse 4s ease-in-out infinite' : 'none'
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(56, 180, 220, 0.45) 0%, rgba(56, 140, 200, 0.2) 40%, transparent 70%)'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(180, 230, 255, 0.65) 0%, rgba(100, 190, 230, 0.26) 30%, transparent 60%)'
          }}
        />
      </motion.div>

      {/* Dashboard Window Wrapper for Border & Glow */}
      <motion.div 
        className="relative z-20 w-full rounded-[16px] p-[1px] overflow-hidden"
        style={{
          maxWidth: '1100px',
          height: 'auto',
          background: 'linear-gradient(135deg, rgba(56,200,220,0.6) 0%, rgba(255,255,255,0.1) 30%, rgba(56,140,200,0.4) 60%, rgba(255,255,255,0.12) 100%)',
          boxShadow: '0 0 80px rgba(56,180,220,0.2), 0 0 150px rgba(56,140,200,0.11), 0 40px 80px rgba(0,0,0,0.7)',
          transformOrigin: 'top center',
          margin: '0 auto',
          isolation: 'isolate'
        }}
        initial={{ opacity: 0, y: 60, scale: 1 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
      >
        {/* Animated shimmer border */}
        <div 
          className="absolute inset-0 rounded-[16px] z-[-1] opacity-60"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(56,200,220,0.8) 20%, rgba(180,240,255,1) 50%, rgba(56,200,220,0.8) 80%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'border-shimmer 3s linear infinite'
          }}
        />
        
        {/* Four corner sparks */}
        <div className="absolute top-[-2px] left-[-2px] w-[4px] h-[4px] rounded-full z-[-1]" style={{ background: 'rgba(180,240,255,0.9)', boxShadow: '0 0 6px 2px rgba(56,200,220,0.8)', animation: 'corner-pulse 2s ease-in-out infinite alternate' }} />
        <div className="absolute top-[-2px] right-[-2px] w-[4px] h-[4px] rounded-full z-[-1]" style={{ background: 'rgba(180,240,255,0.9)', boxShadow: '0 0 6px 2px rgba(56,200,220,0.8)', animation: 'corner-pulse 2s ease-in-out infinite alternate 0.5s' }} />
        <div className="absolute bottom-[-2px] left-[-2px] w-[4px] h-[4px] rounded-full z-[-1]" style={{ background: 'rgba(180,240,255,0.9)', boxShadow: '0 0 6px 2px rgba(56,200,220,0.8)', animation: 'corner-pulse 2s ease-in-out infinite alternate 1s' }} />
        <div className="absolute bottom-[-2px] right-[-2px] w-[4px] h-[4px] rounded-full z-[-1]" style={{ background: 'rgba(180,240,255,0.9)', boxShadow: '0 0 6px 2px rgba(56,200,220,0.8)', animation: 'corner-pulse 2s ease-in-out infinite alternate 1.5s' }} />

        {/* Inner Dashboard */}
        <div className="relative z-10 w-full h-full bg-[#0d1117] rounded-[16px] overflow-hidden flex flex-col min-h-[520px]">
          
          {/* GORGEOUS PREMIUM AI LOADER OVERLAY */}
          {loading && (
            <div className="absolute inset-0 z-50 bg-[#0d1117]/85 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-white/5 border-t-[#38C8DC] animate-spin" />
                <Sparkles size={20} className="text-[#38C8DC] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="text-sm font-semibold text-white/95">{uploadProgress || "Decoding blood test..."}</div>
              <div className="text-xs text-white/40">Securing environment & parsing biomarkers with Google Gemini</div>
            </div>
          )}

          {/* Title Bar */}
          <div className="flex items-center px-4 relative border-b border-white/5 bg-[#0d1117]" style={{ height: '38px' }}>
            <div className="flex items-center gap-[6px] absolute left-4">
              <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
            </div>
            <div className="w-full text-center" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>
              DecodeDx — Patient Intelligence
            </div>
          </div>

          {/* Three-column layout */}
          <div className="flex flex-col md:flex-row flex-1 items-start bg-[#0d1117]">
            
            {/* Column 1: Sidebar (160px) */}
            <div className="w-full md:w-[160px] shrink-0 border-r border-white/5 flex flex-col" style={{ alignSelf: 'flex-start', padding: '10px' }}>
              <button 
                onClick={triggerFileSelect}
                className="flex items-center justify-center gap-2 w-full py-[8px] px-[10px] rounded-[8px] bg-white text-black font-semibold hover:bg-white/90 transition-all active:scale-[0.98] cursor-pointer"
                style={{ fontSize: '0.75rem', width: '100%', marginBottom: '12px' }}
              >
                <Sparkles size={14} className="text-brand animate-pulse" /> Analyze with AI
              </button>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.11)', margin: '10px 0' }}></div>

              <nav className="flex flex-col w-full gap-[2px]">
                <div className="flex items-center justify-between w-full px-[8px] py-[5px] text-white rounded-[6px]" style={{ background: 'rgba(255,255,255,0.06)', fontSize: '0.75rem', borderLeft: '3px solid #38C8DC', cursor: 'pointer' }}>
                  <span className="flex items-center"><LayoutGrid size={13} strokeWidth={1.5} className="mr-[6px] text-[#38C8DC]" /> Overview</span>
                  <span className="text-[#38C8DC] font-bold" style={{ fontSize: '0.65rem' }}>&bull;</span>
                </div>
                <div className="flex items-center justify-between w-full px-[8px] py-[5px] text-white/82 hover:text-white rounded-[6px] cursor-pointer" style={{ fontSize: '0.75rem' }}>
                  <span className="flex items-center"><Flag size={13} strokeWidth={1.5} className="mr-[6px] text-white/55" /> Flagged</span>
                  <span className="bg-[#38C8DC] text-black text-[0.6rem] px-[6px] py-[1px] rounded-full font-bold">
                    {latestReport?.biomarkers?.filter((b: any) => b.status !== 'Normal' && b.status !== 'Optimal').length || 3}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full px-[8px] py-[5px] text-white/82 hover:text-white rounded-[6px] cursor-pointer" style={{ fontSize: '0.75rem' }}>
                  <span className="flex items-center"><TrendingUp size={13} strokeWidth={1.5} className="mr-[6px] text-white/55" /> Trends</span>
                </div>
                <div className="flex items-center justify-between w-full px-[8px] py-[5px] text-white/82 hover:text-white rounded-[6px] cursor-pointer" style={{ fontSize: '0.75rem' }}>
                  <span className="flex items-center"><MessageCircle size={13} strokeWidth={1.5} className="mr-[6px] text-white/55" /> Questions</span>
                  <span className="bg-[#38C8DC] text-black text-[0.6rem] px-[6px] py-[1px] rounded-full font-bold">3</span>
                </div>
                <div className="flex items-center justify-between w-full px-[8px] py-[5px] text-white/82 hover:text-white rounded-[6px] cursor-pointer" style={{ fontSize: '0.75rem' }}>
                  <span className="flex items-center"><Clock size={13} strokeWidth={1.5} className="mr-[6px] text-white/55" /> History</span>
                </div>
                <div className="flex items-center justify-between w-full px-[8px] py-[5px] text-white/82 hover:text-white rounded-[6px] cursor-pointer" style={{ fontSize: '0.75rem' }}>
                  <span className="flex items-center"><Upload size={13} strokeWidth={1.5} className="mr-[6px] text-white/55" /> Export</span>
                </div>
              </nav>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.11)', margin: '10px 0' }}></div>

              <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', textTransform: 'uppercase' }}>
                PANELS
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/55" style={{ fontSize: '0.75rem' }}>
                  <span className="w-2 h-2 rounded-full bg-[#38C8DC]" /> Metabolic
                </div>
                <div className="flex items-center gap-2 text-white/55" style={{ fontSize: '0.75rem' }}>
                  <span className="w-2 h-2 rounded-full bg-[#fcd34d]" /> Hormones
                </div>
                <div className="flex items-center gap-2 text-white/55" style={{ fontSize: '0.75rem' }}>
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Vitamins
                </div>
                <div className="flex items-center gap-2 text-white/55" style={{ fontSize: '0.75rem' }}>
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" /> Cardiac
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.11)', margin: '10px 0' }}></div>

              <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', textTransform: 'uppercase' }}>
                VITALS
              </div>
              <div className="flex flex-col gap-2">
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', padding: '3px 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span>♡ Heart</span> <span>73 BPM</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', padding: '3px 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span>◐ Sleep</span> <span>6.2 hrs</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', padding: '3px 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span>◎ Hydration</span> <span>72%</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', padding: '3px 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span>⊡ Weight</span> <span>73 kg</span>
                </div>
              </div>
            </div>

            {/* Column 2: Main Content */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-white/5" style={{ alignSelf: 'flex-start', padding: '10px', overflow: 'hidden' }}>
              
              {/* Search Bar */}
              <div className="relative w-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '8px', padding: '8px 12px', marginBottom: '12px' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} className="text-white" />
                <input 
                  type="text" 
                  placeholder="Search biomarkers" 
                  className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/35 pl-6" 
                  style={{ fontSize: '0.78rem' }} 
                  disabled
                />
              </div>

              {/* Biomarker list */}
              <div className="flex flex-col w-full gap-2">
                {getRenderBiomarkers().map((row, i) => (
                  <div 
                    key={i} 
                    className="w-full bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.04] transition-colors"
                    style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div className="flex-1">
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{row.name}</div>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span style={{ fontSize: '0.68rem', fontWeight: 600, color: row.statusColor, background: `${row.statusColor}1a`, padding: '2px 6px', borderRadius: '4px' }}>{row.status}</span>
                        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>{row.desc}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', textAlign: 'right', paddingLeft: '16px' }}>
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* 2×2 Mini Metric Widget Grid */}
              <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingBottom: '14px' }}>
                {/* Widget A: HbA1c */}
                <div className="dashboard-widget">
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38C8DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#38C8DC]">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>HbA1c</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{hba1c.value}</span>
                    <span style={{ background: `${hba1c.color}1e`, border: `1px solid ${hba1c.color}4c`, color: hba1c.color, borderRadius: '999px', fontSize: '0.6rem', padding: '2px 7px' }}>
                      {hba1c.status}
                    </span>
                  </div>
                  <div className="w-full bg-[rgba(255,255,255,0.12)] rounded-[2px]" style={{ height: '3px', marginTop: '8px' }}>
                    <div className="h-full rounded-[2px]" style={{ width: getBiomarkerPercentage('HbA1c', '85%'), backgroundColor: hba1c.color }}></div>
                  </div>
                </div>

                {/* Widget B: Vitamin D */}
                <div className="dashboard-widget">
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38C8DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#38C8DC]">
                      <circle cx="12" cy="12" r="4"/>
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                    </svg>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Vitamin D</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{vitD.value}</span>
                    <span style={{ background: `${vitD.color}1e`, border: `1px solid ${vitD.color}4c`, color: vitD.color, borderRadius: '999px', fontSize: '0.6rem', padding: '2px 7px' }}>
                      {vitD.status}
                    </span>
                  </div>
                  <div className="w-full bg-[rgba(255,255,255,0.12)] rounded-[2px]" style={{ height: '3px', marginTop: '8px' }}>
                    <div className="h-full rounded-[2px]" style={{ width: getBiomarkerPercentage('Vitamin D', '24%'), backgroundColor: vitD.color }}></div>
                  </div>
                </div>

                {/* Widget C: LDL-C */}
                <div className="dashboard-widget">
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38C8DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#38C8DC]">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>LDL-C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{ldl.value}</span>
                    <span style={{ background: `${ldl.color}1e`, border: `1px solid ${ldl.color}4c`, color: ldl.color, borderRadius: '999px', fontSize: '0.6rem', padding: '2px 7px' }}>
                      {ldl.status}
                    </span>
                  </div>
                  <div className="w-full bg-[rgba(255,255,255,0.12)] rounded-[2px]" style={{ height: '3px', marginTop: '8px' }}>
                    <div className="h-full rounded-[2px]" style={{ width: getBiomarkerPercentage('LDL-C', '80%'), backgroundColor: ldl.color }}></div>
                  </div>
                </div>

                {/* Widget D: TSH */}
                <div className="dashboard-widget">
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38C8DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#38C8DC]">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                    </svg>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>TSH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{tsh.value}</span>
                    <span style={{ background: `${tsh.color}1e`, border: `1px solid ${tsh.color}4c`, color: tsh.color, borderRadius: '999px', fontSize: '0.6rem', padding: '2px 7px' }}>
                      {tsh.status}
                    </span>
                  </div>
                  <div className="w-full bg-[rgba(255,255,255,0.12)] rounded-[2px]" style={{ height: '3px', marginTop: '8px' }}>
                    <div className="h-full rounded-[2px]" style={{ width: getBiomarkerPercentage('TSH', '45%'), backgroundColor: tsh.color }}></div>
                  </div>
                </div>

                {/* Widget E: Ferritin */}
                <div className="dashboard-widget">
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38C8DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#38C8DC]">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ferritin</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{ferritin.value}</span>
                    <span style={{ background: `${ferritin.color}1e`, border: `1px solid ${ferritin.color}4c`, color: ferritin.color === 'rgba(255,255,255,0.55)' ? '#aaa' : ferritin.color, borderRadius: '999px', fontSize: '0.6rem', padding: '2px 7px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                      {ferritin.status}
                    </span>
                  </div>
                  <div className="w-full bg-[rgba(255,255,255,0.12)] rounded-[2px]" style={{ height: '3px', marginTop: '8px' }}>
                    <div className="h-full rounded-[2px]" style={{ width: getBiomarkerPercentage('Ferritin', '30%'), backgroundColor: ferritin.color === 'rgba(255,255,255,0.55)' ? '#aaa' : ferritin.color }}></div>
                  </div>
                </div>

                {/* Widget F: Magnesium */}
                <div className="dashboard-widget">
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38C8DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#38C8DC]">
                      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                      <line x1="12" y1="22" x2="12" y2="15.5" />
                      <polyline points="22 8.5 12 15.5 2 8.5" />
                      <polyline points="2 15.5 12 8.5 22 15.5" />
                      <line x1="12" y1="2" x2="12" y2="8.5" />
                    </svg>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Magnesium</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{magnesium.value}</span>
                    <span style={{ background: `${magnesium.color}1e`, border: `1px solid ${magnesium.color}4c`, color: magnesium.color, borderRadius: '999px', fontSize: '0.6rem', padding: '2px 7px' }}>
                      {magnesium.status}
                    </span>
                  </div>
                  <div className="w-full bg-[rgba(255,255,255,0.12)] rounded-[2px]" style={{ height: '3px', marginTop: '8px' }}>
                    <div className="h-full rounded-[2px]" style={{ width: getBiomarkerPercentage('Magnesium', '65%'), backgroundColor: magnesium.color }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Right Panel (300px) */}
            <div className="w-full md:w-[300px] shrink-0 flex flex-col bg-[#0d1117]" style={{ alignSelf: 'flex-start', padding: '10px' }}>
              {/* Header */}
              <div className="flex items-center justify-between" style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>Metabolic health snapshot</span>
                <div className="flex items-center gap-3" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>
                  <span className="hover:text-white cursor-pointer transition-colors">&larr;</span>
                  <span className="hover:text-white cursor-pointer transition-colors">&rarr;</span>
                  <span className="hover:text-white cursor-pointer transition-colors">&#8862;</span>
                  <span className="hover:text-white cursor-pointer transition-colors">&#128465;</span>
                </div>
              </div>

              {/* Avatar Row */}
              <div className="flex items-center gap-3" style={{ marginBottom: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#38C8DC', color: 'black', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  L
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'white' }}>AI Lab Interpreter</div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)' }}>for patient &middot; parsed instantly</div>
                </div>
                <div className="ml-auto">
                  <span style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', fontSize: '0.65rem', padding: '2px 7px', color: 'rgba(255,255,255,0.55)' }}>Metabolic</span>
                </div>
              </div>

              {/* AI Summary Card */}
              <div style={{ background: 'rgba(56,200,220,0.05)', border: '1px solid rgba(56,200,220,0.3)', borderRadius: '10px', padding: '12px', marginBottom: '10px' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#38C8DC" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                  </svg>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#38C8DC' }}>AI summary</span>
                </div>
                <p style={{ fontSize: '0.75rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', margin: 0 }}>
                  {latestReport?.summary || "Glucose control is drifting upward while vitamin D remains below the target range. LDL-C is borderline, so nutrition and follow-up testing should be prioritised."}
                </p>
              </div>

              {/* Interpretation Section */}
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
                Plain-language interpretation:
              </div>
              <div className="flex flex-col">
                {latestReport ? (
                  <p style={{ fontSize: '0.75rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', margin: 0, marginBottom: '8px' }}>
                    {latestReport.interpretation}
                  </p>
                ) : (
                  <>
                    <p style={{ fontSize: '0.75rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', margin: 0, marginBottom: '8px' }}>
                      Your results show a small upward movement in HbA1c, which can suggest glucose control is becoming less optimal over time.
                    </p>
                    <p style={{ fontSize: '0.75rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', margin: 0, marginBottom: '8px' }}>
                      Vitamin D is below the target range and LDL-C is borderline. These markers are best understood together with diet, symptoms, medication history, and prior lab trends.
                    </p>
                    <p style={{ fontSize: '0.75rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', margin: 0 }}>
                      Bring these questions to your clinician: should vitamin D be rechecked, should lipid testing be repeated, and what lifestyle changes are appropriate?
                    </p>
                  </>
                )}
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.11)', margin: '10px 0' }}></div>

              {/* Suggested Questions Section */}
              <div style={{ fontSize: '0.68rem', color: '#38C8DC', fontWeight: 600, marginBottom: '8px' }}>
                Questions for your clinician:
              </div>
              <ul style={{ paddingLeft: '14px', margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.5, listStyleType: 'disc' }}>
                {latestReport?.suggested_questions ? (
                  latestReport.suggested_questions.map((q: string, idx: number) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{q}</li>
                  ))
                ) : (
                  <>
                    <li style={{ marginBottom: '6px' }}>Should my Vitamin D level be rechecked?</li>
                    <li style={{ marginBottom: '6px' }}>Should lipid panel testing be repeated?</li>
                    <li style={{ marginBottom: '6px' }}>What lifestyle and diet changes are appropriate?</li>
                  </>
                )}
              </ul>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.11)', margin: '10px 0' }}></div>

              {/* Footer Educational guidance */}
              <div style={{ fontStyle: 'italic', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>
                &mdash; Educational guidance, not a diagnosis
              </div>

              {/* Attachment chip */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', width: 'fit-content' }}>
                <Paperclip size={10} className="text-white/40" />
                <span className="truncate max-w-[200px]">{latestReport?.file_name || "sample-lab-report.pdf"}</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
