import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  program: { type: String, required: true },
  message: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('AdmissionApplication', applicationSchema);
