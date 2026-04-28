import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now }
});

export default mongoose.model('News', newsSchema);
