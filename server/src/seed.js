import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export async function initAdminUser() {
  try {
    const email = process.env.ADMIN_EMAIL || 'admin@midwifi.edu';
    const existing = await User.findOne({ email }).catch(err => {
      console.error('Error checking for existing admin:', err.message);
      return null;
    });
    if (existing) {
      console.log(`Admin user already exists: ${email}`);
      return;
    }

    const password = process.env.ADMIN_PASSWORD || 'MidWifi123!';
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name: 'MID-WIFI Admin',
      email,
      password: hashedPassword,
      role: 'admin'
    });
    console.log(`Default admin created: ${email}`);
  } catch (error) {
    console.error('Admin user initialization error:', error.message);
  }
}

export async function initTestStudents() {
  try {
    const students = [
      { name: 'John Doe', email: 'john.doe@university.edu', password: 'password123' },
      { name: 'Jane Smith', email: 'jane.smith@university.edu', password: 'password123' }
    ];

    for (const student of students) {
      const existing = await User.findOne({ email: student.email }).catch(err => {
        console.error('Error checking for existing student:', err.message);
        return null;
      });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(student.password, 12);
        await User.create({
          name: student.name,
          email: student.email,
          password: hashedPassword,
          role: 'student'
        });
        console.log(`Test student created: ${student.email}`);
      } else {
        console.log(`Test student already exists: ${student.email}`);
      }
    }
  } catch (error) {
    console.error('Test students initialization error:', error.message);
  }
}

if (process.argv[1].endsWith('seed.js')) {
  import('./config/db.js').then(async ({ connectDatabase }) => {
    await connectDatabase();
    await initAdminUser();
    process.exit(0);
  });
}
