import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDatabase() {
  const host = process.env.MONGO_HOST || 'localhost';
  const uri = process.env.MONGODB_URI || `mongodb://admin:password@${host}:27017/midwifi`;
  
  try {
    await mongoose.connect(uri, { 
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
    console.log(`MongoDB connected to ${host}:27017`);
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Server will continue in limited mode...');
    return false;
  }
}
