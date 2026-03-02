import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { Heart, Activity, Pill, Clock, ArrowRight, BookOpen } from 'lucide-react';

const HealthCorner = () => {
    useEffect(() => {
        document.title = "Health Corner | Lifeline Healthcare Global Options - Expert Medical Advice";
    }, []);

    const healthTips = [
        {
            category: "Wellness",
            title: "Hydration: The Invisible Vital Tool",
            text: "Staying hydrated is more than quenching thirst—it’s about maintaining cellular health and organ function.",
            icon: <Activity color="#2563EB" />
        },
        {
            category: "Pharmacy",
            title: "Understanding Your Prescription",
            text: "Why finishing your course of antibiotics is non-negotiable for long-term health and immunity.",
            icon: <Pill color="#059669" />
        },
        {
            category: "Clinical",
            title: "Regular Screenings Save Lives",
            text: "Early detection of hypertension and diabetes can make the difference between management and crisis.",
            icon: <Heart color="#EF4444" />
        }
    ];

    return (
        <div className="health-corner-page" style={{ backgroundColor: '#F8FAFC' }}>
            <Navbar />

            <Hero
                title="The Health Corner"
                subtitle="Reliable medical insights and wellness tips from our specialized doctors and pharmacists."
                bgImage="/images/banner_two.jpg"
            />

            <section className="section" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {healthTips.map((tip, i) => (
                            <div key={i} style={{
                                backgroundColor: '#FFF',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #E2E8F0',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ height: '240px', backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', position: 'relative' }}>
                                    <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <BookOpen size={64} color="#CBD5E1" style={{ opacity: 0.5 }} />
                                    </div>
                                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', backgroundColor: '#FFF', padding: '0.5rem 1rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {tip.icon}
                                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#1E293B', textTransform: 'uppercase' }}>{tip.category}</span>
                                    </div>
                                </div>
                                <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1E293B', marginBottom: '1rem' }}>{tip.title}</h3>
                                    <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '2rem' }}>{tip.text}</p>
                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563EB', fontWeight: '800', cursor: 'pointer' }}>
                                        READ ARTICLE <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ padding: '8rem 0', backgroundColor: '#1E293B', color: '#fff', textAlign: 'center' }}>
                <div className="container">
                    <Clock size={64} color="#3B82F6" style={{ margin: '0 auto 2.5rem' }} />
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>Ask Local Doctors Anything</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.25rem', color: '#94A3B8' }}>
                        Our healthcare professionals are available online. Subscribe to get our weekly health newsletter.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        <input placeholder="Your Email address" style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #334155', backgroundColor: 'transparent', color: '#fff' }} />
                        <button className="btn btn-primary" style={{ padding: '1rem 2rem', borderRadius: '12px' }}>Subscribe</button>
                    </div>
                </div>
            </section>

            <Footer
                companyName="Lifeline Healthcare Global Options"
                registration="RC 1506925"
                address="Okewande Street, Budo Nuhu Village, Airport Area, Asa L.G.A., Kwara State, Nigeria"
                email="info@lifelinehealthcareglobal.com"
                phone="+234-XXX-XXX-XXXX"
                aboutText="A comprehensive healthcare platform providing medical services and pharmacy solutions."
                quickLinks={[
                    { label: 'Home', url: '/' },
                    { label: 'Services', url: '/services' },
                    { label: 'Health Corner', url: '/health-corner' },
                    { label: 'Contact', url: '/contact' }
                ]}
                ctaText="Patient Portal"
                ctaLink="/login"
            />
        </div>
    );
};

export default HealthCorner;
