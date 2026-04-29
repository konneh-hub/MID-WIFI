import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['undergraduate', 'masters', 'postgraduate', 'phd', 'doctorate', 'diploma', 'certificate']
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  durationUnit: {
    type: String,
    required: true,
    enum: ['years', 'months']
  },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  description: { type: String, default: '' },
  requirements: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Program', programSchema);