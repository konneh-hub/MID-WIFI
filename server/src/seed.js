import bcrypt from 'bcrypt';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export async function initAdminUser() {
  const email = process.env.ADMIN_EMAIL || 'admin@midwifi.edu';
  const existing = await User.findOne({ email });
  if (existing) {
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
}

if (process.argv[1].endsWith('seed.js')) {
  import('./config/db.js').then(async ({ connectDatabase }) => {
    await connectDatabase();
    await initAdminUser();
    process.exit(0);
  });
}
