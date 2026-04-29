import express from 'express';
import { requireAdmin, authSession } from '../middleware/auth.js';
import { loginPage, doLogin, logoutPage, renderDashboard, renderNews, renderCourses, renderDepartments, renderEvents, renderAdmissions, renderFaculties, renderPrograms, createNewsItem, updateNewsItem, deleteNewsItem, createCourseItem, updateCourseItem, deleteCourseItem, createDepartmentItem, updateDepartmentItem, deleteDepartmentItem, createEventItem, updateEventItem, deleteEventItem, createFacultyItem, updateFacultyItem, deleteFacultyItem, createProgramItem, updateProgramItem, deleteProgramItem } from '../controllers/adminController.js';

const router = express.Router();

router.use(authSession);
router.get('/login', loginPage);
router.post('/login', doLogin);
router.post('/logout', logoutPage);

router.get('/', requireAdmin, renderDashboard);
router.get('/news', requireAdmin, renderNews);
router.post('/news', requireAdmin, createNewsItem);
router.put('/news/:id', requireAdmin, updateNewsItem);
router.delete('/news/:id', requireAdmin, deleteNewsItem);
router.get('/courses', requireAdmin, renderCourses);
router.post('/courses', requireAdmin, createCourseItem);
router.put('/courses/:id', requireAdmin, updateCourseItem);
router.delete('/courses/:id', requireAdmin, deleteCourseItem);
router.get('/departments', requireAdmin, renderDepartments);
router.post('/departments', requireAdmin, createDepartmentItem);
router.put('/departments/:id', requireAdmin, updateDepartmentItem);
router.delete('/departments/:id', requireAdmin, deleteDepartmentItem);
router.get('/events', requireAdmin, renderEvents);
router.post('/events', requireAdmin, createEventItem);
router.put('/events/:id', requireAdmin, updateEventItem);
router.delete('/events/:id', requireAdmin, deleteEventItem);
router.get('/admissions', requireAdmin, renderAdmissions);

router.get('/faculties', requireAdmin, renderFaculties);
router.post('/faculties', requireAdmin, createFacultyItem);
router.put('/faculties/:id', requireAdmin, updateFacultyItem);
router.delete('/faculties/:id', requireAdmin, deleteFacultyItem);

router.get('/programs', requireAdmin, renderPrograms);
router.post('/programs', requireAdmin, createProgramItem);
router.put('/programs/:id', requireAdmin, updateProgramItem);
router.delete('/programs/:id', requireAdmin, deleteProgramItem);

export default router;
