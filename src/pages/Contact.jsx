import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    Send, MapPin, Mail, Phone, Clock, ChevronDown, CheckCircle,
    Building2, Pill, Activity, Users, MessageSquare, User, AtSign, Microscope, Shield
} from 'lucide-react';

const ENTITIES = [
    {
        id: 'lifeline-parent',
        name: 'Lifeline Healthcare Global Options',
        shortName: 'Holding Group',
        description: 'Global healthcare administration & infrastructure management',
        icon: Building2,
        color: '#2563EB',
        email: 'admin@lifelinehealthcareglobal.com',
        phone: '+234-XXX-XXX-XXXX',
        address: 'No. 12, Lifeline Avenue, Global Healthcare City, Kwara State, Nigeria',
        registration: 'RC 1506925'
    },
    {
        id: 'lifeline-hospital',
        name: 'Lifeline Hospital (EMR Facility)',
        shortName: 'Lifeline Hospital',
        description: 'Fully digitized clinical care & specialist consultations',
        icon: Activity,
        color: '#EF4444',
        email: 'clinical@lifelinehealthcareglobal.com',
        phone: '+234-XXX-XXX-XXXX',
        address: 'Budo Nuhu Village, Airport Area, Kwara State, Nigeria',
        registration: 'Full EMR Licensed'
    },
    {
        id: 'lifeline-pharmacy',
        name: 'Lifeline Pharmacy Division',
        shortName: 'Lifeline Pharmacy',
        description: 'E-commerce medications & wellness logistics',
        icon: Pill,
        color: '#059669',
        email: 'pharmacy@lifelinehealthcareglobal.com',
        phone: '+234-XXX-XXX-XXXX',
        address: 'Ojota, Lagos State, Nigeria (Logistics Hub)',
        registration: 'NAFDAC Certified'
    },
    {
        id: 'lifeline-lab',
        name: 'Lifeline Diagnostic Center',
        shortName: 'Diagnostic Center',
        description: 'Automated clinical tests & laboratory audits',
        icon: Microscope,
        color: '#7C3AED',
        email: 'lab@lifelinehealthcareglobal.com',
        phone: '+234-XXX-XXX-XXXX',
        address: 'Budo Nuhu Village, Airport Area, Kwara State, Nigeria',
        registration: 'Lagos/Kwara Accredited'
    }
];

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        entityId: '',
        subject: '',
        message: ''
    });
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [formStatus, setFormStatus] = useState(null); // null, 'sending', 'success', 'error'
    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        document.title = "Contact Us | Lifeline Healthcare Global Options";
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleEntitySelect = (entity) => {
        setSelectedEntity(entity);
        setFormData(prev => ({ ...prev, entityId: entity.id }));
        setShowDropdown(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedEntity) {
            alert('Please select the healthcare entity/department to contact.');
            return;
        }
        setFormStatus('sending');
        setTimeout(() => {
            setFormStatus('success');
            console.log('Healthcare Contact Submitted:', { ...formData, to: selectedEntity.email });
        }, 1500);
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', entityId: '', subject: '', message: '' });
        setSelectedEntity(null);
        setFormStatus(null);
    };

    const inputStyle = (field) => ({
        width: '100%',
        padding: '0.95rem 1rem 0.95rem 3rem',
        borderRadius: '12px',
        border: `2px solid ${focusedField === field ? '#2563EB' : '#E2E8F0'}`,
        fontSize: '0.95rem',
        color: '#1E293B',
        backgroundColor: '#FFFFFF',
        outline: 'none',
        transition: 'all 0.3s ease',
        boxShadow: focusedField === field ? '0 0 0 4px rgba(37,99,235,0.08)' : 'none'
    });

    return (
        <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A', color: '#fff', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '8rem 2rem 4rem', maxWidth: '800px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '50px', padding: '0.5rem 1.5rem', marginBottom: '1.5rem', color: '#60A5FA', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '2px' }}>
                        <MessageSquare size={16} /> SUPPORT CENTER
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', color: '#FFFFFF', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        How can we <span style={{ color: '#2563EB' }}>Help You</span> today?
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#94A3B8', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
                        Connect with our hospital administration, clinical lab, or pharmacy hub for swift assistance.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section style={{ padding: '4rem 0 8rem', marginTop: '-4rem', position: 'relative', zIndex: 5 }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '2.5rem' }}>
                    {/* Left Panel */}
                    <div>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#64748B', marginBottom: '1.25rem', letterSpacing: '2px' }}>OUR DIVISIONS</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {ENTITIES.map((entity) => (
                                <div key={entity.id} onClick={() => handleEntitySelect(entity)} style={{
                                    padding: '1.5rem', borderRadius: '20px', backgroundColor: selectedEntity?.id === entity.id ? '#1E293B' : '#FFF', border: `2px solid ${selectedEntity?.id === entity.id ? entity.color : '#E2E8F0'}`, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: `${entity.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <entity.icon size={20} color={entity.color} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: selectedEntity?.id === entity.id ? '#FFF' : '#1E293B', margin: '0 0 0.25rem' }}>{entity.shortName}</h4>
                                            <p style={{ fontSize: '0.8rem', color: selectedEntity?.id === entity.id ? '#94A3B8' : '#64748B', margin: 0 }}>{entity.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '3rem', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)' }}>
                        {formStatus === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                                <CheckCircle size={80} color="#10B981" style={{ margin: '0 auto 2rem' }} />
                                <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#1E293B', marginBottom: '1rem' }}>Message Received</h3>
                                <p style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Your inquiry has been routed to the <strong>{selectedEntity?.shortName}</strong> clinical team.</p>
                                <button onClick={resetForm} style={{ padding: '1rem 3rem', borderRadius: '12px', border: '2px solid #2563EB', color: '#2563EB', fontWeight: '800', cursor: 'pointer', backgroundColor: '#FFF' }}>Send New Inquiry</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '2.5rem' }}>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1E293B', marginBottom: '0.5rem' }}>Inquiry Form</h2>
                                    <p style={{ color: '#64748B', margin: 0 }}>Please select a department and fill in your clinical or pharmaceutical inquiry.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.9rem' }}>Full Name</label>
                                        <div style={{ position: 'relative' }}>
                                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                            <input required style={inputStyle('name')} placeholder="Your Name" value={formData.name} onChange={e => handleChange('name', e.target.value)} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.9rem' }}>Email Port</label>
                                        <div style={{ position: 'relative' }}>
                                            <AtSign size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                            <input required type="email" style={inputStyle('email')} placeholder="Email Address" value={formData.email} onChange={e => handleChange('email', e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.9rem' }}>Message Content</label>
                                    <textarea required rows="6" style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: `2px solid ${focusedField === 'message' ? '#2563EB' : '#E2E8F0'}`, outline: 'none', transition: 'all 0.3s ease', fontSize: '1rem', color: '#1E293B' }} placeholder="Detail your medical inquiry or pharmacy request here..." value={formData.message} onChange={e => handleChange('message', e.target.value)} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} />
                                </div>

                                <button type="submit" disabled={formStatus === 'sending'} style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: 'none', background: '#2563EB', color: '#FFF', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', boxShadow: '0 10px 25px -5px rgba(37,99,235,0.4)' }}>
                                    {formStatus === 'sending' ? 'Transmitting...' : <><Send size={20} /> Transmit Message</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer
                companyName="Lifeline Healthcare Global Options"
                registration="RC 1506925"
                address="Okewande Street, Budo Nuhu Village, Airport Area, Kwara State, Nigeria"
                email="support@lifelinehealthcareglobal.com"
                phone="+234-XXX-XXX-XXXX"
                aboutText="Lifeline Healthcare Global Options is an enterprise-grade medical facility providing comprehensive hospital care and pharmacy solutions."
                quickLinks={[
                    { label: 'Home', url: '/' },
                    { label: 'Portal', url: '/login' },
                    { label: 'Pharmacy', url: '/shop' }
                ]}
                ctaText="Patient Hub"
                ctaLink="/login"
            />
        </div>
    );
};

export default Contact;
