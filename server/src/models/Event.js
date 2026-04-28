import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, default: 'Main campus' },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);
