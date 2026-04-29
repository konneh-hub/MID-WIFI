import News from '../models/News.js';
import Course from '../models/Course.js';
import Event from '../models/Event.js';
import Department from '../models/Department.js';
import Faculty from '../models/Faculty.js';
import Program from '../models/Program.js';

export async function createNews(req, res) {
  const { title, summary, content } = req.body;
  const news = await News.create({ title, summary, content });
  res.status(201).json(news);
}

export async function updateNews(req, res) {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!news) {
    return res.status(404).json({ error: 'News not found' });
  }
  res.json(news);
}

export async function deleteNews(req, res) {
  const news = await News.findByIdAndDelete(req.params.id);
  if (!news) {
    return res.status(404).json({ error: 'News not found' });
  }
  res.json({ message: 'News deleted' });
}

export async function createCourse(req, res) {
  const course = await Course.create(req.body);
  res.status(201).json(course);
}

export async function updateCourse(req, res) {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json(course);
}

export async function deleteCourse(req, res) {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json({ message: 'Course deleted' });
}

export async function createDepartment(req, res) {
  const department = await Department.create(req.body);
  res.status(201).json(department);
}

export async function updateDepartment(req, res) {
  const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!department) {
    return res.status(404).json({ error: 'Department not found' });
  }
  res.json(department);
}

export async function deleteDepartment(req, res) {
  const department = await Department.findByIdAndDelete(req.params.id);
  if (!department) {
    return res.status(404).json({ error: 'Department not found' });
  }
  res.json({ message: 'Department deleted' });
}

export async function createEvent(req, res) {
  const event = await Event.create(req.body);
  res.status(201).json(event);
}

export async function updateEvent(req, res) {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
}

export async function deleteEvent(req, res) {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json({ message: 'Event deleted' });
}

export async function createFaculty(req, res) {
  const faculty = await Faculty.create(req.body);
  res.status(201).json(faculty);
}

export async function updateFaculty(req, res) {
  const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!faculty) {
    return res.status(404).json({ error: 'Faculty not found' });
  }
  res.json(faculty);
}

export async function deleteFaculty(req, res) {
  const faculty = await Faculty.findByIdAndDelete(req.params.id);
  if (!faculty) {
    return res.status(404).json({ error: 'Faculty not found' });
  }
  res.json({ message: 'Faculty deleted' });
}

export async function createProgram(req, res) {
  const program = await Program.create(req.body);
  res.status(201).json(program);
}

export async function updateProgram(req, res) {
  const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!program) {
    return res.status(404).json({ error: 'Program not found' });
  }
  res.json(program);
}

export async function deleteProgram(req, res) {
  const program = await Program.findByIdAndDelete(req.params.id);
  if (!program) {
    return res.status(404).json({ error: 'Program not found' });
  }
  res.json({ message: 'Program deleted' });
}
