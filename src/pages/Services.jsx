import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { Stethoscope, Pill, Database, Activity, Shield, Microchip, Heart, Search, Truck } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1920&q=80';

const Services = () => {
    useEffect(() => {
        document.title = "Our Services | Lifeline Healthcare Global Options - Comprehensive Medical & Pharmacy Care";
    }, []);

    const hospitalServices = [
        {
            icon: <Database size={32} />,
            title: "Full EMR System",
            description: "Paperless medical records for seamless history tracking, diagnostics, and prescription management."
        },
        {
            icon: <Activity size={32} />,
            title: "Triage & Nursing",
            description: "Efficient patient vitals management, emergency response, and post-consultation care."
        },
        {
            icon: <Stethoscope size={32} />,
            title: "Specialist Consultation",
            description: "Access to highly qualified doctors across multiple specialties for accurate clinical examination."
        },
        {
            icon: <Microchip size={32} />,
            title: "Advanced Diagnostics",
            description: "In-house laboratory services with automated testing for haematology, chemistry, and microbiology."
        }
    ];

    const pharmacyServices = [
        {
            icon: <Pill size={32} />,
            title: "Online Pharmacy Store",
            description: "A robust e-commerce platform categorized into Analgesics, Antibiotics, Injections, and Supplements."
        },
        {
            icon: <Search size={32} />,
            title: "Prescription Verification",
            description: "Rigorous vetting of all prescription-only medications to ensure patient safety and legal compliance."
        },
        {
            icon: <Truck size={32} />,
            title: "Secure Med-Delivery",
            description: "Quick and safe nationwide delivery of medications with temperature-controlled logistics for sensitive drugs."
        }
    ];

    return (
        <div className="services-page" style={{ backgroundColor: '#F8FAFC' }}>
            <Navbar />

            <Hero
                title="Our Specialized Services"
                subtitle="Integrating advanced medical facilities with a structured pharmaceutical ecosystem for your total well-being."
                bgImage={HERO_IMG}
            />

            {/* Hospital Services */}
            <section className="section" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div className="text-center mb-16">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem 1.5rem', backgroundColor: '#EFF6FF', borderRadius: '50px' }}>
                            <Heart size={20} color="#2563EB" />
                            <span style={{ color: '#2563EB', fontWeight: '700', fontSize: '0.9rem' }}>HOSPITAL WING</span>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1E293B', marginBottom: '1.5rem' }}>Medical Center Solutions</h2>
                        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.1rem', color: '#64748B' }}>
                            Our hospital operates on a full Electronic Medical Record (EMR) system, ensuring your health journey is digitized and error-free.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {hospitalServices.map((service, index) => (
                            <div key={index} style={{
                                backgroundColor: '#FFF',
                                padding: '2.5rem',
                                borderRadius: '24px',
                                border: '1px solid #E2E8F0',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                            }} className="hover-lift">
                                <div style={{ color: '#2563EB', marginBottom: '1.5rem', backgroundColor: '#EFF6FF', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                                    {service.icon}
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem' }}>{service.title}</h3>
                                <p style={{ color: '#64748B', lineHeight: '1.6' }}>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pharmacy Services */}
            <section className="section" style={{ padding: '6rem 0', backgroundColor: '#F1F5F9' }}>
                <div className="container">
                    <div className="text-center mb-16">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem 1.5rem', backgroundColor: '#D1FAE5', borderRadius: '50px' }}>
                            <Pill size={20} color="#059669" />
                            <span style={{ color: '#059669', fontWeight: '700', fontSize: '0.9rem' }}>PHARMACY DIVISION</span>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1E293B', marginBottom: '1.5rem' }}>E-Pharmacy Ecosystem</h2>
                        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.1rem', color: '#64748B' }}>
                            Get genuine medications delivered to your doorstep. Our system categorizes drugs accurately for easy retrieval and clinical auditing.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pharmacyServices.map((service, index) => (
                            <div key={index} style={{
                                backgroundColor: '#FFF',
                                padding: '3rem',
                                borderRadius: '24px',
                                border: '1px solid #D1FAE5',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }} className="hover-lift">
                                <div style={{ color: '#059669', marginBottom: '1.5rem', backgroundColor: '#ECFDF5', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                                    {service.icon}
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem' }}>{service.title}</h3>
                                <p style={{ color: '#64748B', lineHeight: '1.6' }}>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Billing Note */}
            <section className="section" style={{ padding: '6rem 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem', backgroundColor: '#FFF', borderRadius: '32px', border: '2px dashed #E2E8F0' }}>
                        <Shield size={64} color="#2563EB" style={{ margin: '0 auto 2rem' }} />
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1E293B', marginBottom: '1.5rem' }}>Professional Billing & Transparency</h2>
                        <p style={{ fontSize: '1.15rem', color: '#64748B', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                            We operate a nurse-led billing system where all clinical costs—tests, medications, and treatments—are accurately logged and printable. Patients receive detailed medical histories and invoices for insurance or reference.
                        </p>
                        <a href="/contact" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '12px' }}>
                            Learn More About Our Facility
                        </a>
                    </div>
                </div>
            </section>

            <Footer
                companyName="Lifeline Healthcare Global Options"
                registration="RC 1506925"
                address="Okewande Street, Budo Nuhu Village, Airport Area, Asa L.G.A., Kwara State, Nigeria"
                email="info@lifelinehealthcareglobal.com"
                phone="+234-XXX-XXX-XXXX"
                aboutText="A comprehensive healthcare platform providing full EMR medical services and integrated pharmacy solutions."
                quickLinks={[
                    { label: 'Home', url: '/' },
                    { label: 'Services', url: '/services' },
                    { label: 'Pharmacy', url: '/shop' },
                    { label: 'Contact', url: '/contact' }
                ]}
                ctaText="Patient Portal"
                ctaLink="/login"
            />
        </div>
    );
};

export default Services;
