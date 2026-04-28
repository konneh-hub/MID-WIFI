import News from '../models/News.js';
import Course from '../models/Course.js';
import Event from '../models/Event.js';

export async function createNews(req, res) {
  const { title, summary, content } = req.body;
  const news = await News.create({ title, summary, content });
  res.status(201).json(news);
}

export async function updateCourse(req, res) {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json(course);
}

export async function deleteEvent(req, res) {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json({ message: 'Event deleted' });
}
