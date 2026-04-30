import express from 'express';
import { body } from 'express-validator';
import { getNews, getCourses, getDepartments, getEvents, getFaculties, getPrograms, submitContact, getCounts } from '../controllers/publicController.js';
import { createNews, updateNews, deleteNews, createCourse, updateCourse, deleteCourse, createDepartment, updateDepartment, deleteDepartment, createEvent, updateEvent, deleteEvent, createFaculty, updateFaculty, deleteFaculty, createProgram, updateProgram, deleteProgram } from '../controllers/adminApiController.js';
import { getMedia, getMediaByCategory, createMedia, updateMedia, deleteMedia } from '../controllers/mediaController.js';
import { getApplication, saveApplication, submitApplication, deleteApplication } from '../controllers/applicationController.js';
import { validateRequest } from '../middleware/validate.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
// import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const router = express.Router();

router.get('/news', getNews);
router.get('/courses', getCourses);
router.get('/departments', getDepartments);
router.get('/events', getEvents);
router.get('/faculties', getFaculties);
router.get('/programs', getPrograms);
router.get('/counts', getCounts);
router.post('/contact', body('name').trim().notEmpty(), body('email').isEmail(), body('message').trim().notEmpty(), validateRequest, submitContact);

router.post('/news', requireAdmin, body('title').trim().notEmpty(), body('summary').trim().notEmpty(), validateRequest, createNews);
router.put('/news/:id', requireAdmin, body('title').trim().notEmpty(), body('summary').trim().notEmpty(), validateRequest, updateNews);
router.delete('/news/:id', requireAdmin, deleteNews);

router.post('/courses', requireAdmin, body('title').trim().notEmpty(), body('code').trim().notEmpty(), validateRequest, createCourse);
router.put('/courses/:id', requireAdmin, body('title').trim().notEmpty(), body('code').trim().notEmpty(), validateRequest, updateCourse);
router.delete('/courses/:id', requireAdmin, deleteCourse);

router.post('/departments', requireAdmin, body('name').trim().notEmpty(), validateRequest, createDepartment);
router.put('/departments/:id', requireAdmin, body('name').trim().notEmpty(), validateRequest, updateDepartment);
router.delete('/departments/:id', requireAdmin, deleteDepartment);

router.post('/events', requireAdmin, body('title').trim().notEmpty(), body('date').isISO8601(), validateRequest, createEvent);
router.put('/events/:id', requireAdmin, body('title').trim().notEmpty(), body('date').isISO8601(), validateRequest, updateEvent);
router.delete('/events/:id', requireAdmin, deleteEvent);

router.post('/faculties', requireAdmin, body('name').trim().notEmpty(), validateRequest, createFaculty);
router.put('/faculties/:id', requireAdmin, body('name').trim().notEmpty(), validateRequest, updateFaculty);
router.delete('/faculties/:id', requireAdmin, deleteFaculty);

router.post('/programs', requireAdmin, body('title').trim().notEmpty(), body('code').trim().notEmpty(), body('type').isIn(['undergraduate', 'masters', 'postgraduate', 'phd', 'doctorate', 'diploma', 'certificate']), body('duration').isInt({ min: 1 }), body('durationUnit').isIn(['years', 'months']), validateRequest, createProgram);
router.put('/programs/:id', requireAdmin, body('title').trim().notEmpty(), body('code').trim().notEmpty(), body('type').isIn(['undergraduate', 'masters', 'postgraduate', 'phd', 'doctorate', 'diploma', 'certificate']), body('duration').isInt({ min: 1 }), body('durationUnit').isIn(['years', 'months']), validateRequest, updateProgram);
router.delete('/programs/:id', requireAdmin, deleteProgram);

router.get('/media', getMedia);
router.get('/media/category/:category', getMediaByCategory);
// router.post('/upload', requireAdmin, upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }
//   res.json({ fileUrl: `/uploads/${req.file.filename}` });
// });
router.post('/media', requireAdmin, body('title').trim().notEmpty(), body('category').isIn(['Campus Life', 'Academic Events', 'Community Impact']), body('fileUrl').trim().notEmpty(), body('fileType').isIn(['image', 'video']), validateRequest, createMedia);
router.put('/media/:id', requireAdmin, body('title').trim().notEmpty(), body('category').isIn(['Campus Life', 'Academic Events', 'Community Impact']), body('fileUrl').trim().notEmpty(), body('fileType').isIn(['image', 'video']), validateRequest, updateMedia);
router.delete('/media/:id', requireAdmin, deleteMedia);

// Application routes
router.get('/application', requireAuth, getApplication);
router.post('/application', requireAuth, saveApplication);
router.post('/application/submit', requireAuth, submitApplication);
router.delete('/application', requireAuth, deleteApplication);

export default router;
