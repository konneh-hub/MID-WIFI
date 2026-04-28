import News from '../models/News.js';
import Course from '../models/Course.js';
import Department from '../models/Department.js';
import Event from '../models/Event.js';

export async function getNews(req, res) {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
}

export async function getCourses(req, res) {
  const courses = await Course.find().populate('department');
  res.json(courses);
}

export async function getDepartments(req, res) {
  const departments = await Department.find();
  res.json(departments);
}

export async function getEvents(req, res) {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
}

export async function submitContact(req, res) {
  const { name, email, message } = req.body;
  res.json({ message: 'Contact request received', data: { name, email, message } });
}
