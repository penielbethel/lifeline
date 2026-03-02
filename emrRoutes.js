import express from 'express';
import { Patient, MedicalTest, Prescription, MedicalHistory } from './emrModels.js';
const router = express.Router();

// Middleware to check authentication (will be passed from server.js)
const checkAuth = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    next();
};

// Roles array: ['hr', 'doctor', 'nurse', 'lab_scientist', 'pharmacist', 'superadmin']

// --- PATIENT MANAGEMENT (HR/Admin) ---
router.post('/patients', checkAuth, async (req, res) => {
    if (req.user.role !== 'hr' && req.user.role !== 'superadmin' && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    try {
        const { name, age, gender, bloodGroup, genotype, phone, address } = req.body;
        const patientNumber = 'PT-' + Date.now().toString().slice(-6);
        const patient = new Patient({
            patientNumber, name, age, gender, bloodGroup, genotype, phone, address,
            registeredBy: req.user.id
        });
        await patient.save();
        res.status(201).json({ message: 'Patient registered', patient });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/patients', checkAuth, async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.json(patients);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// --- MEDICAL TESTS (Doctor -> Lab Scientist) ---
router.post('/medical-tests', checkAuth, async (req, res) => {
    // Doctors or Nurses can order tests
    if (req.user.role !== 'doctor' && req.user.role !== 'nurse') return res.status(403).json({ message: 'Forbidden' });
    try {
        const { patientId, testsRequested } = req.body;
        const test = new MedicalTest({
            patientId,
            doctorId: req.user.id,
            testsRequested
        });
        await test.save();
        res.status(201).json({ message: 'Tests requested', test });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/medical-tests', checkAuth, async (req, res) => {
    try {
        let tests;
        if (req.user.role === 'lab_scientist') {
            tests = await MedicalTest.find().populate('patientId doctorId').sort({ createdAt: -1 });
        } else if (req.user.role === 'doctor') {
            tests = await MedicalTest.find({ doctorId: req.user.id }).populate('patientId labScientistId').sort({ createdAt: -1 });
        } else {
            tests = await MedicalTest.find().populate('patientId doctorId labScientistId').sort({ createdAt: -1 });
        }
        res.json(tests);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/medical-tests/:id/process', checkAuth, async (req, res) => {
    if (req.user.role !== 'lab_scientist') return res.status(403).json({ message: 'Forbidden' });
    try {
        const { testPrices, totalCost, resultDescription, resultDocumentUrl } = req.body;
        const test = await MedicalTest.findById(req.params.id);
        if (!test) return res.status(404).json({ message: 'Not found' });

        test.labScientistId = req.user.id;
        test.testPrices = testPrices || test.testPrices;
        test.totalCost = totalCost || test.totalCost;
        test.resultDescription = resultDescription || test.resultDescription;
        test.resultDocumentUrl = resultDocumentUrl || test.resultDocumentUrl;

        if (resultDescription || resultDocumentUrl) {
            test.status = 'completed';
            test.completedAt = Date.now();
        } else {
            test.status = 'processing';
        }

        await test.save();
        res.json({ message: 'Test updated', test });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// --- PRESCRIPTIONS (Doctor -> Nurse/Pharmacist) ---
router.post('/prescriptions', checkAuth, async (req, res) => {
    if (req.user.role !== 'doctor') return res.status(403).json({ message: 'Forbidden' });
    try {
        const { patientId, testId, prescriptions } = req.body;
        const prescription = new Prescription({
            patientId,
            doctorId: req.user.id,
            testId,
            prescriptions
        });
        await prescription.save();
        res.status(201).json({ message: 'Prescription made', prescription });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/prescriptions', checkAuth, async (req, res) => {
    try {
        const pres = await Prescription.find().populate('patientId doctorId testId').sort({ createdAt: -1 });
        res.json(pres);
    } catch (e) { res.status(500).json({ message: 'Server error' }); }
});

router.patch('/prescriptions/:id/administer', checkAuth, async (req, res) => {
    if (req.user.role !== 'nurse' && req.user.role !== 'pharmacist') return res.status(403).json({ message: 'Forbidden' });
    try {
        const { treatmentCost } = req.body;
        const pres = await Prescription.findById(req.params.id);
        pres.status = 'administered';
        pres.administeredBy = req.user.id;
        pres.treatmentCost = treatmentCost || 0;
        pres.administeredAt = Date.now();
        await pres.save();
        res.json({ message: 'Prescription administered', pres });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// --- MEDICAL HISTORY & BILLING (Nurse) ---
router.post('/medical-history', checkAuth, async (req, res) => {
    if (req.user.role !== 'nurse') return res.status(403).json({ message: 'Forbidden' });
    try {
        const { patientId, testId, prescriptionId, totalTestCost, totalTreatmentCost } = req.body;
        const grandTotal = (totalTestCost || 0) + (totalTreatmentCost || 0);
        const history = new MedicalHistory({
            patientId, testId, prescriptionId, totalTestCost, totalTreatmentCost, grandTotal,
            recordedBy: req.user.id
        });
        await history.save();
        res.status(201).json({ message: 'Final medical history recorded', history });
    } catch (e) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/medical-history', checkAuth, async (req, res) => {
    try {
        const history = await MedicalHistory.find().populate('patientId testId prescriptionId recordedBy').sort({ createdAt: -1 });
        res.json(history);
    } catch (e) { res.status(500).json({ message: 'Server error' }); }
});

export default router;
