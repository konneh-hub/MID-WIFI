import axios from 'axios';

const API_BASE = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE || 'http://localhost:5002/api'
  : import.meta.env.VITE_API_BASE || '/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export function fetchNews() {
  return api.get('/news').then(res => Array.isArray(res.data) ? res.data : []).catch(() => []);
}

export function fetchCourses() {
  return api.get('/courses').then(res => Array.isArray(res.data) ? res.data : []).catch(() => []);
}

export function fetchDepartments() {
  return api.get('/departments').then(res => Array.isArray(res.data) ? res.data : []).catch(() => []);
}

export function fetchEvents() {
  return api.get('/events').then(res => Array.isArray(res.data) ? res.data : []).catch(() => []);
}

export function fetchFaculties() {
  return api.get('/faculties').then(res => Array.isArray(res.data) ? res.data : []).catch(() => []);
}

export function fetchPrograms() {
  return api.get('/programs').then(res => Array.isArray(res.data) ? res.data : []).catch(() => []);
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
