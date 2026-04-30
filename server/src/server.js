import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
// import multer from 'multer';
import { connectDatabase } from './config/db.js';
import { initAdminUser, initTestStudents } from './seed.js';
import apiRouter from './routes/api.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import { authSession } from './middleware/auth.js';
import { setDbConnected } from './controllers/applicationController.js';
import { setAuthDbConnected } from './controllers/authController.js';
import { setPublicDbConnected } from './controllers/publicController.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize database connection properly
(async () => {
  const connected = await connectDatabase();
  let dbConnected = connected;
  if (connected) {
    try {
      await initAdminUser();
      console.log('✅ Admin user initialization completed');
      await initTestStudents();
      console.log('✅ Test students initialization completed');
    } catch (seedError) {
      console.log('⚠️ Seed initialization skipped:', seedError.message);
    }
  } else {
    console.log('❌ Skipping admin user initialization - database unavailable');
    console.log('❌ Test students initialization skipped - database unavailable');
  }
  setDbConnected(dbConnected);
  setAuthDbConnected(dbConnected);
  setPublicDbConnected(dbConnected);
})();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('Views path:', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'public', 'uploads'));
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://localhost:3000'
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'midwifi-secret',
  resave: false,
  saveUninitialized: false,
  store: new session.MemoryStore(),
  cookie: { maxAge: 1000 * 60 * 60 * 5 }
}));

app.use('/api', apiRouter);
app.use('/api/auth', authRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.send('MID-WIFI API is running. Visit /admin for the admin dashboard.');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, () => {
  console.log(`MID-WIFI server running on http://localhost:${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop the process using that port or change PORT.`);
    process.exit(1);
  }
  console.error('Server error:', error);
  process.exit(1);
});
