import mongoose from 'mongoose';
import User from './src/models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function resetPassword() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:password@mongo:27017/midwifery?authSource=admin';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('MidWifery123!', 10);
    const user = await User.findOneAndUpdate(
      { email: 'admin@midwifery.edu' },
      { password: hashedPassword },
      { new: true }
    );

    if (user) {
      console.log('Password reset for:', user.email);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

resetPassword();