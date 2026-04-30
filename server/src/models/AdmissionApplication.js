import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['draft', 'submitted'], default: 'draft' },
  step: { type: Number, default: 1 },
  personalInfo: {
    fullName: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    address: { type: String },
    phone: { type: String }
  },
  academicBackground: {
    previousSchool: { type: String },
    qualification: { type: String },
    grades: { type: String }
  },
  programSelection: {
    program: { type: String },
    department: { type: String }
  },
  documents: {
    certificate: { type: String }, // file path or URL
    transcript: { type: String },
    idDocument: { type: String }
  },
  submittedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Ensure only one application per user
applicationSchema.index({ user: 1 }, { unique: true });

export default mongoose.model('AdmissionApplication', applicationSchema);
