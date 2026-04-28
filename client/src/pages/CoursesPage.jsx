import { useEffect, useState } from 'react';
import { fetchCourses, fetchDepartments } from '../services/api.js';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    fetchCourses().then(setCourses).catch(console.error);
    fetchDepartments().then(setDepartments).catch(console.error);
  }, []);

  const filteredCourses = selectedDepartment
    ? courses.filter(course => course.department?._id === selectedDepartment)
    : courses;

  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Courses Offered</h1>
          <p>Discover course programs available at MID-WIFI.</p>
        </div>
        <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
          <option value="">All departments</option>
          {departments.map(dept => (
            <option key={dept._id} value={dept._id}>{dept.name}</option>
          ))}
        </select>
      </section>
      <div className="section-grid">
        {filteredCourses.map(course => (
          <article key={course._id} className="card">
            <h3>{course.title}</h3>
            <p>{course.description || 'A strong program built for today’s careers.'}</p>
            <p><strong>{course.code}</strong> • {course.department?.name || 'General Studies'}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
