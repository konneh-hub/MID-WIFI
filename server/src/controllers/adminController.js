import bcrypt from 'bcrypt';
import News from '../models/News.js';
import Course from '../models/Course.js';
import Department from '../models/Department.js';
import Event from '../models/Event.js';
import AdmissionApplication from '../models/AdmissionApplication.js';
import User from '../models/User.js';
import Faculty from '../models/Faculty.js';
import Program from '../models/Program.js';

export function loginPage(req, res) {
  res.render('admin/login', { error: null });
}

export async function doLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role: 'admin' });
  if (!user) {
    return res.render('admin/login', { error: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.render('admin/login', { error: 'Invalid credentials' });
  }

  req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
  return res.redirect('/admin');
}

export function logoutPage(req, res) {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
}

export async function renderDashboard(req, res) {
  const [newsCount, courseCount, departmentCount, eventCount, applicationCount, facultyCount, programCount] = await Promise.all([
    News.countDocuments(),
    Course.countDocuments(),
    Department.countDocuments(),
    Event.countDocuments(),
    AdmissionApplication.countDocuments(),
    Faculty.countDocuments(),
    Program.countDocuments()
  ]);
  res.render('admin/dashboard', { counts: { newsCount, courseCount, departmentCount, eventCount, applicationCount, facultyCount, programCount } });
}

export async function renderNews(req, res) {
  const news = await News.find().sort({ publishedAt: -1 });
  res.render('admin/news', { news });
}

export async function createNewsItem(req, res) {
  await News.create(req.body);
  res.redirect('/admin/news');
}

export async function updateNewsItem(req, res) {
  const { title, summary, content } = req.body;
  await News.findByIdAndUpdate(req.params.id, { title, summary, content });
  res.redirect('/admin/news');
}

export async function deleteNewsItem(req, res) {
  await News.findByIdAndDelete(req.params.id);
  res.redirect('/admin/news');
}

export async function renderCourses(req, res) {
  const courses = await Course.find().populate('department');
  const departments = await Department.find();
  res.render('admin/courses', { courses, departments });
}

export async function createCourseItem(req, res) {
  await Course.create(req.body);
  res.redirect('/admin/courses');
}

export async function updateCourseItem(req, res) {
  const { title, code, department, description, credits } = req.body;
  await Course.findByIdAndUpdate(req.params.id, { title, code, department, description, credits });
  res.redirect('/admin/courses');
}

export async function deleteCourseItem(req, res) {
  await Course.findByIdAndDelete(req.params.id);
  res.redirect('/admin/courses');
}

export async function renderDepartments(req, res) {
  const departments = await Department.find();
  res.render('admin/departments', { departments });
}

export async function createDepartmentItem(req, res) {
  await Department.create(req.body);
  res.redirect('/admin/departments');
}

export async function updateDepartmentItem(req, res) {
  const { name, description } = req.body;
  await Department.findByIdAndUpdate(req.params.id, { name, description });
  res.redirect('/admin/departments');
}

export async function deleteDepartmentItem(req, res) {
  await Department.findByIdAndDelete(req.params.id);
  res.redirect('/admin/departments');
}

export async function renderEvents(req, res) {
  const events = await Event.find().sort({ date: 1 });
  res.render('admin/events', { events });
}

export async function createEventItem(req, res) {
  await Event.create(req.body);
  res.redirect('/admin/events');
}

export async function updateEventItem(req, res) {
  const { title, date, location, description } = req.body;
  await Event.findByIdAndUpdate(req.params.id, { title, date, location, description });
  res.redirect('/admin/events');
}

export async function deleteEventItem(req, res) {
  await Event.findByIdAndDelete(req.params.id);
  res.redirect('/admin/events');
}

export async function renderAdmissions(req, res) {
  const applications = await AdmissionApplication.find().sort({ submittedAt: -1 });
  res.render('admin/admissions', { applications });
}

export async function renderFaculties(req, res) {
  const faculties = await Faculty.find().sort({ createdAt: -1 });
  res.render('admin/faculties', { faculties });
}

export async function createFacultyItem(req, res) {
  await Faculty.create(req.body);
  res.redirect('/admin/faculties');
}

export async function updateFacultyItem(req, res) {
  const { name, description, dean, established } = req.body;
  await Faculty.findByIdAndUpdate(req.params.id, { name, description, dean, established });
  res.redirect('/admin/faculties');
}

export async function deleteFacultyItem(req, res) {
  await Faculty.findByIdAndDelete(req.params.id);
  res.redirect('/admin/faculties');
}

export async function renderPrograms(req, res) {
  const programs = await Program.find().populate('faculty').populate('department');
  const faculties = await Faculty.find();
  const departments = await Department.find();
  res.render('admin/programs', { programs, faculties, departments });
}

export async function createProgramItem(req, res) {
  await Program.create(req.body);
  res.redirect('/admin/programs');
}

export async function updateProgramItem(req, res) {
  const { title, code, type, duration, durationUnit, faculty, department, description, requirements } = req.body;
  await Program.findByIdAndUpdate(req.params.id, { title, code, type, duration, durationUnit, faculty, department, description, requirements });
  res.redirect('/admin/programs');
}

export async function deleteProgramItem(req, res) {
  await Program.findByIdAndDelete(req.params.id);
  res.redirect('/admin/programs');
}
