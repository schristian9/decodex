import { motion } from 'motion/react';
import { Calendar, Activity, ClipboardList, Users, Building2, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UseCasesPage() {
  const useCases = [
    {
      icon: <Calendar size={24} color="#38C8DC" strokeWidth={1.5} />,
      title: "Annual Health Check",
      body: "You got your yearly labs back. Everything looks 'normal' but you don't know what that means or whether anything changed since last year. DecodeDx shows you the trend, flags borderline values, and gives you questions worth asking.",
      tag: "Individuals"
    },
    {
      icon: <Activity size={24} color="#38C8DC" strokeWidth={1.5} />,
      title: "Managing a Chronic Condition",
      body: "You're monitoring thyroid, diabetes, or cardiovascular markers regularly. DecodeDx tracks every upload over time, highlights drift before it becomes a problem, and keeps your clinician questions sharp.",
      tag: "Individuals · Clinicians"
    },
    {
      icon: <ClipboardList size={24} color="#38C8DC" strokeWidth={1.5} />,
      title: "Pre-Appointment Preparation",
      body: "Your appointment is in two days and you just got your results. DecodeDx turns raw numbers into a structured brief so you walk in informed, not anxious.",
      tag: "Individuals"
    },
    {
      icon: <Users size={24} color="#38C8DC" strokeWidth={1.5} />,
      title: "Clinic Patient Education",
      body: "A primary care clinic sends DecodeDx summaries to patients 48 hours before their results appointment. Consultations become more productive. Patients arrive with better questions.",
      tag: "Clinicians"
    },
    {
      icon: <Building2 size={24} color="#38C8DC" strokeWidth={1.5} />,
      title: "Lab Results Portal Enhancement",
      body: "A diagnostic provider integrates DecodeDx into their results delivery. Every report now includes a plain-language summary. Patient satisfaction scores improve. Support calls drop.",
      tag: "Labs & Diagnostics"
    },
    {
      icon: <Heart size={24} color="#38C8DC" strokeWidth={1.5} />,
      title: "Family Health Monitoring",
      body: "You manage health for an elderly parent. Their labs come back and the numbers mean nothing to you. DecodeDx explains each marker, flags what's changed, and tells you exactly what to raise with their GP.",
      tag: "Individuals"
    }
  ];

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
          Use Cases · Real scenarios
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          style={{ letterSpacing: "-0.04em", lineHeight: "1.1", fontSize: "4.5rem", marginBottom: "20px" }}
        >
          Who uses DecodeDx<br />
          <span className="shiny">and why.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ maxWidth: '560px', margin: '0 auto' }}
        >
          From annual checkups to complex care journeys — here's how different people use blood intelligence.
        </motion.p>
      </section>

      <section className="container" style={{ paddingBottom: '120px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {useCases.map((uc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ 
                background: '#0d1117', 
                border: '1px solid rgba(255,255,255,0.11)', 
                borderRadius: '16px', 
                padding: '36px',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="hover:-translate-y-1 hover:border-[#38C8DC]/20 transition-all duration-300"
            >
              <div className="mb-6">{uc.icon}</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '16px' }}>{uc.title}</h3>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6, flexGrow: 1, marginBottom: '24px' }}>
                {uc.body}
              </p>
              <div>
                <span style={{ border: '1px solid rgba(255,255,255,0.95)', borderRadius: '999px', fontSize: '0.75rem', padding: '4px 12px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                  {uc.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container text-white/90" style={{ paddingBottom: '120px' }}>
        <Link className="apple-button outline" to="/solutions" style={{ margin: '0 auto', display: 'inline-flex' }}>
          See which plan fits your use case
          <ChevronRight className="icon chevron" />
        </Link>
      </section>
    </>
  );
}
