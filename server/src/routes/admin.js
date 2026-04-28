import express from 'express';
import { requireAdmin, authSession } from '../middleware/auth.js';
import { loginPage, doLogin, logoutPage, renderDashboard, renderNews, renderCourses, renderDepartments, renderEvents, renderAdmissions, createNewsItem, createCourseItem, createDepartmentItem, createEventItem } from '../controllers/adminController.js';

const router = express.Router();

router.use(authSession);
router.get('/login', loginPage);
router.post('/login', doLogin);
router.post('/logout', logoutPage);

router.get('/', requireAdmin, renderDashboard);
router.get('/news', requireAdmin, renderNews);
router.post('/news', requireAdmin, createNewsItem);
router.get('/courses', requireAdmin, renderCourses);
router.post('/courses', requireAdmin, createCourseItem);
router.get('/departments', requireAdmin, renderDepartments);
router.post('/departments', requireAdmin, createDepartmentItem);
router.get('/events', requireAdmin, renderEvents);
router.post('/events', requireAdmin, createEventItem);
router.get('/admissions', requireAdmin, renderAdmissions);

export default router;
