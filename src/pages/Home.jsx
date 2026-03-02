import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { Heart, Stethoscope, Pill, ArrowRight, Shield, Clock, Users, Activity } from 'lucide-react';

const Home = () => {
    useEffect(() => {
        document.title = "Lifeline Healthcare Global Options | Home";
    }, []);

    return (
        <div style={{ backgroundColor: '#F8FAFC' }}>
            <Navbar />

            {/* Hero Section */}
            <Hero
                title="Your Well-being, Our Priority"
                subtitle="Lifeline Healthcare Global Options provides world-class medical and pharmaceutical care under one roof. Advanced technology meets compassionate care."
                bgImage="/images/banner_two.jpg"
                ctaButtons={[{ label: 'Book an Appointment', link: '/login' }, { label: 'Visit Pharmacy', link: '/shop', secondary: true }]}
            />

            {/* Main Divisions */}
            <section className="section" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem 1.5rem', backgroundColor: '#EFF6FF', borderRadius: '50px' }}>
                            <Activity size={20} color="#2563EB" />
                            <span style={{ color: '#2563EB', fontWeight: '700', fontSize: '0.9rem' }}>OUR ENTITIES</span>
                        </div>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#1E293B' }}>Comprehensive Healthcare Services</h2>
                        <p style={{ maxWidth: '700px', margin: '1rem auto 0', fontSize: '1.2rem', color: '#64748B' }}>
                            Choose between our state-of-the-art Medical Center and our fully-stocked Electronic Pharmacy.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        {/* Lifeline Hospital */}
                        <div style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            border: '1px solid #E2E8F0'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(37, 99, 235, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.1)';
                            }}
                        >
                            <div style={{ height: '300px', backgroundColor: '#F1F5F9', position: 'relative' }}>
                                {/* Placeholder image using an icon since we might not have a hospital image */}
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E40AF' }}>
                                    <Stethoscope size={100} color="#DBEAFE" style={{ opacity: 0.8 }} />
                                </div>
                                <div style={{
                                    position: 'absolute', top: '1.5rem', left: '1.5rem',
                                    backgroundColor: '#FFFFFF', padding: '0.5rem 1rem', borderRadius: '50px',
                                    fontWeight: '700', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                    <Heart size={16} color="#EF4444" fill="#EF4444" />
                                    Full EMR Facility
                                </div>
                            </div>
                            <div style={{ padding: '3rem' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem' }}>Lifeline Hospital</h3>
                                <p style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: '1.7', marginBottom: '2rem' }}>
                                    Experience seamless medical care with our fully Electronic Medical Record (EMR) system. From triage to precision diagnostics, consult with the best specialists.
                                </p>
                                <ul style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#334155', fontWeight: '600' }}>
                                        <div style={{ padding: '0.4rem', backgroundColor: '#DBEAFE', borderRadius: '50%' }}>
                                            <Shield size={16} color="#2563EB" />
                                        </div>
                                        Advanced Diagnostics & Labs
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#334155', fontWeight: '600' }}>
                                        <div style={{ padding: '0.4rem', backgroundColor: '#DBEAFE', borderRadius: '50%' }}>
                                            <Users size={16} color="#2563EB" />
                                        </div>
                                        Expert Medical Professionals
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#334155', fontWeight: '600' }}>
                                        <div style={{ padding: '0.4rem', backgroundColor: '#DBEAFE', borderRadius: '50%' }}>
                                            <Clock size={16} color="#2563EB" />
                                        </div>
                                        24/7 Emergency Services
                                    </li>
                                </ul>
                                <Link to="/login" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                                    backgroundColor: '#2563EB', color: '#FFFFFF', padding: '1rem 2rem',
                                    borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', textDecoration: 'none',
                                    transition: 'background-color 0.2s', width: '100%', justifyContent: 'center'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                                >
                                    Access Patient Portal
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>

                        {/* Lifeline Pharmacy */}
                        <div style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            border: '1px solid #E2E8F0'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(16, 185, 129, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.1)';
                            }}
                        >
                            <div style={{ height: '300px', backgroundColor: '#F1F5F9', position: 'relative' }}>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#047857' }}>
                                    <Pill size={100} color="#D1FAE5" style={{ opacity: 0.8 }} />
                                </div>
                                <div style={{
                                    position: 'absolute', top: '1.5rem', left: '1.5rem',
                                    backgroundColor: '#FFFFFF', padding: '0.5rem 1rem', borderRadius: '50px',
                                    fontWeight: '700', color: '#047857', display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                    <Clock size={16} color="#10B981" />
                                    E-Commerce Pharmacy
                                </div>
                            </div>
                            <div style={{ padding: '3rem' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem' }}>Lifeline Pharmacy</h3>
                                <p style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: '1.7', marginBottom: '2rem' }}>
                                    Order prescription medications, healthcare products, and wellness essentials online with fast delivery through our integrated e-commerce platform.
                                </p>
                                <ul style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#334155', fontWeight: '600' }}>
                                        <div style={{ padding: '0.4rem', backgroundColor: '#D1FAE5', borderRadius: '50%' }}>
                                            <Shield size={16} color="#059669" />
                                        </div>
                                        Verified Genuine Medications
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#334155', fontWeight: '600' }}>
                                        <div style={{ padding: '0.4rem', backgroundColor: '#D1FAE5', borderRadius: '50%' }}>
                                            <Clock size={16} color="#059669" />
                                        </div>
                                        Express Nationwide Delivery
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#334155', fontWeight: '600' }}>
                                        <div style={{ padding: '0.4rem', backgroundColor: '#D1FAE5', borderRadius: '50%' }}>
                                            <Activity size={16} color="#059669" />
                                        </div>
                                        Organized by Health Categories
                                    </li>
                                </ul>
                                <Link to="/shop" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                                    backgroundColor: '#059669', color: '#FFFFFF', padding: '1rem 2rem',
                                    borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', textDecoration: 'none',
                                    transition: 'background-color 0.2s', width: '100%', justifyContent: 'center'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#047857'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                                >
                                    Shop Medications
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer
                companyName="Lifeline Healthcare Global Options"
                registration="RC 1506925"
                address="Okewande Street, Budo Nuhu Village, Airport Area, Asa L.G.A., Kwara State, Nigeria"
                email="info@lifelinehealthcareglobal.com"
                phone="+234-XXX-XXX-XXXX"
                aboutText="A comprehensive healthcare institution providing both full Electronic Medical Record hospital facilities and a robust online pharmacy."
                quickLinks={[
                    { label: 'Home', url: '/' },
                    { label: 'Pharmacy Shop', url: '/shop' },
                    { label: 'Patient Login', url: '/login' }
                ]}
                ctaText="Medical Login"
                ctaLink="/login"
            />
        </div>
    );
};

export default Home;
