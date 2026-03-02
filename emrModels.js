import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
    patientNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String },
    genotype: { type: String },
    phone: { type: String },
    address: { type: String },
    registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const MedicalTestSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    labScientistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    testsRequested: [{ type: String, required: true }],
    testPrices: { type: Map, of: Number, default: {} },
    totalCost: { type: Number, default: 0 },
    resultDescription: { type: String },
    resultDocumentUrl: { type: String },
    status: { type: String, enum: ['pending', 'processing', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date }
});

const PrescriptionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalTest' },
    prescriptions: [{
        itemType: { type: String, enum: ['drug', 'injection', 'infusion', 'other'], required: true },
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        duration: { type: String, required: true }
    }],
    status: { type: String, enum: ['pending', 'administered'], default: 'pending' },
    administeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    treatmentCost: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    administeredAt: { type: Date }
});

const MedicalHistorySchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalTest', required: true },
    prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription', required: true },
    totalTestCost: { type: Number, required: true },
    totalTreatmentCost: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // usually Nurse
    createdAt: { type: Date, default: Date.now }
});

export const Patient = mongoose.model('Patient', PatientSchema);
export const MedicalTest = mongoose.model('MedicalTest', MedicalTestSchema);
export const Prescription = mongoose.model('Prescription', PrescriptionSchema);
export const MedicalHistory = mongoose.model('MedicalHistory', MedicalHistorySchema);
