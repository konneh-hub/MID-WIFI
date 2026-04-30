import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import MissionVisionPage from '../pages/MissionVisionPage.jsx';
import LeadershipPage from '../pages/LeadershipPage.jsx';
import HistoryPage from '../pages/HistoryPage.jsx';
import PartnershipsPage from '../pages/PartnershipsPage.jsx';
import UndergraduatePage from '../pages/UndergraduatePage.jsx';
import PostgraduatePage from '../pages/PostgraduatePage.jsx';
import RequirementsPage from '../pages/RequirementsPage.jsx';
import FeesPage from '../pages/FeesPage.jsx';
import ResearchCenterPage from '../pages/ResearchCenterPage.jsx';
import PublicationsPage from '../pages/PublicationsPage.jsx';
import InnovationPage from '../pages/InnovationPage.jsx';
import GalleryPage from '../pages/GalleryPage.jsx';
import AnnouncementsPage from '../pages/AnnouncementsPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import ApplicationForm from '../pages/ApplicationForm.jsx';
import CoursesPage from '../pages/CoursesPage.jsx';
import DepartmentsPage from '../pages/DepartmentsPage.jsx';
import FacultyPage from '../pages/FacultyPage.jsx';
import ProgramsPage from '../pages/ProgramsPage.jsx';
import NewsPage from '../pages/NewsPage.jsx';
import EventsPage from '../pages/EventsPage.jsx';
import AdmissionsPage from '../pages/AdmissionsPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import TermsPage from '../pages/TermsPage.jsx';
import PolicyPage from '../pages/PolicyPage.jsx';
import CookiesPage from '../pages/CookiesPage.jsx';
import FQAPage from '../pages/FQAPage.jsx';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    const animatedElements = document.querySelectorAll(
      'section, .card, .stat-card, .program-card, .feature-card, .testimonial-card, .news-card, .media-highlight-card, .media-card'
    );

    animatedElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="site-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mission-vision" element={<MissionVisionPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/partnerships" element={<PartnershipsPage />} />
          <Route path="/undergraduate" element={<UndergraduatePage />} />
          <Route path="/postgraduate" element={<PostgraduatePage />} />
          <Route path="/requirements" element={<RequirementsPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/research-center" element={<ResearchCenterPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/innovation" element={<InnovationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/application" element={<ApplicationForm />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/faculties" element={<FacultyPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/fqa" element={<FQAPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppRoutes;
