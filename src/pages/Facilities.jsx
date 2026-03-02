import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { Microscope, Bed, Shield, FlaskConical, Wifi, Tv, Wind, Activity } from 'lucide-react';

const Facilities = () => {
    useEffect(() => {
        document.title = "Our Facilities | Lifeline Healthcare Global Options - Modern Medical Infrastructure";
    }, []);

    const facilities = [
        {
            icon: <Microscope size={36} />,
            title: "Automated Laboratory",
            text: "Equipped with state-of-the-art diagnostic machines for rapid and accurate clinical results."
        },
        {
            icon: <Bed size={36} />,
            title: "Private Recovery Suites",
            text: "Comfortable, climate-controlled rooms designed for patient rest and holistic recovery."
        },
        {
            icon: <FlaskConical size={36} />,
            title: "Pharma Logistics Center",
            text: "A temperature-regulated pharmacy warehouse ensuring the integrity of all clinical drugs."
        },
        {
            icon: <Wifi size={36} />,
            title: "High-Speed EMR Network",
            text: "Fully networked facility for instant data transfer between triage, consulting, and labs."
        }
    ];

    return (
        <div className="facilities-page" style={{ backgroundColor: '#F8FAFC' }}>
            <Navbar />

            <Hero
                title="World-Class Infrastructure"
                subtitle="Explore our modern medical facility and professional pharmacy designed for clinical precision and patient comfort."
                bgImage="/images/banner_two.jpg"
            />

            <section className="section" style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div className="text-center mb-16">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem 1.5rem', backgroundColor: '#EFF6FF', borderRadius: '50px' }}>
                            <Activity size={20} color="#2563EB" />
                            <span style={{ color: '#2563EB', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1px' }}>INFRASTRUCTURE</span>
                        </div>
                        <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#1E293B', marginBottom: '1.5rem' }}>Medical Technology & Comfort</h2>
                        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.2rem', color: '#64748B', lineHeight: '1.8' }}>
                            At Lifeline, we believe that the environment is part of the cure. Our facilities are built to international healthcare standards.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {facilities.map((f, i) => (
                            <div key={i} style={{
                                backgroundColor: '#FFF',
                                padding: '3rem 2rem',
                                borderRadius: '32px',
                                border: '1px solid #E2E8F0',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                textAlign: 'center'
                            }} className="hover-lift">
                                <div style={{ color: '#2563EB', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                                    {f.icon}
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem' }}>{f.title}</h3>
                                <p style={{ color: '#64748B', lineHeight: '1.7' }}>{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Highlights */}
            <section className="section" style={{ padding: '8rem 0', backgroundColor: '#0F172A', color: '#fff' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', marginBottom: '2rem' }}>Experience the <span style={{ color: '#3B82F6' }}>Hospital of the Future</span></h2>
                            <p style={{ fontSize: '1.15rem', color: '#94A3B8', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                Our facility is designed for maximum clinical efficiency. Doctors carry out examinations with real-time access to lab results and patient history through our encrypted wireless network.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div style={{ borderLeft: '4px solid #3B82F6', paddingLeft: '1.5rem' }}>
                                    <Wind size={24} color="#3B82F6" style={{ marginBottom: '0.5rem' }} />
                                    <h4 style={{ fontWeight: '800' }}>Climate-Controlled</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Constant 24°C in all clinical areas.</p>
                                </div>
                                <div style={{ borderLeft: '4px solid #10B981', paddingLeft: '1.5rem' }}>
                                    <Tv size={24} color="#10B981" style={{ marginBottom: '0.5rem' }} />
                                    <h4 style={{ fontWeight: '800' }}>Smart Patient Info</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Digital signage for patient queue management.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            backgroundColor: '#1E293B',
                            height: '500px',
                            borderRadius: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #334155'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <Shield size={100} color="#3B82F6" style={{ opacity: 0.2, margin: '0 auto 1.5rem' }} />
                                <p style={{ color: '#475569', fontWeight: '700' }}>[ HIGH-SECURITY MEDICAL ZONE ]</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1F2937', marginBottom: '1.5rem' }}>Interested in a Facility Tour?</h2>
                    <p style={{ color: '#6B7280', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
                        We organize weekly tours for clinical researchers, medical students, and prospective patients to see our EMR systems in action.
                    </p>
                    <a href="/contact" className="btn btn-primary" style={{ padding: '1.2rem 4rem', fontSize: '1.1rem', borderRadius: '12px' }}>
                        Schedule a Visit
                    </a>
                </div>
            </section>

            <Footer
                companyName="Lifeline Healthcare Global Options"
                registration="RC 1506925"
                address="Okewande Street, Budo Nuhu Village, Airport Area, Asa L.G.A., Kwara State, Nigeria"
                email="info@lifelinehealthcareglobal.com"
                phone="+234-XXX-XXX-XXXX"
                aboutText="A comprehensive healthcare platform providing full EMR medical services and clinical excellence."
                quickLinks={[
                    { label: 'Home', url: '/' },
                    { label: 'About', url: '/about' },
                    { label: 'Facilities', url: '/facilities' },
                    { label: 'Contact', url: '/contact' }
                ]}
                ctaText="Patient Login"
                ctaLink="/login"
            />
        </div>
    );
};

export default Facilities;
