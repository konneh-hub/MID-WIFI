import News from '../models/News.js';
import Course from '../models/Course.js';
import Department from '../models/Department.js';
import Event from '../models/Event.js';
import Faculty from '../models/Faculty.js';
import Program from '../models/Program.js';
import Student from '../models/Student.js';
import User from '../models/User.js';

// Check if DB is connected
let dbConnected = true;

export const setPublicDbConnected = (connected) => {
  dbConnected = connected;
};

// Mock data for offline mode
const mockNews = [
  { _id: '1', title: 'Welcome to MID-WIFI University', summary: 'New academic year begins!', publishedAt: new Date() }
];

const mockCourses = [
  { _id: '1', title: 'Introduction to Computer Science', code: 'CS101', department: { name: 'Computer Science' } }
];

const mockDepartments = [
  { _id: '1', name: 'Computer Science' },
  { _id: '2', name: 'Engineering' }
];

const mockCounts = {
  students: 1250,
  courses: 45,
  departments: 8,
  faculty: 120
};

export async function getNews(req, res) {
  try {
    if (!dbConnected) {
      return res.json(mockNews);
    }

    const news = await News.find().sort({ publishedAt: -1 });
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}

export async function getCourses(req, res) {
  try {
    if (!dbConnected) {
      return res.json(mockCourses);
    }

    const courses = await Course.find().populate('department').sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
}

export async function getDepartments(req, res) {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
}

export async function getEvents(req, res) {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
}

export async function getFaculties(req, res) {
  try {
    const faculties = await Faculty.find().sort({ createdAt: -1 });
    res.json(faculties);
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.status(500).json({ error: 'Failed to fetch faculties' });
  }
}

export async function getPrograms(req, res) {
  try {
    const programs = await Program.find().populate('faculty').populate('department').sort({ createdAt: -1 });
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
}

export async function submitContact(req, res) {
  const { name, email, message } = req.body;
  res.json({ message: 'Contact request received', data: { name, email, message } });
}

export async function getCounts(req, res) {
  try {
    if (!dbConnected) {
      return res.json(mockCounts);
    }

    const [students, lecturers, staffs, programs, courses, departments, faculties, news, events] = await Promise.all([
      Student.countDocuments(),
      User.countDocuments({ role: 'lecturer' }),
      User.countDocuments({ role: 'staff' }),
      Program.countDocuments(),
      Course.countDocuments(),
      Department.countDocuments(),
      Faculty.countDocuments(),
      News.countDocuments(),
      Event.countDocuments()
    ]);
    res.json({
      students,
      lecturers,
      staffs,
      programs,
      courses,
      departments,
      faculties,
      news,
      events
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'Failed to fetch counts' });
  }
}
