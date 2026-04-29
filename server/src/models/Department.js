import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Department', departmentSchema);
