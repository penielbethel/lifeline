import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Activity, Beaker, Pill, Receipt, PlusCircle, CheckCircle, Clock } from 'lucide-react';

const API_URL = 'https://lifelineglobaloption.vercel.app/api';

const EMRDashboard = ({ user }) => {
    const [patients, setPatients] = useState([]);
    const [tests, setTests] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [histories, setHistories] = useState([]);

    const [activeTab, setActiveTab] = useState('patients'); // default
    const [isLoading, setIsLoading] = useState(false);

    // Forms states
    const [showNewPatientModal, setShowNewPatientModal] = useState(false);
    const [patientForm, setPatientForm] = useState({ name: '', age: '', gender: 'Male', bloodGroup: '', genotype: '', phone: '', address: '' });

    const [showTestModal, setShowTestModal] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [testForm, setTestForm] = useState({ testsRequested: '' });

    const [showProcessTestModal, setShowProcessTestModal] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [processTestForm, setProcessTestForm] = useState({ testPrices: 0, resultDescription: '', resultDocumentUrl: '' });

    const [showPrescribeModal, setShowPrescribeModal] = useState(false);
    const [prescribeForm, setPrescribeForm] = useState({ itemType: 'drug', name: '', dosage: '', duration: '' });

    const [showAdministerModal, setShowAdministerModal] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [administerForm, setAdministerForm] = useState({ treatmentCost: 0 });

    const [showBillModal, setShowBillModal] = useState(false);
    const [viewingPatient, setViewingPatient] = useState(null);

    const COMMON_TESTS = [
        "Full Blood Count", "Malaria Parasite", "Widal Test", "Urinalysis",
        "Random Blood Sugar", "Liver Function Test", "Kidney Function Test",
        "PCV", "HIV 1&2", "Hepatitis B & C", "Lipid Profile", "Pregnancy Test"
    ];

    const token = localStorage.getItem('renee_token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchPatients();
        fetchTests();
        fetchPrescriptions();
        fetchHistories();
    }, []);

    const fetchPatients = async () => {
        try { const res = await axios.get(`${API_URL}/patients`, config); setPatients(res.data); } catch (e) { console.error('Error fetching patients'); }
    };

    const fetchTests = async () => {
        try { const res = await axios.get(`${API_URL}/medical-tests`, config); setTests(res.data); } catch (e) { console.error('Error fetching tests'); }
    };

    const fetchPrescriptions = async () => {
        try { const res = await axios.get(`${API_URL}/prescriptions`, config); setPrescriptions(res.data); } catch (e) { console.error('Error fetching prescriptions'); }
    };

    const fetchHistories = async () => {
        try { const res = await axios.get(`${API_URL}/medical-history`, config); setHistories(res.data); } catch (e) { console.error('Error fetching histories'); }
    };

    const onboardPatient = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/patients`, patientForm, config);
            setShowNewPatientModal(false);
            setPatientForm({ name: '', age: '', gender: 'Male', bloodGroup: '', genotype: '', phone: '', address: '' });
            fetchPatients();
            alert('Patient registered');
        } catch (e) { alert('Failed to register patient'); }
    };

    const requestTests = async (e) => {
        e.preventDefault();
        try {
            const selectedTests = COMMON_TESTS.filter((_, i) => document.getElementById(`test-${i}`).checked);
            if (selectedTests.length === 0) return alert('Please select at least one test.');

            await axios.post(`${API_URL}/medical-tests`, {
                patientId: selectedPatientId,
                testsRequested: selectedTests
            }, config);
            setShowTestModal(false);
            fetchTests();
            alert('Tests requested successfully');
        } catch (e) { alert('Failed to request tests'); }
    };

    const handlePrint = (divId) => {
        const printContents = document.getElementById(divId).innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    const processTest = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${API_URL}/medical-tests/${selectedTest._id}/process`, {
                totalCost: Number(processTestForm.testPrices),
                resultDescription: processTestForm.resultDescription,
                resultDocumentUrl: processTestForm.resultDocumentUrl
            }, config);
            setShowProcessTestModal(false);
            fetchTests();
            alert('Test processed and posted to Doctor');
        } catch (e) { alert('Failed to process test'); }
    };

    const makePrescription = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/prescriptions`, {
                patientId: selectedTest.patientId._id,
                testId: selectedTest._id,
                prescriptions: [prescribeForm] // Just one for now in UI simplicity
            }, config);
            setShowPrescribeModal(false);
            fetchPrescriptions();
            alert('Prescription sent to Pharmacy/Nurse');
        } catch (e) { alert('Failed to prescribe'); }
    };

    const administerTreatment = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${API_URL}/prescriptions/${selectedPrescription._id}/administer`, {
                treatmentCost: Number(administerForm.treatmentCost)
            }, config);
            setShowAdministerModal(false);
            fetchPrescriptions();
            alert('Treatment administered successfully');

            // Generate Medical History Bill immediately for Nurse
            if (user.role === 'nurse') {
                await axios.post(`${API_URL}/medical-history`, {
                    patientId: selectedPrescription.patientId._id,
                    testId: selectedPrescription.testId?._id,
                    prescriptionId: selectedPrescription._id,
                    totalTestCost: selectedPrescription.testId ? selectedPrescription.testId.totalCost : 0,
                    totalTreatmentCost: Number(administerForm.treatmentCost)
                }, config);
                fetchHistories();
            }
        } catch (e) { alert('Failed to administer'); }
    };

    const canOnboard = ['hr', 'admin', 'superadmin'].includes(user.role);
    const canTest = ['doctor', 'nurse'].includes(user.role);
    const canProcessLab = ['lab_scientist', 'superadmin'].includes(user.role);
    const canPrescribe = ['doctor', 'superadmin'].includes(user.role);
    const canAdminister = ['pharmacist', 'nurse', 'superadmin'].includes(user.role);

    return (
        <div style={{ padding: '2rem', backgroundColor: '#F8FAFC', borderRadius: '16px', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', color: '#1E293B' }}>Medical Portal: {user.role.toUpperCase()}</h2>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                <button onClick={() => setActiveTab('patients')} className={`btn ${activeTab === 'patients' ? 'btn-primary' : 'btn-outline'}`}>
                    <Users size={18} /> Patients
                </button>
                <button onClick={() => setActiveTab('tests')} className={`btn ${activeTab === 'tests' ? 'btn-primary' : 'btn-outline'}`}>
                    <Beaker size={18} /> Lab Tests
                </button>
                <button onClick={() => setActiveTab('prescriptions')} className={`btn ${activeTab === 'prescriptions' ? 'btn-primary' : 'btn-outline'}`}>
                    <Pill size={18} /> Prescriptions
                </button>
                {(user.role === 'nurse' || user.role === 'superadmin') && (
                    <button onClick={() => setActiveTab('billing')} className={`btn ${activeTab === 'billing' ? 'btn-primary' : 'btn-outline'}`}>
                        <Receipt size={18} /> Medical History / Final Bills
                    </button>
                )}
            </div>

            {/* PATIENTS TAB */}
            {activeTab === 'patients' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Patient Roster</h3>
                        {canOnboard && (
                            <button onClick={() => setShowNewPatientModal(true)} style={{ padding: '0.5rem 1rem', background: '#2563EB', color: '#fff', borderRadius: '8px', display: 'flex', gap: '0.5rem' }}>
                                <PlusCircle size={18} /> Onboard Patient
                            </button>
                        )}
                    </div>
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', overflowX: 'auto' }}>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                                    <th style={{ padding: '1rem' }}>PT #</th>
                                    <th style={{ padding: '1rem' }}>Name</th>
                                    <th style={{ padding: '1rem' }}>Age / Gen</th>
                                    <th style={{ padding: '1rem' }}>Vitals</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map(p => (
                                    <tr key={p._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                        <td style={{ padding: '1rem', fontWeight: 'bold', color: '#1D4ED8' }}>{p.patientNumber}</td>
                                        <td style={{ padding: '1rem' }}>{p.name}</td>
                                        <td style={{ padding: '1rem' }}>{p.age}yrs / {p.gender}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ fontSize: '0.8rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>B: {p.bloodGroup || 'NA'}</span>
                                            <span style={{ fontSize: '0.8rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px' }}>G: {p.genotype || 'NA'}</span>
                                        </td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            {canTest && (
                                                <button onClick={() => { setSelectedPatientId(p._id); setShowTestModal(true); }} style={{ padding: '0.4rem 0.8rem', background: '#DBEAFE', color: '#1D4ED8', borderRadius: '6px', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>
                                                    Order Tests
                                                </button>
                                            )}
                                            <button onClick={() => setViewingPatient(p)} style={{ padding: '0.4rem 0.8rem', background: '#F1F5F9', color: '#475569', borderRadius: '6px', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>
                                                View Case
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {patients.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No patients enrolled yet.</td></tr>}
                            </tbody>
                        </table>
                    </div>

                    {viewingPatient && (
                        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                            <div id="printable-history" style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #2563EB', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <h2 style={{ color: '#2563EB', fontWeight: '800' }}>LIFELINE HEALTHCARE GLOBAL OPTIONS</h2>
                                        <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Professional Medical History & Clinical Report</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 'bold' }}>PATIENT ID: {viewingPatient.patientNumber}</p>
                                        <p style={{ fontSize: '0.9rem' }}>Date: {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                    <div>
                                        <p><strong>NAME:</strong> {viewingPatient.name}</p>
                                        <p><strong>AGE:</strong> {viewingPatient.age} years</p>
                                        <p><strong>GENDER:</strong> {viewingPatient.gender}</p>
                                    </div>
                                    <div>
                                        <p><strong>BLOOD GROUP:</strong> {viewingPatient.bloodGroup || 'Not Specified'}</p>
                                        <p><strong>GENOTYPE:</strong> {viewingPatient.genotype || 'Not Specified'}</p>
                                        <p><strong>CONTACT:</strong> {viewingPatient.phone}</p>
                                    </div>
                                </div>
                                <h4 style={{ background: '#F1F5F9', padding: '0.5rem', marginBottom: '1rem' }}>Clinical Record History</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {tests.filter(t => t.patientId?._id === viewingPatient._id).map(t => (
                                        <div key={t._id} style={{ borderLeft: '4px solid #2563EB', paddingLeft: '1rem' }}>
                                            <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>LAB INVESTIGATION - {new Date(t.createdAt).toLocaleDateString()}</p>
                                            <p style={{ fontSize: '0.85rem' }}>Tests ordered by Doctor: {t.doctorId?.username}</p>
                                            <p style={{ fontSize: '0.85rem', color: '#1E293B', fontStyle: 'italic' }}>Results: {t.resultDescription || 'Pending lab analysis'}</p>
                                        </div>
                                    ))}
                                    {prescriptions.filter(p => p.patientId?._id === viewingPatient._id).map(p => (
                                        <div key={p._id} style={{ borderLeft: '4px solid #059669', paddingLeft: '1rem' }}>
                                            <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>PRESCRIPTION & TREATMENT - {new Date(p.createdAt).toLocaleDateString()}</p>
                                            <p style={{ fontSize: '0.85rem' }}>Prescribed by Doctor: {p.doctorId?.username}</p>
                                            <p style={{ fontSize: '0.85rem', color: '#1E293B' }}>Items: {p.prescriptions.map(item => `${item.name} (${item.dosage})`).join(', ')}</p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', borderTop: '1px solid #E2E8F0', paddingTop: '2rem' }} className="no-print">
                                    <button onClick={() => handlePrint('printable-history')} style={{ padding: '0.8rem 1.5rem', background: '#2563EB', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Print Medical Report</button>
                                    <button onClick={() => setViewingPatient(null)} style={{ padding: '0.8rem 1.5rem', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Close View</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* TESTS TAB */}
            {activeTab === 'tests' && (
                <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Medical Lab Tests</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {tests.map(t => (
                            <div key={t._id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '4px', color: t.status === 'completed' ? '#059669' : '#D97706', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    {t.status === 'completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                                    {t.status.toUpperCase()}
                                </div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>PT: {t.patientId?.name || 'Unknown'}</h4>
                                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1rem' }}>Tests: {t.testsRequested.join(', ')}</p>

                                {t.status === 'completed' ? (
                                    <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                                        <p style={{ fontWeight: '600', fontSize: '0.85rem', color: '#64748B', marginBottom: '0.5rem' }}>Lab Results (Scientist: {t.labScientistId?.username}):</p>
                                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>{t.resultDescription}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid #E2E8F0', paddingTop: '0.5rem' }}>
                                            <span style={{ fontSize: '0.9rem', color: '#1D4ED8', fontWeight: 'bold' }}>Total Bill: ₦{t.totalCost.toLocaleString()}</span>
                                            {t.resultDocumentUrl && <a href={t.resultDocumentUrl} target="_blank" style={{ fontSize: '0.8rem', color: '#2563EB', textDecoration: 'underline' }}>View Attachment</a>}
                                        </div>
                                    </div>
                                ) : canProcessLab ? (
                                    <button onClick={() => { setSelectedTest(t); setShowProcessTestModal(true); }} style={{ width: '100%', padding: '0.75rem', border: 'none', background: '#059669', color: '#fff', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem', cursor: 'pointer' }}>
                                        Input Results & Price
                                    </button>
                                ) : (
                                    <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#94A3B8', fontStyle: 'italic' }}>Pending scientist analysis</div>
                                )}

                                {t.status === 'completed' && canPrescribe && (
                                    <button onClick={() => { setSelectedTest(t); setShowPrescribeModal(true); }} style={{ width: '100%', padding: '0.75rem', border: 'none', background: '#2563EB', color: '#fff', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem', cursor: 'pointer' }}>
                                        Vet Result & Prescribe
                                    </button>
                                )}
                            </div>
                        ))}
                        {tests.length === 0 && <p>No lab tests in record.</p>}
                    </div>
                </div>
            )}

            {/* PRESCRIPTIONS TAB */}
            {activeTab === 'prescriptions' && (
                <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Treatment & Prescriptions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {prescriptions.map(p => (
                            <div key={p._id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '4px', color: p.status === 'administered' ? '#059669' : '#D97706', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    {p.status === 'administered' ? <CheckCircle size={16} /> : <Clock size={16} />}
                                    {p.status.toUpperCase()}
                                </div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>PT: {p.patientId?.name}</h4>
                                <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                                    {p.prescriptions.map((px, i) => (
                                        <div key={i} style={{ marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem', color: '#1D4ED8' }}>[{px.itemType}]</span> {px.name}
                                            <p style={{ fontSize: '0.85rem', color: '#475569' }}>Dose: {px.dosage} | Duration: {px.duration}</p>
                                        </div>
                                    ))}
                                </div>

                                {p.status === 'administered' ? (
                                    <p style={{ marginTop: '1rem', color: '#059669', fontWeight: 'bold', fontSize: '0.9rem' }}>Administered. Treatment Cost: ₦{p.treatmentCost}</p>
                                ) : canAdminister ? (
                                    <button onClick={() => { setSelectedPrescription(p); setShowAdministerModal(true); }} style={{ width: '100%', padding: '0.75rem', background: '#059669', color: '#fff', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
                                        Administer & Bill
                                    </button>
                                ) : null}
                            </div>
                        ))}
                        {prescriptions.length === 0 && <p>No prescriptions found.</p>}
                    </div>
                </div>
            )}

            {/* BILLING / HISTORY TAB */}
            {activeTab === 'billing' && (
                <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Patient Final Medical History & Bills</h3>
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', overflowX: 'auto' }}>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                                    <th style={{ padding: '1rem' }}>Date</th>
                                    <th style={{ padding: '1rem' }}>Patient Name</th>
                                    <th style={{ padding: '1rem' }}>Test Bill</th>
                                    <th style={{ padding: '1rem' }}>Treatment Bill</th>
                                    <th style={{ padding: '1rem', color: '#1D4ED8' }}>Grand Total</th>
                                    <th style={{ padding: '1rem' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {histories.map(h => (
                                    <tr key={h._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                        <td style={{ padding: '1rem' }}>{new Date(h.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{h.patientId?.name}</td>
                                        <td style={{ padding: '1rem' }}>₦{h.totalTestCost.toLocaleString()}</td>
                                        <td style={{ padding: '1rem' }}>₦{h.totalTreatmentCost.toLocaleString()}</td>
                                        <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '1.1rem', color: '#10B981' }}>₦{h.grandTotal.toLocaleString()}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <button onClick={() => {
                                                const win = window.open('', '_blank');
                                                win.document.write(`
                                                    <div style="font-family: Arial, sans-serif; padding: 40px; border: 2px solid #2563EB; max-width: 600px; margin: auto;">
                                                        <h1 style="color: #2563EB; text-align: center;">LIFELINE HEALTHCARE GLOBAL OPTIONS</h1>
                                                        <h3 style="text-align: center; border-bottom: 1px solid #eee; padding-bottom: 10px;">OFFICIAL MEDICAL INVOICE</h3>
                                                        <p><strong>Invoice Date:</strong> ${new Date(h.createdAt).toLocaleDateString()}</p>
                                                        <p><strong>Patient:</strong> ${h.patientId?.name} (${h.patientId?.patientNumber})</p>
                                                        <div style="margin: 20px 0; border-top: 2px solid #eee; padding-top: 10px;">
                                                            <div style="display: flex; justify-content: space-between;"><p>Lab Investigation Costs:</p><p>₦${h.totalTestCost.toLocaleString()}</p></div>
                                                            <div style="display: flex; justify-content: space-between;"><p>Clinical Treatment Costs:</p><p>₦${h.totalTreatmentCost.toLocaleString()}</p></div>
                                                            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem; margin-top: 10px; border-top: 2px solid #2563EB;"><p>GRAND TOTAL:</p><p>₦${h.grandTotal.toLocaleString()}</p></div>
                                                        </div>
                                                        <p style="font-size: 0.8rem; text-align: center; color: #666; margin-top: 40px;">Certified Digital Bill | Generated by ${h.recordedBy?.username}</p>
                                                    </div>
                                                `);
                                                win.print();
                                            }} style={{ padding: '0.4rem 0.8rem', background: '#F1F5F9', color: '#1D4ED8', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                                                Print Invoice
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {histories.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No billing histories yet.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


            {/* MODALS */}
            {showNewPatientModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '500px' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Onboard Patient</h3>
                        <form onSubmit={onboardPatient} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input required placeholder="Full Name" value={patientForm.name} onChange={e => setPatientForm({ ...patientForm, name: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px' }} />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input required placeholder="Age" type="number" value={patientForm.age} onChange={e => setPatientForm({ ...patientForm, age: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }} />
                                <select value={patientForm.gender} onChange={e => setPatientForm({ ...patientForm, gender: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }}>
                                    <option>Male</option><option>Female</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <select value={patientForm.bloodGroup} onChange={e => setPatientForm({ ...patientForm, bloodGroup: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }}>
                                    <option value="">Blood Group</option>
                                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                                </select>
                                <select value={patientForm.genotype} onChange={e => setPatientForm({ ...patientForm, genotype: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }}>
                                    <option value="">Genotype</option>
                                    <option>AA</option><option>AS</option><option>SS</option><option>AC</option>
                                </select>
                            </div>
                            <input placeholder="Phone" value={patientForm.phone} onChange={e => setPatientForm({ ...patientForm, phone: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px' }} />
                            <textarea placeholder="Residential Address" value={patientForm.address} onChange={e => setPatientForm({ ...patientForm, address: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', minHeight: '60px' }} />
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowNewPatientModal(false)} style={{ padding: '0.8rem 1.5rem', background: '#E2E8F0', borderRadius: '8px' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.8rem 1.5rem', background: '#2563EB', color: '#fff', borderRadius: '8px' }}>Register Patient</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showTestModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', width: '90%', maxWidth: '600px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1E293B' }}>Select Lab Investigations</h3>
                            <button onClick={() => setShowTestModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94A3B8' }}>×</button>
                        </div>
                        <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>Please select tests to be performed by the Medical Laboratory Scientist.</p>
                        <form onSubmit={requestTests}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                {COMMON_TESTS.map((test, i) => (
                                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.8rem', background: '#F8FAFC', borderRadius: '8px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                                        <input type="checkbox" id={`test-${i}`} style={{ width: '18px', height: '18px' }} />
                                        <span style={{ fontSize: '0.9rem', color: '#334155' }}>{test}</span>
                                    </label>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button type="button" onClick={() => setShowTestModal(false)} style={{ padding: '0.8rem 1.5rem', background: '#F1F5F9', border: 'none', color: '#475569', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.8rem 1.5rem', background: '#2563EB', border: 'none', color: '#fff', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)' }}>Order Investigations</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showProcessTestModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Process Lab Result</h3>
                        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Requested Tests: {selectedTest?.testsRequested.join(', ')}</p>
                        <form onSubmit={processTest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <label>Total Test Price (₦)</label>
                            <input required type="number" min="0" placeholder="Total Cost" value={processTestForm.testPrices} onChange={e => setProcessTestForm({ ...processTestForm, testPrices: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px' }} />
                            <label>Result Description / Findings</label>
                            <textarea required placeholder="Type out the medical result here..." value={processTestForm.resultDescription} onChange={e => setProcessTestForm({ ...processTestForm, resultDescription: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', minHeight: '150px' }} />
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowProcessTestModal(false)} style={{ padding: '0.8rem 1.5rem', background: '#E2E8F0', borderRadius: '8px' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.8rem 1.5rem', background: '#059669', color: '#fff', borderRadius: '8px' }}>Upload & Post Back to Doctor</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showPrescribeModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '500px' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Write Prescription</h3>
                        <div style={{ background: '#F1F5F9', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                            <p style={{ fontWeight: 'bold' }}>Lab Findings:</p>
                            <p>{selectedTest?.resultDescription}</p>
                        </div>
                        <form onSubmit={makePrescription} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <select value={prescribeForm.itemType} onChange={e => setPrescribeForm({ ...prescribeForm, itemType: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px' }}>
                                <option value="drug">Drug</option><option value="injection">Injection</option><option value="infusion">Infusion</option>
                            </select>
                            <input required placeholder="Medication Name" value={prescribeForm.name} onChange={e => setPrescribeForm({ ...prescribeForm, name: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px' }} />
                            <input required placeholder="Dosage (e.g. 2 tabs twice daily)" value={prescribeForm.dosage} onChange={e => setPrescribeForm({ ...prescribeForm, dosage: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px' }} />
                            <input required placeholder="Duration (e.g. 5 days)" value={prescribeForm.duration} onChange={e => setPrescribeForm({ ...prescribeForm, duration: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px' }} />

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowPrescribeModal(false)} style={{ padding: '0.8rem 1.5rem', background: '#E2E8F0', borderRadius: '8px' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.8rem 1.5rem', background: '#2563EB', color: '#fff', borderRadius: '8px' }}>Send to Nurse/Pharmacy</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showAdministerModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '500px' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Administer Treatment</h3>
                        <form onSubmit={administerTreatment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <label>Treatment / Drug Cost (₦)</label>
                            <input required type="number" min="0" placeholder="Treatment Cost" value={administerForm.treatmentCost} onChange={e => setAdministerForm({ ...administerForm, treatmentCost: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px' }} />
                            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>By confirming, you verify this prescription has been fully administered to the patient. {(user.role === 'nurse') && 'A final medical bill will be generated automatically.'}</p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowAdministerModal(false)} style={{ padding: '0.8rem 1.5rem', background: '#E2E8F0', borderRadius: '8px' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.8rem 1.5rem', background: '#059669', color: '#fff', borderRadius: '8px' }}>Confirm Administered & Generate Bill</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EMRDashboard;
