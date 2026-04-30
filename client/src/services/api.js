import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export function fetchNews() {
  return api.get('/news').then(res => res.data);
}

export function fetchCourses() {
  return api.get('/courses').then(res => res.data);
}

export function fetchDepartments() {
  return api.get('/departments').then(res => res.data);
}

export function fetchEvents() {
  return api.get('/events').then(res => res.data);
}

export function fetchFaculties() {
  return api.get('/faculties').then(res => res.data);
}

export function fetchPrograms() {
  return api.get('/programs').then(res => res.data);
}

export function fetchMedia() {
  return api.get('/media').then(res => res.data);
}

export function fetchMediaByCategory(category) {
  return api.get(`/media/category/${category}`).then(res => res.data);
}

export function fetchCounts() {
  return api.get('/counts').then(res => res.data);
}

export function sendContact(payload) {
  return api.post('/contact', payload).then(res => res.data);
}
