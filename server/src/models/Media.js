import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true, enum: ['Campus Life', 'Academic Events', 'Community Impact'] },
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true, enum: ['image', 'video'] },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Media', mediaSchema);