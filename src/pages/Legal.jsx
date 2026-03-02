import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Lock, FileText, Scale } from 'lucide-react';

const Legal = () => {
    useEffect(() => {
        document.title = "Legal & Privacy | Lifeline Healthcare Global Options";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: '#F8FAFC' }}>
            <Navbar />

            <section style={{ padding: '10rem 0 6rem' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ display: 'inline-flex', padding: '0.5rem 1.5rem', backgroundColor: '#EFF6FF', borderRadius: '50px', color: '#2563EB', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1.5rem' }}>
                            <Scale size={16} /> REGULATORY COMPLIANCE
                        </div>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#1E293B', marginBottom: '1.5rem' }}>Health Policies & Privacy</h1>
                        <p style={{ color: '#64748B', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                            At Lifeline Healthcare, patient confidentiality and professional transparency are at the core of our digital clinical operations.
                        </p>
                    </div>

                    {/* Policy Blocks */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                        {/* Clinical Privacy */}
                        <div style={{ backgroundColor: '#FFF', padding: '3rem', borderRadius: '32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div style={{ backgroundColor: '#EEF2FF', padding: '1rem', borderRadius: '16px', color: '#2563EB' }}>
                                    <Lock size={32} />
                                </div>
                                <div>
                                    <h2 id="privacy" style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1E293B', margin: '0 0 0.5rem' }}>EMR Privacy & Data Protection</h2>
                                    <p style={{ color: '#64748B', lineHeight: '1.7' }}>
                                        Our Electronic Medical Record (EMR) system is built on an encrypted architecture. We handle every patient record with strict adherence to Nigeria's Data Protection Regulation (NDPR) and international healthcare standards.
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', paddingLeft: '4.5rem' }}>
                                <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', borderRadius: '16px', fontSize: '0.9rem', color: '#475569' }}>
                                    <strong>Access Control:</strong> Only authorized medical staff (Doctor/Nurse/Lab) can view your clinical history based on their role.
                                </div>
                                <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', borderRadius: '16px', fontSize: '0.9rem', color: '#475569' }}>
                                    <strong>Data Encryption:</strong> All patient vitals, lab results, and prescriptions are encrypted in transit and at rest.
                                </div>
                            </div>
                        </div>

                        {/* Pharmacy Compliance */}
                        <div style={{ backgroundColor: '#FFF', padding: '3rem', borderRadius: '32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div style={{ backgroundColor: '#ECFDF5', padding: '1rem', borderRadius: '16px', color: '#059669' }}>
                                    <Shield size={32} />
                                </div>
                                <div>
                                    <h2 id="pharmacy" style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1E293B', margin: '0 0 0.5rem' }}>Pharmaceutical Ethics</h2>
                                    <p style={{ color: '#64748B', lineHeight: '1.7' }}>
                                        We are licensed to distribute only authentic medications. All drugs are NAFDAC-certified and sourced directly from reputable healthcare manufacturers.
                                    </p>
                                </div>
                            </div>
                            <ul style={{ paddingLeft: '6rem', color: '#475569', lineHeight: '2' }}>
                                <li><strong>Rx Verification:</strong> Prescription-only drugs require valid vetting before the clinical bill is processed.</li>
                                <li><strong>Storage Standards:</strong> Medications are kept under WHO-approved temperature conditions.</li>
                                <li><strong>Returns:</strong> Due to health safety, drugs once sold are not returnable unless there is a manufacturer defect.</li>
                            </ul>
                        </div>

                        {/* Terms of Service */}
                        <div style={{ backgroundColor: '#FFF', padding: '3rem', borderRadius: '32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div style={{ backgroundColor: '#F1F5F9', padding: '1rem', borderRadius: '16px', color: '#475569' }}>
                                    <FileText size={32} />
                                </div>
                                <div>
                                    <h2 id="terms" style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1E293B', margin: '0 0 0.5rem' }}>Clinical Terms of Service</h2>
                                    <p style={{ color: '#475569', lineHeight: '1.7' }}>
                                        By using our facility or the EMR portal, you agree to provide truthful clinical information for accurate diagnosis. Lifeline Healthcare is not liable for outcomes resulting from non-disclosure of past medical history.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Note */}
                    <div style={{ marginTop: '5rem', padding: '4rem', backgroundColor: '#F1F5F9', borderRadius: '32px', textAlign: 'center' }}>
                        <p style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                            For clinical inquiries or to exercise your data rights, contact our ethics committee:
                        </p>
                        <a href="mailto:ethics@lifelinehealthcareglobal.com" style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1E293B', textDecoration: 'none' }}>
                            ethics@lifelinehealthcareglobal.com
                        </a>
                    </div>
                </div>
            </section>

            <Footer
                companyName="Lifeline Healthcare Global Options"
                registration="RC 1506925"
                address="Okewande Street, Budo Nuhu Village, Airport Area, Kwara State, Nigeria"
                email="compliance@lifelinehealthcareglobal.com"
                phone="+234-XXX-XXX-XXXX"
                aboutText="Lifeline Healthcare Global Options is an enterprise-grade medical facility providing comprehensive EMR services."
                quickLinks={[
                    { label: 'Home', url: '/' },
                    { label: 'Privacy', url: '/privacy' },
                    { label: 'Terms', url: '/terms' }
                ]}
                ctaText="Return to Portal"
                ctaLink="/login"
            />
        </div>
    );
};

export default Legal;
