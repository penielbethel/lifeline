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
            await axios.post(`${API_URL}/medical-tests`, {
                patientId: selectedPatientId,
                testsRequested: testForm.testsRequested.split(',').map(t => t.trim())
            }, config);
            setShowTestModal(false);
            fetchTests();
            alert('Tests requested successfully');
        } catch (e) { alert('Failed to request tests'); }
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
                                    <th style={{ padding: '1rem' }}>Phone</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map(p => (
                                    <tr key={p._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{p.patientNumber}</td>
                                        <td style={{ padding: '1rem' }}>{p.name}</td>
                                        <td style={{ padding: '1rem' }}>{p.age} / {p.gender}</td>
                                        <td style={{ padding: '1rem' }}>{p.phone}</td>
                                        <td style={{ padding: '1rem' }}>
                                            {canTest && (
                                                <button onClick={() => { setSelectedPatientId(p._id); setShowTestModal(true); }} style={{ padding: '0.4rem 0.8rem', background: '#DBEAFE', color: '#1D4ED8', borderRadius: '6px', fontSize: '0.9rem' }}>
                                                    Order Tests
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {patients.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No patients enrolled yet.</td></tr>}
                            </tbody>
                        </table>
                    </div>
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
                                        <p style={{ fontWeight: '600' }}>Lab Result:</p>
                                        <p style={{ fontSize: '0.9rem', color: '#475569' }}>{t.resultDescription}</p>
                                        <p style={{ fontSize: '0.9rem', color: '#1D4ED8', fontWeight: 'bold', marginTop: '0.5rem' }}>Test Bill: ₦{t.totalCost}</p>
                                    </div>
                                ) : canProcessLab ? (
                                    <button onClick={() => { setSelectedTest(t); setShowProcessTestModal(true); }} style={{ width: '100%', padding: '0.75rem', background: '#059669', color: '#fff', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
                                        Input Results & Price
                                    </button>
                                ) : (
                                    <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#94A3B8', fontStyle: 'italic' }}>Pending lab scientist review</div>
                                )}

                                {t.status === 'completed' && canPrescribe && (
                                    <button onClick={() => { setSelectedTest(t); setShowPrescribeModal(true); }} style={{ width: '100%', padding: '0.75rem', background: '#2563EB', color: '#fff', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
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
                                    <th style={{ padding: '1rem' }}>Test Cost</th>
                                    <th style={{ padding: '1rem' }}>Treatment Cost</th>
                                    <th style={{ padding: '1rem', color: '#1D4ED8' }}>Grand Total</th>
                                    <th style={{ padding: '1rem' }}>Nurse Ref</th>
                                </tr>
                            </thead>
                            <tbody>
                                {histories.map(h => (
                                    <tr key={h._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                        <td style={{ padding: '1rem' }}>{new Date(h.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{h.patientId?.name}</td>
                                        <td style={{ padding: '1rem' }}>₦{h.totalTestCost}</td>
                                        <td style={{ padding: '1rem' }}>₦{h.totalTreatmentCost}</td>
                                        <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '1.1rem', color: '#0F172A' }}>₦{h.grandTotal}</td>
                                        <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#64748B' }}>{h.recordedBy?.username}</td>
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
                            <input placeholder="Phone" value={patientForm.phone} onChange={e => setPatientForm({ ...patientForm, phone: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px' }} />
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowNewPatientModal(false)} style={{ padding: '0.8rem 1.5rem', background: '#E2E8F0', borderRadius: '8px' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.8rem 1.5rem', background: '#2563EB', color: '#fff', borderRadius: '8px' }}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showTestModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '500px' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Order Lab Tests</h3>
                        <form onSubmit={requestTests} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <textarea required placeholder="Enter tests (comma separated e.g. Malaria Parasite, Widal Test, Full Blood Count)" value={testForm.testsRequested} onChange={e => setTestForm({ ...testForm, testsRequested: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', minHeight: '120px' }} />

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowTestModal(false)} style={{ padding: '0.8rem 1.5rem', background: '#E2E8F0', borderRadius: '8px' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.8rem 1.5rem', background: '#2563EB', color: '#fff', borderRadius: '8px' }}>Send to Lab</button>
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
