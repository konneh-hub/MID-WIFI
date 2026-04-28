import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  description: { type: String, default: '' },
  credits: { type: Number, default: 3 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Course', courseSchema);
