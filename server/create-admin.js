import mongoose from 'mongoose';
import User from './src/models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:password@mongo:27017/midwifi?authSource=admin';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = await User.create({
      name: 'Administrator',
      email: 'admin@midwifi.edu',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Admin user created:', user.email);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();