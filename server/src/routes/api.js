import express from 'express';
import { body } from 'express-validator';
import { getNews, getCourses, getDepartments, getEvents, submitContact } from '../controllers/publicController.js';
import { createNews, updateCourse, deleteEvent } from '../controllers/adminApiController.js';
import { validateRequest } from '../middleware/validate.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/news', getNews);
router.get('/courses', getCourses);
router.get('/departments', getDepartments);
router.get('/events', getEvents);
router.post('/contact', body('name').trim().notEmpty(), body('email').isEmail(), body('message').trim().notEmpty(), validateRequest, submitContact);

router.post('/news', requireAdmin, createNews);
router.put('/courses/:id', requireAdmin, body('title').trim().notEmpty(), body('department').trim().notEmpty(), validateRequest, updateCourse);
router.delete('/events/:id', requireAdmin, deleteEvent);

export default router;
