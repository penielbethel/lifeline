import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Stethoscope, ClipboardList, Microscope, Pill, Bed, Heart,
  CheckCircle, ArrowRight, Users, Shield, Activity, Clock,
  FileText, Thermometer, Syringe, Star, ChevronDown, Phone,
  AlertCircle, UserCheck, BarChart3, Award, Zap
} from 'lucide-react';

// ─── JOURNEY STEPS ─────────────────────────────────────────────
const JOURNEY = [
  {
    step: '01',
    phase: 'Registration & Triage',
    icon: <UserCheck size={32} />,
    color: '#1D4ED8',
    bg: '#EFF6FF',
    title: 'Patient Arrives & Gets Registered',
    story: 'The moment a patient walks through our doors, our HR team creates a secure digital patient record in seconds. No paperwork queues. No lost files. Every patient gets a unique Patient ID number and their full profile — allergies, blood group, genotype, emergency contacts — is stored safely in our EMR.',
    detail: 'Our nurse immediately conducts a triage assessment, measuring vital signs such as temperature, blood pressure, pulse rate, respiratory rate, and oxygen saturation. Based on the readings, patients are categorized by urgency level.',
    tags: ['Instant Digital Registration', 'Patient ID Generated', 'Allergy & Medical History Capture'],
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    vitals: [
      { label: 'Temperature', value: '36.5°C' },
      { label: 'Blood Pressure', value: '120/80' },
      { label: 'Pulse Rate', value: '72 bpm' },
      { label: 'SpO₂', value: '98%' },
    ]
  },
  {
    step: '02',
    phase: 'Doctor Consultation',
    icon: <Stethoscope size={32} />,
    color: '#7C3AED',
    bg: '#F5F3FF',
    title: 'Specialist Consultation & Clinical Examination',
    story: 'The patient is assigned to a doctor based on specialty and urgency. Our doctors have full digital access to the patient\'s history — previous visits, prior diagnoses, and results. No more re-telling the same story. The doctor performs a thorough clinical examination and records all findings directly in the EMR.',
    detail: 'Working and differential diagnoses are documented. The doctor then decides the plan: run tests, prescribe medication, admit the patient, or refer to a specialist. All decisions are time-stamped and traceable.',
    tags: ['Full Medical History Access', 'Digital Clinical Notes', 'Diagnosis Documentation'],
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
  },
  {
    step: '03',
    phase: 'Laboratory Diagnostics',
    icon: <Microscope size={32} />,
    color: '#0891B2',
    bg: '#ECFEFF',
    title: 'Tests Ordered & Processed by Lab Scientists',
    story: 'Doctors order lab tests directly from their digital interface. The Lab Scientist instantly sees the request appear on their dashboard — no physical request forms, no mix-ups. Tests such as Full Blood Count, Malaria RDT, Urinalysis, Blood Glucose, and more are processed with precision.',
    detail: 'Results are entered digitally and are immediately accessible to the ordering doctor. No more running between wards with printed sheets. Test costs are automatically calculated and flow into the patient\'s invoice.',
    tags: ['FBC, Malaria, Urinalysis & more', 'Digital Results Entry', 'Automatic Cost Tracking'],
    img: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=800&q=80',
    tests: ['Full Blood Count (FBC)', 'Malaria Rapid Test (RDT)', 'Urinalysis', 'Blood Glucose (FBS/RBS)', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'HIV Screening', 'Pregnancy Test (PCV)']
  },
  {
    step: '04',
    phase: 'Prescription & Pharmacy',
    icon: <Pill size={32} />,
    color: '#059669',
    bg: '#ECFDF5',
    title: 'Doctor Prescribes — Pharmacist Dispenses',
    story: 'Based on the test results, the doctor issues a digital prescription specifying drug names, dosages, frequencies, durations, and quantities. The Pharmacist sees the prescription instantly on their station and prepares the exact drugs required.',
    detail: 'Our integrated pharmacy means patients rarely need to leave the building to find medications. Everything is in-house and tracked. For complex or rare drugs, patients can also use our Lifeline Pharmacy e-commerce platform for home delivery.',
    tags: ['Doctor-Issued Digital Prescriptions', 'Pharmacist Confirms Dispensing', 'Rx Linked to Patient Record'],
    img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80',
  },
  {
    step: '05',
    phase: 'Treatment & Nursing Care',
    icon: <Syringe size={32} />,
    color: '#D97706',
    bg: '#FFFBEB',
    title: 'Nurses Administer Treatment',
    story: 'Our nursing team carries out the prescribed treatments — administering injections, setting up IV drips, monitoring vitals post-medication, and ensuring patient comfort. All actions are logged in real-time with the nurse\'s digital signature and timestamp.',
    detail: 'If a patient is admitted, they are assigned to a ward with continuous monitoring. Shift changes are seamless — incoming nurses can immediately see the complete clinical log and ongoing medications without missing a step.',
    tags: ['IV Therapy & Injection Admin', 'Continuous Vital Monitoring', 'Shift-Safe Digital Handover'],
    img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80',
  },
  {
    step: '06',
    phase: 'Billing & Discharge',
    icon: <FileText size={32} />,
    color: '#1D4ED8',
    bg: '#EFF6FF',
    title: 'Clear Invoice, Dignified Discharge',
    story: 'Before discharge, the nurse compiles a complete financial summary: consultation fee, lab test costs, drug costs, procedure fees — itemized clearly. The patient receives a printable invoice and a comprehensive medical history document they can present to any doctor in the future.',
    detail: 'Payment can be made by cash, POS, or bank transfer. The system then updates the patient record to "Discharged." Every interaction, from first arrival to final discharge, lives in the patient\'s permanent digital record — accessible securely next time they visit.',
    tags: ['Itemized Invoice Generation', 'Printable Medical History', 'Permanent Secure Records'],
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
];

const FEATURES = [
  { icon: <Shield size={28} />, title: 'Role-Based Access', text: 'Doctors, nurses, lab scientists, and pharmacists each see only what their role requires. Superadmin oversees everything.' },
  { icon: <Clock size={28} />, title: '24/7 Emergency', text: 'Our emergency department never sleeps. Digital triage means faster response and prioritized critical care.' },
  { icon: <BarChart3 size={28} />, title: 'Real-Time Audit Trail', text: 'Every action in the system is time-stamped and logged — full accountability, zero data loss.' },
  { icon: <FileText size={28} />, title: 'Printable Records', text: 'Patients can print their medical history and invoice at any time. No more paper chaos.' },
  { icon: <Zap size={28} />, title: 'Instant Results Flow', text: 'Lab results flow directly from the scientist\'s screen to the doctor\'s view. No delays, no paper transfer.' },
  { icon: <Heart size={28} />, title: 'Patient-First Design', text: 'Every workflow is designed around the patient experience — simple, dignified, efficient.' },
];

const STATS = [
  { value: '10,000+', label: 'Patients Treated' },
  { value: '< 5 min', label: 'Avg Triage Time' },
  { value: '99.2%', label: 'Record Accuracy' },
  { value: '24/7', label: 'Emergency Care' },
];

// ─── STEP COMPONENT (animated on scroll) ──────────────────────
const JourneyStep = ({ step, isLeft }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 80px 1fr',
      gap: '0',
      marginBottom: '0',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}>
      {/* Left content */}
      <div style={{ padding: '2rem 2rem 2rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...(isLeft ? {} : { visibility: 'hidden' }) }}>
        {isLeft && <StepCard step={step} />}
      </div>

      {/* Centre line + number bubble */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div style={{ width: '2px', flex: 1, background: 'linear-gradient(to bottom, transparent,  #BFDBFE)' }} />
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: step.color, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '900', fontSize: '1.1rem', flexShrink: 0,
          boxShadow: `0 0 0 6px ${step.bg}, 0 8px 20px ${step.color}55`,
          zIndex: 2
        }}>
          {step.step}
        </div>
        <div style={{ width: '2px', flex: 1, background: 'linear-gradient(to bottom, #BFDBFE, transparent)' }} />
      </div>

      {/* Right content */}
      <div style={{ padding: '2rem 0 2rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...(!isLeft ? {} : { visibility: 'hidden' }) }}>
        {!isLeft && <StepCard step={step} />}
      </div>
    </div>
  );
};

const StepCard = ({ step }) => (
  <div style={{
    background: '#fff', borderRadius: '20px',
    border: `1px solid ${step.color}22`,
    boxShadow: `0 4px 24px ${step.color}0a`,
    overflow: 'hidden'
  }}>
    {/* Image */}
    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
      <img src={step.img} alt={step.phase} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${step.color}cc 0%, transparent 60%)` }} />
      <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', color: '#fff' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '2px', opacity: 0.85, textTransform: 'uppercase', marginBottom: '0.2rem' }}>{step.phase}</div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '900', margin: 0, color: '#fff', lineHeight: '1.3' }}>{step.title}</h3>
      </div>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '44px', height: '44px', background: `${step.color}cc`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', backdropFilter: 'blur(4px)' }}>
        {step.icon}
      </div>
    </div>
    {/* Body */}
    <div style={{ padding: '1.5rem' }}>
      <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.9rem', marginBottom: '1rem' }}>{step.story}</p>
      <p style={{ color: '#64748B', lineHeight: '1.65', fontSize: '0.84rem', marginBottom: '1.25rem' }}>{step.detail}</p>
      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: step.vitals || step.tests ? '1rem' : 0 }}>
        {step.tags.map((t, i) => (
          <span key={i} style={{ padding: '0.25rem 0.75rem', background: step.bg, color: step.color, borderRadius: '999px', fontSize: '0.72rem', fontWeight: '700', border: `1px solid ${step.color}22` }}>{t}</span>
        ))}
      </div>
      {/* Vitals mini table */}
      {step.vitals && (
        <div style={{ background: step.bg, borderRadius: '12px', padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.5rem' }}>
          {step.vitals.map((v, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1rem', fontWeight: '900', color: step.color }}>{v.value}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '600' }}>{v.label}</div>
            </div>
          ))}
        </div>
      )}
      {/* Tests list */}
      {step.tests && (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Common Tests</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {step.tests.map((t, i) => (
              <span key={i} style={{ padding: '0.2rem 0.6rem', background: '#F1F5F9', color: '#334155', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '600' }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// ─── MOBILE STEP (stacked, no timeline columns) ──────────────
const MobileStep = ({ step }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: '2rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: step.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', flexShrink: 0, fontSize: '0.95rem' }}>{step.step}</div>
        <div style={{ fontWeight: '800', color: step.color, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{step.phase}</div>
      </div>
      <StepCard step={step} />
    </div>
  );
};

// ─── MAIN HOSPITAL PAGE ─────────────────────────────────────
const Hospital = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = 'Lifeline Hospital — Full EMR System | World-Class Patient Care';
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ background: '#F8FAFC' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        backgroundImage: 'url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff',
        paddingTop: '80px'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.93) 0%, rgba(29,78,216,0.55) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '700px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(59,130,246,0.4)', borderRadius: '999px', padding: '0.4rem 1.25rem', marginBottom: '2rem', color: '#93C5FD', fontSize: '0.78rem', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              <Stethoscope size={14} /> Full EMR Hospital
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', fontWeight: '900', color: '#fff', lineHeight: '1.1', marginBottom: '1.5rem' }}>
              Lifeline Hospital —<br /><span style={{ color: '#60A5FA' }}>Where Technology Heals</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.75)', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '580px' }}>
              Nigeria's most advanced Electronic Medical Record facility. From the moment you walk in to the moment you're discharged — every step is digital, traceable, and patient-centred.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#journey" className="btn btn-primary" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                See Patient Journey <ChevronDown size={18} />
              </a>
              <Link to="/login" className="btn btn-outline" style={{ fontSize: '0.95rem' }}>
                Staff Portal Login
              </Link>
            </div>
          </div>
        </div>
        {/* Down arrow indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.25)', margin: '0 auto 0.5rem' }} />
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '2px' }}>SCROLL</div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────── */}
      <section style={{ background: '#1D4ED8', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', textAlign: 'center' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ padding: '0.75rem' }}>
                <div style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: '900', color: '#fff' }}>{s.value}</div>
                <div style={{ color: '#BFDBFE', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────── */}
      <section style={{ padding: '6rem 0 3rem', background: '#fff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1.25rem', background: '#EFF6FF', borderRadius: '999px', color: '#1D4ED8', fontWeight: '800', fontSize: '0.75rem', letterSpacing: '1.5px', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
            HOW IT WORKS
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', color: '#0F172A', marginBottom: '1rem' }}>
            A Patient's Journey Through<br />Lifeline Hospital
          </h2>
          <p style={{ maxWidth: '660px', margin: '0 auto', color: '#64748B', fontSize: '1.05rem', lineHeight: '1.8' }}>
            From your first step inside to the moment you leave healthier — here is the complete, transparent story of how we care for every patient with precision and compassion.
          </p>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ──────────────────────── */}
      <section id="journey" style={{ padding: '2rem 0 6rem', background: '#fff' }}>
        <div className="container">
          {isMobile ? (
            /* Mobile: stacked cards */
            <div>
              {JOURNEY.map((step, i) => <MobileStep key={i} step={step} />)}
            </div>
          ) : (
            /* Desktop: alternating timeline */
            <div>
              {JOURNEY.map((step, i) => (
                <JourneyStep key={i} step={step} isLeft={i % 2 === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── WHAT MAKES US UNIQUE ──────────────────── */}
      <section style={{
        padding: '7rem 0',
        backgroundImage: 'url(https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.92)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.35rem 1.25rem', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '999px', color: '#93C5FD', fontWeight: '800', fontSize: '0.75rem', letterSpacing: '1.5px', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              OUR UNIQUENESS
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '900', color: '#fff', marginBottom: '0.75rem' }}>
              Why Choose Lifeline Hospital?
            </h2>
            <p style={{ color: '#94A3B8', maxWidth: '580px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.75' }}>
              We didn't just digitize paperwork — we reinvented the entire patient experience from the ground up.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '1.25rem' }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px', padding: '2rem', transition: 'all 0.3s ease'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(29,78,216,0.15)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ width: '56px', height: '56px', background: 'rgba(59,130,246,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', marginBottom: '1.25rem' }}>
                  {f.icon}
                </div>
                <h4 style={{ fontWeight: '800', color: '#fff', marginBottom: '0.5rem', fontSize: '1rem' }}>{f.title}</h4>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: '1.7', margin: 0 }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ROLES OVERVIEW ───────────────────── */}
      <section style={{ padding: '7rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '900', color: '#0F172A', marginBottom: '0.75rem' }}>Our Clinical Team</h2>
            <p style={{ color: '#64748B', maxWidth: '560px', margin: '0 auto', lineHeight: '1.8' }}>Every team member has a dedicated digital workspace. Here's what each role sees and does in the Lifeline EMR system.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1.25rem' }}>
            {[
              { role: 'HR / Admin', icon: <UserCheck size={28} />, color: '#1D4ED8', bg: '#EFF6FF', duties: ['Register patients', 'Manage staff', 'Discharge records'] },
              { role: 'Doctor', icon: <Stethoscope size={28} />, color: '#7C3AED', bg: '#F5F3FF', duties: ['Consultations', 'Order tests', 'Write prescriptions'] },
              { role: 'Nurse', icon: <Heart size={28} />, color: '#DC2626', bg: '#FEF2F2', duties: ['Record vitals', 'Administer drugs', 'Compile invoices'] },
              { role: 'Lab Scientist', icon: <Microscope size={28} />, color: '#0891B2', bg: '#ECFEFF', duties: ['Process tests', 'Enter results', 'Set test prices'] },
              { role: 'Pharmacist', icon: <Pill size={28} />, color: '#059669', bg: '#ECFDF5', duties: ['Dispense prescriptions', 'Manage drug stock', 'Verify Rx orders'] },
              { role: 'SuperAdmin', icon: <Shield size={28} />, color: '#0F172A', bg: '#F1F5F9', duties: ['Full system access', 'Audit trails', 'User management'] },
            ].map((r, i) => (
              <div key={i} style={{ background: r.bg, border: `1px solid ${r.color}15`, borderRadius: '20px', padding: '1.75rem', transition: 'transform 0.3s ease', textAlign: 'center' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ width: '60px', height: '60px', background: `${r.color}18`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.color, margin: '0 auto 1rem' }}>{r.icon}</div>
                <h4 style={{ fontWeight: '800', color: '#0F172A', marginBottom: '0.75rem', fontSize: '0.95rem' }}>{r.role}</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {r.duties.map((d, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', justifyContent: 'center' }}>
                      <CheckCircle size={12} color={r.color} /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, #1D4ED8, #1E3A8A)', borderRadius: '28px', padding: 'clamp(2.5rem, 5vw, 4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', textAlign: 'left' }}>
            <div>
              <h2 style={{ color: '#fff', fontWeight: '900', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', margin: '0 0 0.75rem' }}>
                Ready for a Hospital That Remembers You?
              </h2>
              <p style={{ color: '#BFDBFE', margin: 0, fontSize: '1rem', maxWidth: '500px', lineHeight: '1.7' }}>
                Visit Lifeline Hospital and experience the future of Nigerian healthcare — fast, digital, compassionate.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="tel:+234000000000" className="btn" style={{ background: '#fff', color: '#1D4ED8', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={18} /> Call Us
              </a>
              <Link to="/login" className="btn btn-outline" style={{ fontWeight: '800' }}>
                Staff Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer
        companyName="Lifeline Healthcare Global Options"
        registration="RC 1506925"
        address="Okewande Street, Budo Nuhu Village, Airport Area, Kwara State, Nigeria"
        email="hospital@lifelinehealthcareglobal.com"
        phone="+234-XXX-XXX-XXXX"
        aboutText="Lifeline Hospital — Nigeria's premier EMR-powered medical facility delivering compassionate, technology-driven patient care."
        quickLinks={[
          { label: 'Home', url: '/' },
          { label: 'Lifeline Hospital', url: '/hospital' },
          { label: 'Lifeline Pharmacy', url: '/shop' },
          { label: 'Services', url: '/services' },
          { label: 'Contact', url: '/contact' },
        ]}
        ctaText="Staff Portal"
        ctaLink="/login"
      />
    </div>
  );
};

export default Hospital;
