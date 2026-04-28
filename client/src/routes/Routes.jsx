import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import CoursesPage from '../pages/CoursesPage.jsx';
import DepartmentsPage from '../pages/DepartmentsPage.jsx';
import NewsPage from '../pages/NewsPage.jsx';
import EventsPage from '../pages/EventsPage.jsx';
import AdmissionsPage from '../pages/AdmissionsPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import TermsPage from '../pages/TermsPage.jsx';
import PolicyPage from '../pages/PolicyPage.jsx';
import FQAPage from '../pages/FQAPage.jsx';

function AppRoutes() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-brand">MID-WIFI University</div>
        <nav className="site-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/departments">Departments</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/admissions">Admissions</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main className="site-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/fqa" element={<FQAPage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <p>MID-WIFI University • Empowering education for a connected future.</p>
            <p>Contact: info@midwifi.edu | +1 555 0100</p>
          </div>
          <div className="footer-bottom">
            <div className="footer-links">
              <NavLink to="/terms">Terms & Conditions</NavLink>
              <NavLink to="/policy">Policy Control</NavLink>
              <NavLink to="/fqa">FQA</NavLink>
            </div>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <span className="social-icon">📘</span> Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <span className="social-icon">🐦</span> Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <span className="social-icon">🔗</span> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppRoutes;
