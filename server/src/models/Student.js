import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  enrolledAt: { type: Date, default: Date.now }
});

export default mongoose.model('Student', studentSchema);
