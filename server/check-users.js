import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkUsers() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:password@mongo:27017/midwifery?authSource=admin';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const users = await User.find({});
    console.log('Users found:', users.length);
    users.forEach(user => {
      console.log(`- ${user.email}: ${user.role}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkUsers();