import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navGroups = [
  {
    label: 'Home',
    key: 'home',
    to: '/',
    links: [
      { to: '/', label: 'Home' }
    ]
  },
  {
    label: 'About',
    key: 'about',
    to: '/about',
    links: [
      { to: '/about', label: 'Overview' },
      { to: '/mission-vision', label: 'Mission & Vision' },
      { to: '/leadership', label: 'Leadership' },
      { to: '/history', label: 'History & Heritage' },
      { to: '/partnerships', label: 'Global Partnership' }
    ]
  },
  {
    label: 'Admission',
    key: 'admission',
    to: '/admissions',
    links: [
      {
        label: 'Undergraduate',
        sublinks: [
          { to: '/programs', label: 'Programs' },
          { to: '/departments', label: 'Departments' },
          { to: '/faculties', label: 'Faculties' },
          { to: '/courses', label: 'Courses' }
        ]
      },
      {
        label: 'Postgraduate',
        sublinks: [
          { to: '/programs', label: 'Programs' },
          { to: '/departments', label: 'Departments' },
          { to: '/faculties', label: 'Faculties' },
          { to: '/courses', label: 'Courses' }
        ]
      },
      { to: '/requirements', label: 'Requirements' },
      { to: '/fees', label: 'Fees & Payments' }
    ]
  },
  {
    label: 'Research',
    key: 'research',
    to: '/research-center',
    links: [
      { to: '/research-center', label: 'Research Center' },
      { to: '/publications', label: 'Publications' },
      { to: '/innovation', label: 'Innovation Hub' }
    ]
  },
  {
    label: 'Events',
    key: 'events',
    to: '/events',
    links: [
      { to: '/news', label: 'Latest News' },
      { to: '/events', label: 'Upcoming Events' },
      { to: '/gallery', label: 'Media Gallery' },
      { to: '/announcements', label: 'Announcements' }
    ]
  },
  {
    label: 'Quick Links',
    key: 'quicklinks',
    to: '/admissions',
    links: [
      { to: '/login', label: 'Login' },
      { to: '/register', label: 'Create Account' },
      { to: '/admissions', label: 'Apply' },
      { to: '/contact', label: 'Contact' }
    ]
  }
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');
  const [openSubmenu, setOpenSubmenu] = useState('');
  const [hoveredItem, setHoveredItem] = useState('');

  const toggleDropdown = (key) => {
    setActiveDropdown((current) => (current === key ? '' : key));
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenu((current) => (current === label ? '' : label));
  };

  const closeMenu = () => {
    setOpen(false);
    setActiveDropdown('');
    setOpenSubmenu('');
    setHoveredItem('');
  };

  const handleMouseEnter = (key) => {
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    setActiveDropdown('');
    setHoveredItem('');
  };

  const handleSubMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleSubMouseLeave = () => {
    setHoveredItem('');
  };

  return (
    <header className="site-header">
      <NavLink to="/" className="site-brand" onClick={closeMenu} end>
        MIDWIFERY
      </NavLink>

      <button
        className="nav-toggle"
        aria-expanded={open}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="nav-toggle-icon" />
      </button>

      <nav className={open ? 'site-nav open' : 'site-nav'} aria-label="Primary navigation">
        {navGroups.map((group) => {
          if (group.key === 'home') {
            return (
              <NavLink key={group.key} to="/" end onClick={closeMenu}>
                {group.label}
              </NavLink>
            );
          }

          const groupTarget = group.to || (group.links && group.links[0]?.to) || '/';

          return (
            <div
              className="dropdown"
              key={group.key}
              onMouseEnter={() => handleMouseEnter(group.key)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="dropdown-header">
                <NavLink
                  to={groupTarget}
                  className={({ isActive }) => isActive ? 'dropdown-link active' : 'dropdown-link'}
                  onClick={closeMenu}
                >
                  {group.label}
                </NavLink>
                <button
                  type="button"
                  className="dropdown-toggle"
                  aria-expanded={activeDropdown === group.key}
                  aria-label={activeDropdown === group.key ? `Collapse ${group.label}` : `Expand ${group.label}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(group.key);
                  }}
                >
                  <span className="dropdown-arrow">▼</span>
                </button>
              </div>

              <div className={`dropdown-menu ${activeDropdown === group.key ? 'show' : ''}`}>
                {group.links.map((link, index) => {
                  if (link.sublinks) {
                    return (
                      <div
                        key={index}
                        className="dropdown-submenu"
                        onMouseEnter={() => handleSubMouseEnter(link.label)}
                        onMouseLeave={handleSubMouseLeave}
                      >
                        <button
                          type="button"
                          className="dropdown-submenu-title"
                          aria-expanded={openSubmenu === link.label}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleSubmenu(link.label);
                          }}
                        >
                          {link.label}
                          <span className="dropdown-arrow">›</span>
                        </button>
                        <div className={`dropdown-submenu-menu ${hoveredItem === link.label || openSubmenu === link.label ? 'show' : ''}`}>
                          {link.sublinks.map((sublink) => (
                            <NavLink key={sublink.to} to={sublink.to} onClick={closeMenu}>
                              {sublink.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <NavLink key={link.to} to={link.to} onClick={closeMenu}>
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </header>
  );
}

export default Navbar;
