import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <h4>About MIDWIFERY</h4>
          <p>Modern midwifery education shaped by research, community care, and a professional student experience.</p>
        </div>

        <div className="footer-category">
          <h5>Academics</h5>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/departments">Departments</NavLink>
          <NavLink to="/faculties">Faculties</NavLink>
          <NavLink to="/programs">Programs</NavLink>
        </div>

        <div className="footer-category">
          <h5>Admissions</h5>
          <NavLink to="/requirements">Requirements</NavLink>
          <NavLink to="/fees">Fees & Payments</NavLink>
          <NavLink to="/admissions">Admissions</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="footer-category">
          <h5>Research</h5>
          <NavLink to="/research-center">Research Center</NavLink>
          <NavLink to="/publications">Publications</NavLink>
          <NavLink to="/innovation">Innovation Hub</NavLink>
        </div>

        <div className="footer-category">
          <h5>Events</h5>
          <NavLink to="/news">Latest News</NavLink>
          <NavLink to="/events">Upcoming Events</NavLink>
          <NavLink to="/gallery">Media Gallery</NavLink>
          <NavLink to="/announcements">Announcements</NavLink>
        </div>

        <div className="footer-category">
          <h5>Quick Links</h5>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Create Account</NavLink>
          <NavLink to="/admissions">Apply</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="footer-category">
          <h5>About</h5>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/leadership">Leadership</NavLink>
          <NavLink to="/mission-vision">Mission & Vision</NavLink>
          <NavLink to="/innovation">Innovation</NavLink>
          <NavLink to="/research-center">Research Center</NavLink>
        </div>

        <div className="footer-category">
          <h5>Legal</h5>
          <NavLink to="/terms">Terms & Conditions</NavLink>
          <NavLink to="/privacy">Privacy Policy</NavLink>
          <NavLink to="/cookies">Cookie Policy</NavLink>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2026 MIDWIFERY University. Designed for modern healthcare education.</p>
        <div className="footer-bottom-right">
          <span className="footer-follow-label">Follow</span>
          <div className="social-links">
            <a href="/" aria-label="LinkedIn" className="social-icon">in</a>
            <a href="/" aria-label="Twitter" className="social-icon">t</a>
            <a href="/" aria-label="Instagram" className="social-icon">ig</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
