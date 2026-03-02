import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    Heart, Stethoscope, Pill, ArrowRight, Shield, Clock,
    Users, Activity, CheckCircle, Microscope, Syringe,
    Phone, ChevronRight
} from 'lucide-react';

const STATS = [
    { value: '10,000+', label: 'Patients Served' },
    { value: '50+', label: 'Specialist Doctors' },
    { value: '24/7', label: 'Emergency Care' },
    { value: '99%', label: 'Patient Satisfaction' },
];

const SERVICES_PREVIEW = [
    { icon: <Stethoscope size={28} />, title: 'Specialist Consultation', text: 'Access qualified doctors across all specialties.' },
    { icon: <Microscope size={28} />, title: 'Advanced Diagnostics', text: 'State-of-the-art lab tests with rapid results.' },
    { icon: <Syringe size={28} />, title: 'Prescription & Pharmacy', text: 'Doctor-issued prescriptions filled same day.' },
    { icon: <Shield size={28} />, title: 'EMR Data Security', text: 'All patient records encrypted and role-protected.' },
];

const Home = () => {
    useEffect(() => {
        document.title = 'Lifeline Healthcare Global Options — Compassionate Care, Digital Precision';
    }, []);

    return (
        <div style={{ backgroundColor: '#F8FAFC' }}>
            <Navbar />

            {/* ── HERO ───────────────────────────────────── */}
            <section style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                backgroundImage: 'url(https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1920&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
            }}>
                {/* gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(29,78,216,0.5) 100%)'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '7rem', paddingBottom: '4rem' }}>
                    <div style={{ maxWidth: '720px' }}>
                        {/* pill badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)',
                            borderRadius: '999px', padding: '0.45rem 1.25rem', marginBottom: '2rem',
                            color: '#93C5FD', fontSize: '0.78rem', fontWeight: '800', letterSpacing: '1.5px',
                            textTransform: 'uppercase'
                        }}>
                            <Activity size={14} /> Nigeria's Premier Digital Healthcare Platform
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                            fontWeight: '900', color: '#fff',
                            lineHeight: '1.1', marginBottom: '1.75rem',
                            textShadow: '0 2px 12px rgba(0,0,0,0.25)'
                        }}>
                            Your Well-being,<br />
                            <span style={{ color: '#60A5FA' }}>Our Priority</span>
                        </h1>

                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            color: 'rgba(255,255,255,0.72)', lineHeight: '1.75',
                            marginBottom: '2.5rem', maxWidth: '600px'
                        }}>
                            Lifeline Healthcare provides world-class medical and pharmaceutical care under one roof —
                            advanced EMR technology meets compassionate, human-centred treatment.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/login" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
                                Book Appointment <ArrowRight size={18} />
                            </Link>
                            <Link to="/shop" className="btn btn-outline" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
                                Visit Pharmacy
                            </Link>
                        </div>

                        {/* quick trust bar */}
                        <div style={{
                            display: 'flex', gap: '2rem', marginTop: '3.5rem',
                            flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.12)',
                            paddingTop: '2rem'
                        }}>
                            {[
                                { icon: <Shield size={16} />, text: 'NAFDAC Certified' },
                                { icon: <CheckCircle size={16} />, text: 'Fully Licensed EMR' },
                                { icon: <Clock size={16} />, text: '24/7 Emergency' },
                            ].map((t, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#93C5FD', fontSize: '0.85rem', fontWeight: '600' }}>
                                    {t.icon} {t.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '2px', textAlign: 'center' }}>
                    <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)', margin: '0 auto 0.5rem' }} />
                    SCROLL
                </div>
            </section>

            {/* ── STATS ─────────────────────────────────── */}
            <section style={{ background: '#1D4ED8', padding: '3rem 0' }}>
                <div className="container">
                    <div className="grid grid-cols-4" style={{ gap: '1rem', textAlign: 'center' }}>
                        {STATS.map((s, i) => (
                            <div key={i} style={{ padding: '1rem' }}>
                                <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', color: '#fff', marginBottom: '0.25rem' }}>{s.value}</div>
                                <div style={{ color: '#BFDBFE', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MAIN ENTITIES ─────────────────────────── */}
            <section className="section" style={{ padding: '7rem 0', background: '#fff' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.25rem', background: '#EFF6FF', borderRadius: '999px', color: '#1D4ED8', fontWeight: '800', fontSize: '0.78rem', letterSpacing: '1.5px', marginBottom: '1.25rem' }}>
                            <Activity size={14} /> OUR HEALTHCARE ENTITIES
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', color: '#0F172A', margin: '0 0 1rem' }}>
                            Two Pillars of Excellence
                        </h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748B', fontSize: '1.1rem', lineHeight: '1.7' }}>
                            One institution, two powerful services — advanced hospital care and a fully-stocked digital pharmacy.
                        </p>
                    </div>

                    <div className="grid grid-cols-2" style={{ gap: '2.5rem' }}>

                        {/* ─ Hospital Card ─ */}
                        <div style={{
                            background: '#fff', borderRadius: '28px', overflow: 'hidden',
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 10px 40px rgba(29,78,216,0.06)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(29,78,216,0.14)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(29,78,216,0.06)'; }}
                        >
                            {/* Image */}
                            <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                                    alt="Lifeline Hospital"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 60%)' }} />
                                <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', background: '#fff', padding: '0.4rem 1rem', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', color: '#1D4ED8', fontSize: '0.8rem' }}>
                                    <Heart size={14} color="#EF4444" fill="#EF4444" /> Full EMR Facility
                                </div>
                            </div>

                            <div style={{ padding: '2.5rem' }}>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', marginBottom: '1rem' }}>Lifeline Hospital</h3>
                                <p style={{ color: '#64748B', lineHeight: '1.7', marginBottom: '1.75rem', fontSize: '1rem' }}>
                                    Seamless medical care powered by a full Electronic Medical Record (EMR) system.
                                    From nurse triage to specialist consultation, diagnostics, and prescriptions — all paperless.
                                </p>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
                                    {['Advanced Lab Diagnostics', 'Role-Based Medical Staff Access', '24/7 Emergency Department'].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', color: '#334155', fontWeight: '600', fontSize: '0.9rem' }}>
                                            <div style={{ width: '28px', height: '28px', background: '#EFF6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <CheckCircle size={14} color="#1D4ED8" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: '#1D4ED8', color: '#fff', padding: '1rem 2rem', borderRadius: '12px', fontWeight: '800', fontSize: '1rem', textDecoration: 'none', transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#1E3A8A'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#1D4ED8'}
                                >
                                    Access Patient Portal <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>

                        {/* ─ Pharmacy Card ─ */}
                        <div style={{
                            background: '#fff', borderRadius: '28px', overflow: 'hidden',
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 10px 40px rgba(15,118,110,0.06)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(15,118,110,0.14)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(15,118,110,0.06)'; }}
                        >
                            {/* Image */}
                            <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80"
                                    alt="Lifeline Pharmacy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 60%)' }} />
                                <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', background: '#fff', padding: '0.4rem 1rem', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', color: '#0F766E', fontSize: '0.8rem' }}>
                                    <Pill size={14} color="#0F766E" /> E-Commerce Pharmacy
                                </div>
                            </div>

                            <div style={{ padding: '2.5rem' }}>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', marginBottom: '1rem' }}>Lifeline Pharmacy</h3>
                                <p style={{ color: '#64748B', lineHeight: '1.7', marginBottom: '1.75rem', fontSize: '1rem' }}>
                                    Order certified medications, supplements, and healthcare essentials online.
                                    Prescriptions validated, products NAFDAC-certified, delivery tracked nationwide.
                                </p>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
                                    {['100% Genuine NAFDAC Drugs', 'Nationwide Express Delivery', 'Prescription Verification System'].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', color: '#334155', fontWeight: '600', fontSize: '0.9rem' }}>
                                            <div style={{ width: '28px', height: '28px', background: '#ECFDF5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <CheckCircle size={14} color="#059669" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/shop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: '#0F766E', color: '#fff', padding: '1rem 2rem', borderRadius: '12px', fontWeight: '800', fontSize: '1rem', textDecoration: 'none', transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#0D6B63'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#0F766E'}
                                >
                                    Shop Medications <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── WHY LIFELINE ──────────────────────────── */}
            <section style={{
                padding: '7rem 0',
                backgroundImage: 'url(https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1920&q=80)',
                backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.88)' }} />
                <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.25rem', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '999px', color: '#93C5FD', fontWeight: '800', fontSize: '0.78rem', letterSpacing: '1.5px', marginBottom: '1.5rem' }}>
                        OUR SERVICES
                    </div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', color: '#fff', marginBottom: '1rem' }}>
                        Why Trust Lifeline?
                    </h2>
                    <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 4rem', lineHeight: '1.7' }}>
                        Every department in our institution is built to one standard — delivering excellence.
                    </p>
                    <div className="grid grid-cols-4" style={{ gap: '1.5rem', textAlign: 'left' }}>
                        {SERVICES_PREVIEW.map((s, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2rem', transition: 'all 0.3s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(29,78,216,0.15)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                            >
                                <div style={{ width: '52px', height: '52px', background: 'rgba(59,130,246,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', marginBottom: '1.25rem' }}>
                                    {s.icon}
                                </div>
                                <h4 style={{ fontWeight: '800', color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>{s.title}</h4>
                                <p style={{ color: '#94A3B8', fontSize: '0.875rem', margin: 0, lineHeight: '1.6' }}>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA STRIP ─────────────────────────────── */}
            <section style={{ padding: '5rem 0', background: '#fff' }}>
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, #1D4ED8 0%, #1E3A8A 100%)',
                        borderRadius: '28px', padding: '4rem',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        gap: '2rem', flexWrap: 'wrap'
                    }}>
                        <div>
                            <h2 style={{ color: '#fff', fontWeight: '900', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', margin: '0 0 0.75rem' }}>
                                Need Medical Attention?
                            </h2>
                            <p style={{ color: '#BFDBFE', margin: 0, fontSize: '1.05rem' }}>
                                Our emergency team is available 24/7. Call or book online.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href="tel:+234XXXXXXXXXX" className="btn" style={{ background: '#fff', color: '#1D4ED8', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={18} /> Call Now
                            </a>
                            <Link to="/contact" className="btn btn-outline" style={{ fontWeight: '800' }}>
                                Book Online
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer
                companyName="Lifeline Healthcare Global Options"
                registration="RC 1506925"
                address="Okewande Street, Budo Nuhu Village, Airport Area, Kwara State, Nigeria"
                email="info@lifelinehealthcareglobal.com"
                phone="+234-XXX-XXX-XXXX"
                aboutText="Nigeria's premier digital healthcare institution providing hospital EMR and online pharmacy services."
                quickLinks={[
                    { label: 'Home', url: '/' },
                    { label: 'About Us', url: '/about' },
                    { label: 'Services', url: '/services' },
                    { label: 'Pharmacy', url: '/shop' },
                    { label: 'Facilities', url: '/facilities' },
                    { label: 'Health Corner', url: '/health-corner' },
                    { label: 'Contact', url: '/contact' },
                ]}
                ctaText="Medical Portal"
                ctaLink="/login"
            />
        </div>
    );
};

export default Home;
