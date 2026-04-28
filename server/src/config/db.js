import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/midwifi';
  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
