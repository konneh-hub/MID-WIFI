import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './config/db.js';
import { initAdminUser } from './seed.js';
import apiRouter from './routes/api.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import { authSession } from './middleware/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectDatabase();
await initAdminUser();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'midwifi-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
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

app.listen(PORT, () => {
  console.log(`MID-WIFI server running on http://localhost:${PORT}`);
});
