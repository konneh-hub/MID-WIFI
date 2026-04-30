import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// In-memory users for when DB is not available
const memoryUsers = new Map();

// Check if DB is connected
let dbConnected = true;

export const setAuthDbConnected = (connected) => {
  dbConnected = connected;
  if (!connected) {
    // Add test users to memory
    memoryUsers.set('john.doe@university.edu', {
      _id: 'john-doe-id',
      name: 'John Doe',
      email: 'john.doe@university.edu',
      role: 'student'
    });
    memoryUsers.set('jane.smith@university.edu', {
      _id: 'jane-smith-id',
      name: 'Jane Smith',
      email: 'jane.smith@university.edu',
      role: 'student'
    });
  }
};

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

export async function loginStudent(req, res) {
  const { email, password } = req.body;

  if (!dbConnected) {
    const user = memoryUsers.get(email);
    if (!user || password !== 'password123') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.user = user;
    return res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  }

  const user = await User.findOne({ email, role: 'student' });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.session.user = { _id: user._id, name: user.name, email: user.email, role: user.role };
  res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
}

export async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
}

export async function getCurrentUser(req, res) {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
}
