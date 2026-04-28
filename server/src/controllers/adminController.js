import bcrypt from 'bcrypt';
import News from '../models/News.js';
import Course from '../models/Course.js';
import Department from '../models/Department.js';
import Event from '../models/Event.js';
import AdmissionApplication from '../models/AdmissionApplication.js';
import User from '../models/User.js';

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
  const [newsCount, courseCount, departmentCount, eventCount, applicationCount] = await Promise.all([
    News.countDocuments(),
    Course.countDocuments(),
    Department.countDocuments(),
    Event.countDocuments(),
    AdmissionApplication.countDocuments()
  ]);
  res.render('admin/dashboard', { counts: { newsCount, courseCount, departmentCount, eventCount, applicationCount } });
}

export async function renderNews(req, res) {
  const news = await News.find().sort({ publishedAt: -1 });
  res.render('admin/news', { news });
}

export async function createNewsItem(req, res) {
  await News.create(req.body);
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

export async function renderDepartments(req, res) {
  const departments = await Department.find();
  res.render('admin/departments', { departments });
}

export async function createDepartmentItem(req, res) {
  await Department.create(req.body);
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

export async function renderAdmissions(req, res) {
  const applications = await AdmissionApplication.find().sort({ submittedAt: -1 });
  res.render('admin/admissions', { applications });
}
