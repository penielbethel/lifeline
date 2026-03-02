import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { Heart, Stethoscope, Activity, Shield, Users, Globe, Award, CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_IMG = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80';

const About = () => {
    useEffect(() => {
        document.title = "About Us | Lifeline Healthcare Global Options - Our Medical Mission";
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { number: '15+', label: 'Specialists' },
        { number: '24/7', label: 'Availability' },
        { number: '100%', label: 'Digital Records' },
        { number: '5k+', label: 'Patients Served' }
    ];

    return (
        <div className="about-page" style={{ backgroundColor: '#F8FAFC' }}>
            <Navbar />

            <Hero
                title="About Lifeline Healthcare Global Options"
                subtitle="Transforming the healthcare landscape through clinical excellence and digital innovation."
                bgImage={HERO_IMG}
            />

            {/* Introduction & Our Story */}
            <section className="section" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-20px',
                                width: '100px',
                                height: '100px',
                                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                borderRadius: '50%',
                                zIndex: 0
                            }}></div>
                            <div style={{
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                                position: 'relative',
                                zIndex: 1,
                                backgroundColor: '#1E40AF',
                                height: '450px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Stethoscope size={150} color="#DBEAFE" style={{ opacity: 0.3 }} />
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '-30px',
                                right: '-20px',
                                backgroundColor: '#2563EB',
                                color: '#fff',
                                padding: '2rem',
                                borderRadius: '16px',
                                zIndex: 2,
                                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
                            }}>
                                <p style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1, marginBottom: '0.5rem' }}>EMR</p>
                                <p style={{ fontWeight: '600', letterSpacing: '2px' }}>POWERED</p>
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', backgroundColor: '#EFF6FF', color: '#2563EB', borderRadius: '50px', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                OUR STORY
                            </div>
                            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#1E293B', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                                Redefining <span style={{ color: '#2563EB' }}>Medical Care</span> for a Global Future
                            </h2>
                            <p style={{ fontSize: '1.15rem', color: '#64748B', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                Founded on the principle that "Health is Wealth," <strong>Lifeline Healthcare Global Options</strong> emerged as a response to the need for seamless, technology-driven medical services in Nigeria.
                            </p>
                            <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.8', marginBottom: '2rem' }}>
                                We bridge the gap between traditional clinical practice and modern digital solutions. By integrating a full Electronic Medical Record (EMR) system with a professional e-commerce pharmacy, we ensure that specialized care and essential medications are always within reach.
                            </p>

                            <div className="grid grid-cols-2 gap-8">
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Shield className="text-blue-600" size={24} color="#2563EB" />
                                    <div>
                                        <h4 style={{ fontWeight: '800', marginBottom: '0.5rem', color: '#1E293B' }}>Secure Data</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#64748B' }}>Encrypted patient records and clinical history.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Globe className="text-blue-600" size={24} color="#2563EB" />
                                    <div>
                                        <h4 style={{ fontWeight: '800', marginBottom: '0.5rem', color: '#1E293B' }}>Global Standards</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#64748B' }}>WHO-compliant pharmaceutical practices.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Blue Premium Section */}
            <section className="section" style={{ backgroundColor: '#0F172A', color: '#fff', position: 'relative', overflow: 'hidden', padding: '8rem 0' }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.2
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div style={{
                            padding: '4rem',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '32px',
                            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.1) 100%)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{
                                width: '70px', height: '70px',
                                backgroundColor: '#2563EB',
                                borderRadius: '20px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '2rem',
                                boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)'
                            }}>
                                <Heart size={36} color="#fff" />
                            </div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#fff' }}>Our Mission</h3>
                            <p style={{ fontSize: '1.25rem', color: '#94A3B8', lineHeight: '1.8' }}>
                                To save and enhance lives by providing accessible, technology-driven healthcare and pharmaceutical services through clinical expertise and professional integrity.
                            </p>
                        </div>

                        {/* Vision */}
                        <div style={{
                            padding: '4rem',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '32px',
                            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.1) 100%)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{
                                width: '70px', height: '70px',
                                backgroundColor: '#10B981',
                                borderRadius: '20px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '2rem',
                                boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)'
                            }}>
                                <Zap size={36} color="#fff" />
                            </div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#fff' }}>Our Vision</h3>
                            <p style={{ fontSize: '1.25rem', color: '#94A3B8', lineHeight: '1.8' }}>
                                To be Africa's leading healthcare ecosystem, recognized for setting the gold standard in digital medicine and pharmaceutical logistics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section" style={{ backgroundColor: '#fff', padding: '8rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
                        <div style={{ display: 'inline-block', padding: '0.4rem 1.2rem', backgroundColor: '#F1F5F9', color: '#475569', borderRadius: '50px', fontWeight: '700', fontSize: '0.8rem', marginBottom: '1rem', letterSpacing: '2px' }}>
                            CORE PHILOSOPHY
                        </div>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#1E293B', marginBottom: '1.5rem' }}>The Vitals of Our Service</h2>
                        <p style={{ color: '#64748B', fontSize: '1.2rem' }}>Every diagnostic result and every prescription is backed by our unwavering commitment to quality.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Activity, title: 'Precision', text: 'We leave no room for error. Our digital diagnostic systems ensure accurate results for better clinical outcomes.' },
                            { icon: Shield, title: 'Compliance', text: 'All our pharmaceutical products are WHO/NAFDAC certified, ensuring safety and efficacy for our patients.' },
                            { icon: Users, title: 'Patient-Centric', text: 'Your convenience is our priority. We design every system—from patient onboarding to delivery—around you.' },
                            { icon: Award, title: 'Clinical Excellence', text: 'Our medical professionals are vetted experts, dedicated to continuous learning and best practices.' },
                            { icon: Heart, title: 'Empathy', text: 'Beyond technology, we treat every patient with the dignity, compassion, and care they deserve.' },
                            { icon: Globe, title: 'Accessibility', text: 'Breaking geographical barriers through telemedicine and a robust nationwide drug delivery network.' }
                        ].map((value, idx) => (
                            <div key={idx} style={{
                                padding: '3rem',
                                borderRadius: '24px',
                                backgroundColor: '#F8FAFC',
                                border: '1px solid #E2E8F0',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                                className="hover-lift"
                            >
                                <div style={{ marginBottom: '1.5rem', color: '#2563EB', backgroundColor: '#EEF2FF', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <value.icon size={30} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: '#1E293B' }}>{value.title}</h3>
                                <p style={{ color: '#64748B', lineHeight: '1.7', fontSize: '1.05rem' }}>{value.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section style={{ backgroundColor: '#2563EB', padding: '6rem 0', color: '#fff' }}>
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {stats.map((stat, idx) => (
                            <div key={idx}>
                                <div style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '0.5rem' }}>{stat.number}</div>
                                <div style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', opacity: 0.8 }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="section" style={{ textAlign: 'center', padding: '10rem 0', backgroundColor: '#F1F5F9' }}>
                <div className="container">
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '2rem', color: '#1E293B' }}>Experience Modern Care</h2>
                    <p style={{ maxWidth: '650px', margin: '0 auto 3rem', fontSize: '1.25rem', color: '#475569' }}>
                        Whether you need a specialized consultation or genuine medication delivered, Lifeline Healthcare is here for you.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link to="/login" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', borderRadius: '12px' }}>
                            Book Appointment
                        </Link>
                        <Link to="/shop" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', borderRadius: '12px', border: '2px solid #2563EB', color: '#2563EB', textDecoration: 'none', fontWeight: '700' }}>
                            Visit Pharmacy
                        </Link>
                    </div>
                </div>
            </section>

            <Footer
                companyName="Lifeline Healthcare Global Options"
                registration="RC 1506925"
                address="Okewande Street, Budo Nuhu Village, Airport Area, Asa L.G.A., Kwara State, Nigeria"
                email="info@lifelinehealthcareglobal.com"
                phone="+234-XXX-XXX-XXXX"
                aboutText="Lifeline Healthcare Global Options is an enterprise-grade medical facility integrating full EMR hospitals and professional pharmacy services."
                quickLinks={[
                    { label: 'Home', url: '/' },
                    { label: 'Pharmacy', url: '/shop' },
                    { label: 'Patient Portal', url: '/login' },
                    { label: 'Contact', url: '/contact' }
                ]}
                ctaText="Medical Backoffice"
                ctaLink="/login"
            />
        </div>
    );
};

export default About;
