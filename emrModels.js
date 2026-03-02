import mongoose from 'mongoose';

// ─── PATIENT ────────────────────────────────────────────────────────────────
const PatientSchema = new mongoose.Schema({
    patientNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    genotype: { type: String, enum: ['AA', 'AS', 'SS', 'AC', 'SC'] },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    address: { type: String },
    nextOfKinName: { type: String },
    nextOfKinPhone: { type: String },
    allergies: [{ type: String }],
    chronicConditions: [{ type: String }],
    status: { type: String, enum: ['active', 'discharged', 'deceased'], default: 'active' },
    registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// ─── TRIAGE / VITALS (filled by Nurse on arrival) ───────────────────────────
const VitalsSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    nurseId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    temperature: { type: Number },                  // °C
    bloodPressure: { type: String },                  // e.g. "120/80"
    pulseRate: { type: Number },                  // bpm
    respiratoryRate: { type: Number },                  // breaths/min
    oxygenSaturation: { type: Number },                 // SpO2 %
    weight: { type: Number },                  // kg
    height: { type: Number },                  // cm
    chiefComplaint: { type: String, required: true },  // Patient's complaint
    triageLevel: { type: String, enum: ['low', 'moderate', 'high', 'critical'], default: 'moderate' },
    notes: { type: String },
}, { timestamps: true });

// ─── CONSULTATION (filled by Doctor) ────────────────────────────────────────
const ConsultationSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vitalsId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vitals' },
    clinicalFindings: { type: String, required: true },  // Doctor's examination notes
    workingDiagnosis: { type: String },                  // Primary diagnosis
    differentialDiagnosis: [{ type: String }],              // Alternative diagnoses
    planOfManagement: { type: String },                  // Treatment plan narrative
    admissionRequired: { type: Boolean, default: false },
    ward: { type: String },                  // If admitted
    status: { type: String, enum: ['open', 'completed'], default: 'open' },
}, { timestamps: true });

// ─── MEDICAL TESTS (ordered by Doctor/Nurse, processed by Lab Scientist) ────
const MedicalTestSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    consultationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' },
    labScientistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    testsRequested: [{ type: String, required: true }],      // e.g. ['FBC', 'Malaria RDT']
    testPrices: { type: Map, of: Number, default: {} },  // { 'FBC': 3500 }
    totalCost: { type: Number, default: 0 },
    resultDescription: { type: String },
    resultDocumentUrl: { type: String },
    status: { type: String, enum: ['pending', 'processing', 'completed'], default: 'pending' },
    completedAt: { type: Date },
}, { timestamps: true });

// ─── PRESCRIPTION (issued by Doctor) ────────────────────────────────────────
const PrescriptionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    consultationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalTest' },
    prescriptions: [{
        itemType: { type: String, enum: ['drug', 'injection', 'infusion', 'procedure', 'other'], required: true },
        name: { type: String, required: true },
        dosage: { type: String, required: true },   // e.g. "500mg"
        frequency: { type: String },                   // e.g. "TDS (3x daily)"
        duration: { type: String, required: true },   // e.g. "5 days"
        quantity: { type: Number, default: 1 },
        cost: { type: Number, default: 0 },
    }],
    totalDrugCost: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'dispensed', 'partially_dispensed'], default: 'pending' },
    dispensedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },      // Pharmacist
    administeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },      // Nurse
    treatmentCost: { type: Number, default: 0 },
    administeredAt: { type: Date },
    notes: { type: String },
}, { timestamps: true });

// ─── MEDICAL HISTORY / BILLING SUMMARY (compiled by Nurse) ─────────────────
const MedicalHistorySchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    consultationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalTest' },
    prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
    consultationFee: { type: Number, default: 0 },
    totalTestCost: { type: Number, default: 0 },
    totalTreatmentCost: { type: Number, default: 0 },
    admissionCost: { type: Number, default: 0 },
    otherCosts: [{ label: String, amount: Number }],
    grandTotal: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ['unpaid', 'partial', 'paid'], default: 'unpaid' },
    paymentMethod: { type: String, enum: ['cash', 'pos', 'transfer', 'insurance', 'other'] },
    invoiceNumber: { type: String, unique: true },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Nurse
    notes: { type: String },
}, { timestamps: true });

// ─── PRE-SAVE: Auto-generate invoice number ──────────────────────────────────
MedicalHistorySchema.pre('save', function (next) {
    if (!this.invoiceNumber) {
        this.invoiceNumber = `LH-INV-${Date.now().toString().slice(-8)}`;
    }
    next();
});

// ─── EXPORTS ────────────────────────────────────────────────────────────────
export const Patient = mongoose.model('Patient', PatientSchema);
export const Vitals = mongoose.model('Vitals', VitalsSchema);
export const Consultation = mongoose.model('Consultation', ConsultationSchema);
export const MedicalTest = mongoose.model('MedicalTest', MedicalTestSchema);
export const Prescription = mongoose.model('Prescription', PrescriptionSchema);
export const MedicalHistory = mongoose.model('MedicalHistory', MedicalHistorySchema);
