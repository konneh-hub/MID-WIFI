import { useEffect, useState } from 'react';
import { fetchDepartments } from '../services/api.js';

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments().then(setDepartments).catch(console.error);
  }, []);

  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Faculties & Departments</h1>
          <p>Browse the academic departments that shape our curriculum.</p>
        </div>
      </section>
      <div className="section-grid">
        {departments.map(dept => (
          <article key={dept._id} className="card">
            <h3>{dept.name}</h3>
            <p>{dept.description || 'Department overview will be added soon.'}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default DepartmentsPage;
