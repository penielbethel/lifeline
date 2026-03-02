import express from 'express';
import { Patient, Vitals, Consultation, MedicalTest, Prescription, MedicalHistory } from './emrModels.js';

const router = express.Router();

// ─── Role guard helper ───────────────────────────────────────────────────────
const allow = (...roles) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const superAllowed = req.user.role === 'superadmin';
    if (!superAllowed && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: `Forbidden. Required role: ${roles.join(' or ')}` });
    }
    next();
};

// ══════════════════════════════════════════════════════════════════
//  PATIENT MANAGEMENT   (HR/Admin, SuperAdmin)
// ══════════════════════════════════════════════════════════════════

// Register new patient
router.post('/patients', allow('hr', 'admin'), async (req, res) => {
    try {
        const patientNumber = 'PT-' + Date.now().toString().slice(-6);
        const patient = new Patient({
            patientNumber,
            registeredBy: req.user.id,
            ...req.body
        });
        await patient.save();
        res.status(201).json({ message: 'Patient registered successfully', patient });
    } catch (e) {
        if (e.code === 11000) return res.status(400).json({ message: 'Patient record already exists.' });
        res.status(500).json({ message: 'Server error', error: e.message });
    }
});

// Get all patients
router.get('/patients', async (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const patients = await Patient.find()
            .populate('registeredBy', 'fullName username role')
            .sort({ createdAt: -1 });
        res.json(patients);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single patient
router.get('/patients/:id', async (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const patient = await Patient.findById(req.params.id).populate('registeredBy', 'fullName');
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update patient status/info (HR only)
router.patch('/patients/:id', allow('hr', 'admin'), async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Patient updated', patient });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ══════════════════════════════════════════════════════════════════
//  VITALS / TRIAGE   (Nurse)
// ══════════════════════════════════════════════════════════════════

// Record vitals
router.post('/vitals', allow('nurse'), async (req, res) => {
    try {
        const vitals = new Vitals({
            nurseId: req.user.id,
            ...req.body
        });
        await vitals.save();
        res.status(201).json({ message: 'Vitals recorded successfully', vitals });
    } catch (e) {
        res.status(500).json({ message: 'Server error', error: e.message });
    }
});

// Get vitals for a patient
router.get('/vitals/:patientId', async (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const vitals = await Vitals.find({ patientId: req.params.patientId })
            .populate('nurseId', 'fullName')
            .sort({ createdAt: -1 });
        res.json(vitals);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ══════════════════════════════════════════════════════════════════
//  CONSULTATION   (Doctor)
// ══════════════════════════════════════════════════════════════════

// Create consultation
router.post('/consultations', allow('doctor'), async (req, res) => {
    try {
        const consultation = new Consultation({
            doctorId: req.user.id,
            ...req.body
        });
        await consultation.save();
        res.status(201).json({ message: 'Consultation recorded', consultation });
    } catch (e) {
        res.status(500).json({ message: 'Server error', error: e.message });
    }
});

// Get consultations (Doctor sees their own, others see all)
router.get('/consultations', async (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const filter = req.user.role === 'doctor' ? { doctorId: req.user.id } : {};
        const consultations = await Consultation.find(filter)
            .populate('patientId', 'name patientNumber bloodGroup genotype age gender')
            .populate('doctorId', 'fullName')
            .populate('vitalsId')
            .sort({ createdAt: -1 });
        res.json(consultations);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Close/complete a consultation
router.patch('/consultations/:id/complete', allow('doctor'), async (req, res) => {
    try {
        const consultation = await Consultation.findByIdAndUpdate(
            req.params.id,
            { status: 'completed', ...req.body },
            { new: true }
        );
        res.json({ message: 'Consultation completed', consultation });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ══════════════════════════════════════════════════════════════════
//  MEDICAL TESTS   (Doctor/Nurse → Lab Scientist)
// ══════════════════════════════════════════════════════════════════

// Order tests
router.post('/medical-tests', allow('doctor', 'nurse'), async (req, res) => {
    try {
        const test = new MedicalTest({
            doctorId: req.user.id,
            ...req.body
        });
        await test.save();
        res.status(201).json({ message: 'Tests ordered successfully', test });
    } catch (e) {
        res.status(500).json({ message: 'Server error', error: e.message });
    }
});

// Get tests
router.get('/medical-tests', async (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
        let filter = {};
        if (req.user.role === 'doctor') filter = { doctorId: req.user.id };

        const tests = await MedicalTest.find(filter)
            .populate('patientId', 'name patientNumber age gender bloodGroup')
            .populate('doctorId', 'fullName')
            .populate('labScientistId', 'fullName')
            .sort({ createdAt: -1 });
        res.json(tests);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Lab Scientist processes a test
router.patch('/medical-tests/:id/process', allow('lab_scientist'), async (req, res) => {
    try {
        const { testPrices, totalCost, resultDescription, resultDocumentUrl } = req.body;
        const test = await MedicalTest.findById(req.params.id);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        test.labScientistId = req.user.id;
        if (testPrices) test.testPrices = testPrices;
        if (totalCost !== undefined) test.totalCost = totalCost;
        if (resultDescription) { test.resultDescription = resultDescription; }
        if (resultDocumentUrl) { test.resultDocumentUrl = resultDocumentUrl; }

        test.status = (resultDescription || resultDocumentUrl) ? 'completed' : 'processing';
        if (test.status === 'completed') test.completedAt = new Date();

        await test.save();
        res.json({ message: 'Test result updated', test });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ══════════════════════════════════════════════════════════════════
//  PRESCRIPTIONS   (Doctor → Nurse/Pharmacist)
// ══════════════════════════════════════════════════════════════════

// Issue prescription
router.post('/prescriptions', allow('doctor'), async (req, res) => {
    try {
        // Auto-compute totalDrugCost from individual costs
        const drugs = req.body.prescriptions || [];
        const totalDrugCost = drugs.reduce((sum, d) => sum + ((d.cost || 0) * (d.quantity || 1)), 0);

        const prescription = new Prescription({
            doctorId: req.user.id,
            totalDrugCost,
            ...req.body
        });
        await prescription.save();
        res.status(201).json({ message: 'Prescription issued', prescription });
    } catch (e) {
        res.status(500).json({ message: 'Server error', error: e.message });
    }
});

// Get prescriptions
router.get('/prescriptions', async (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const prescriptions = await Prescription.find()
            .populate('patientId', 'name patientNumber age gender bloodGroup allergies')
            .populate('doctorId', 'fullName')
            .populate('consultationId')
            .populate('dispensedBy', 'fullName')
            .populate('administeredBy', 'fullName')
            .sort({ createdAt: -1 });
        res.json(prescriptions);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Pharmacist dispenses drugs
router.patch('/prescriptions/:id/dispense', allow('pharmacist'), async (req, res) => {
    try {
        const pres = await Prescription.findById(req.params.id);
        if (!pres) return res.status(404).json({ message: 'Prescription not found' });
        pres.status = 'dispensed';
        pres.dispensedBy = req.user.id;
        await pres.save();
        res.json({ message: 'Drugs dispensed', pres });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Nurse administers treatment
router.patch('/prescriptions/:id/administer', allow('nurse'), async (req, res) => {
    try {
        const { treatmentCost, notes } = req.body;
        const pres = await Prescription.findById(req.params.id);
        if (!pres) return res.status(404).json({ message: 'Prescription not found' });

        pres.administeredBy = req.user.id;
        pres.treatmentCost = treatmentCost || 0;
        pres.administeredAt = new Date();
        if (notes) pres.notes = notes;
        await pres.save();
        res.json({ message: 'Treatment administered', pres });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ══════════════════════════════════════════════════════════════════
//  MEDICAL HISTORY / BILLING   (Nurse compiles the invoice)
// ══════════════════════════════════════════════════════════════════

// Create invoice/history
router.post('/medical-history', allow('nurse'), async (req, res) => {
    try {
        const { consultationFee = 0, totalTestCost = 0, totalTreatmentCost = 0, admissionCost = 0, otherCosts = [] } = req.body;
        const otherTotal = otherCosts.reduce((s, c) => s + (c.amount || 0), 0);
        const grandTotal = consultationFee + totalTestCost + totalTreatmentCost + admissionCost + otherTotal;

        const history = new MedicalHistory({
            ...req.body,
            grandTotal,
            recordedBy: req.user.id
        });
        await history.save();
        res.status(201).json({ message: 'Medical history & invoice created', history });
    } catch (e) {
        if (e.code === 11000) return res.status(400).json({ message: 'Invoice already exists for this record.' });
        res.status(500).json({ message: 'Server error', error: e.message });
    }
});

// Get all histories
router.get('/medical-history', async (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const history = await MedicalHistory.find()
            .populate('patientId', 'name patientNumber age gender')
            .populate('consultationId')
            .populate('testId')
            .populate('prescriptionId')
            .populate('recordedBy', 'fullName')
            .sort({ createdAt: -1 });
        res.json(history);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get history for one patient
router.get('/medical-history/patient/:id', async (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const history = await MedicalHistory.find({ patientId: req.params.id })
            .populate('consultationId')
            .populate('testId')
            .populate('prescriptionId')
            .populate('recordedBy', 'fullName')
            .sort({ createdAt: -1 });
        res.json(history);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark payment as received
router.patch('/medical-history/:id/pay', allow('nurse', 'hr', 'admin'), async (req, res) => {
    try {
        const { amountPaid, paymentMethod } = req.body;
        const record = await MedicalHistory.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });

        record.amountPaid = amountPaid || record.grandTotal;
        record.paymentMethod = paymentMethod || 'cash';
        record.paymentStatus = record.amountPaid >= record.grandTotal ? 'paid'
            : record.amountPaid > 0 ? 'partial' : 'unpaid';
        await record.save();
        res.json({ message: 'Payment updated', record });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
