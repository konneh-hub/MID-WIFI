import bcrypt from 'bcryptjs';
import News from '../models/News.js';
import Course from '../models/Course.js';
import Department from '../models/Department.js';
import Event from '../models/Event.js';
import AdmissionApplication from '../models/AdmissionApplication.js';
import User from '../models/User.js';
import Faculty from '../models/Faculty.js';
import Program from '../models/Program.js';
import Media from '../models/Media.js';

export function loginPage(req, res) {
  if (req.session?.user?.role === 'admin') {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', { error: null });
}

export async function doLogin(req, res) {
  try {
    console.log('Admin login attempt for:', req.body.email);
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: 'admin' });
    console.log('User found:', !!user);
    if (!user) {
      console.log('No admin user found with email:', email);
      return res.render('admin/login', { error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword);
    if (!validPassword) {
      console.log('Invalid password for user:', email);
      return res.render('admin/login', { error: 'Invalid credentials' });
    }

    req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
    console.log('Session set, redirecting to dashboard');
    console.log('Session user:', req.session.user);
    res.redirect('/admin/dashboard');
    console.log('Redirect called');
    return;
  } catch (error) {
    console.error('Admin login error:', error.message || error);
    return res.status(500).render('admin/login', { error: 'Unable to log in right now. Please try again later.' });
  }
}

export function logoutPage(req, res) {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
}

export async function renderDashboard(req, res) {
  try {
    console.log('Rendering dashboard');
    // Use Promise.allSettled to handle individual timeouts
    const results = await Promise.allSettled([
      News.countDocuments().catch(() => 0),
      Course.countDocuments().catch(() => 0),
      Department.countDocuments().catch(() => 0),
      Event.countDocuments().catch(() => 0),
      AdmissionApplication.countDocuments().catch(() => 0),
      Faculty.countDocuments().catch(() => 0),
      Program.countDocuments().catch(() => 0),
      Media.countDocuments().catch(() => 0)
    ]);
    
    const counts = {
      newsCount: results[0].status === 'fulfilled' ? results[0].value : 0,
      courseCount: results[1].status === 'fulfilled' ? results[1].value : 0,
      departmentCount: results[2].status === 'fulfilled' ? results[2].value : 0,
      eventCount: results[3].status === 'fulfilled' ? results[3].value : 0,
      applicationCount: results[4].status === 'fulfilled' ? results[4].value : 0,
      facultyCount: results[5].status === 'fulfilled' ? results[5].value : 0,
      programCount: results[6].status === 'fulfilled' ? results[6].value : 0,
      mediaCount: results[7].status === 'fulfilled' ? results[7].value : 0
    };
    
    console.log('Counts:', counts);
    res.render('admin/dashboard', { counts });
  } catch (error) {
    console.error('Error rendering dashboard:', error.message);
    // Render with zero counts if database is not available
    res.render('admin/dashboard', { counts: { newsCount: 0, courseCount: 0, departmentCount: 0, eventCount: 0, applicationCount: 0, facultyCount: 0, programCount: 0, mediaCount: 0 } });
  }
}

export async function renderNews(req, res) {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.render('admin/news', { news });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.render('admin/news', { news: [] });
  }
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
  try {
    const courses = await Course.find().populate('department');
    const departments = await Department.find();
    res.render('admin/courses', { courses, departments });
  } catch (error) {
    console.error('Error fetching courses:', error);
    // Render with empty data if database is not available
    res.render('admin/courses', { courses: [], departments: [] });
  }
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
  try {
    const departments = await Department.find();
    res.render('admin/departments', { departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.render('admin/departments', { departments: [] });
  }
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
  try {
    const events = await Event.find().sort({ date: 1 });
    res.render('admin/events', { events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.render('admin/events', { events: [] });
  }
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
  try {
    const applications = await AdmissionApplication.find().sort({ submittedAt: -1 });
    res.render('admin/admissions', { applications });
  } catch (error) {
    console.error('Error fetching admissions:', error);
    res.render('admin/admissions', { applications: [] });
  }
}

export async function renderFaculties(req, res) {
  try {
    const faculties = await Faculty.find().sort({ createdAt: -1 });
    res.render('admin/faculties', { faculties });
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.render('admin/faculties', { faculties: [] });
  }
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
  try {
    const programs = await Program.find().populate('faculty').populate('department');
    const faculties = await Faculty.find();
    const departments = await Department.find();
    res.render('admin/programs', { programs, faculties, departments });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.render('admin/programs', { programs: [], faculties: [], departments: [] });
  }
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

export async function renderMedia(req, res) {
  try {
    const media = await Media.find().sort({ uploadedAt: -1 });
    res.render('admin/media', { media });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.render('admin/media', { media: [] });
  }
}

export async function createMediaItem(req, res) {
  const { title, description, category, fileType } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : req.body.fileUrl;
  await Media.create({ title, description, category, fileUrl, fileType });
  res.redirect('/admin/media');
}

export async function updateMediaItem(req, res) {
  const { title, description, category, fileType, fileUrl } = req.body;
  await Media.findByIdAndUpdate(req.params.id, { title, description, category, fileType, fileUrl });
  res.redirect('/admin/media');
}

export async function deleteMediaItem(req, res) {
  await Media.findByIdAndDelete(req.params.id);
  res.redirect('/admin/media');
}
