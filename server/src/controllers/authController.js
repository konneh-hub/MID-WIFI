import User from '../models/User.js';
import bcrypt from 'bcrypt';

export async function loginAdmin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role: 'admin' });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
  res.json({ message: 'Login successful' });
}
