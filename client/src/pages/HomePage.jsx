import { useEffect, useState } from 'react';
import { fetchNews, fetchCourses, fetchCounts } from '../services/api.js';
import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import Card from '../components/Card.jsx';
import StatCard from '../components/StatCard.jsx';
import buildingImg from '../assets/building.jpg';
import campusImg from '../assets/campus.jpg';
import entrepreneurshipImg from '../assets/Entrepreneurship.jpg';
import studentsImg from '../assets/students.avif';
import photo1Img from '../assets/Photo1.jpg';

const features = [
  {
    icon: '🎓',
    title: 'Academically Rigorous',
    description: 'Programs designed for deep learning, critical thinking, and professional readiness.'
  },
  {
    icon: '🧪',
    title: 'Research Excellence',
    description: 'Hands-on research opportunities with faculty support and industry collaboration.'
  },
  {
    icon: '🌍',
    title: 'Global Community',
    description: 'A welcoming campus culture with international partnerships and student support.'
  },
  {
    icon: '💼',
    title: 'Career Focused',
    description: 'Career guidance, internships, and future-ready skills for every pathway.'
  }
];

const testimonials = [
  {
    name: 'Amina Sillah',
    role: 'Clinical Midwifery Student',
    quote: 'MIDWIFERY University supported my growth with purpose-driven teaching and a truly modern campus experience.'
  },
  {
    name: 'Jonah Kamara',
    role: 'Postgraduate Research Fellow',
    quote: 'The mentoring and research networks here helped me shape a meaningful healthcare career.'
  },
  {
    name: 'Grace Conteh',
    role: 'Campus Ambassador',
    quote: 'The community is bold, warm, and focused on building leaders for the healthcare industry.'
  }
];

function HomePage() {
  const [news, setNews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    Promise.all([fetchNews(), fetchCourses(), fetchCounts()])
      .then(([newsData, coursesData, countsData]) => {
        setNews(newsData || []);
        setCourses(coursesData || []);
        setCounts(countsData || {});
      })
      .catch(err => {
        console.error('HomePage: fetch error', err);
      });
  }, []);

  useEffect(() => {
    const refreshCounts = () => {
      fetchCounts()
        .then((countsData) => setCounts(countsData || {}))
        .catch((err) => console.error('HomePage: refresh counts error', err));
    };

    const intervalId = setInterval(refreshCounts, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="page-shell">
      <Hero backgroundImage={buildingImg}>
        <div className="hero-copy">
          <span className="hero-eyebrow">Leading Midwifery Education</span>
          <h1>Inspiring a new generation of healthcare leaders.</h1>
          <p className="hero-text">MIDWIFERY University blends academic excellence with compassionate care to prepare graduates for a brighter, healthier tomorrow.</p>
          <div className="hero-actions">
            <a href="/admissions" className="btn btn-primary">Apply Now</a>
            <a href="/programs" className="btn btn-secondary">Explore Programs</a>
          </div>
        </div>
      </Hero>

      <Section
        eyebrow="About MIDWIFERY University"
        title="Where modern healthcare learning meets thoughtful leadership."
        subtitle="Our university combines rigorous academic programs, research-led faculty, and world-class student support to develop the next generation of midwives and healthcare professionals."
        split={true}
      >
        <Card className="about-card" title="About MIDWIFERY University" description="MIDWIFERY University blends hands-on clinical training with research excellence, leadership development, and global community engagement.">
          <ul className="about-list">
            <li>Structured programs aligned to real career pathways</li>
            <li>Hands-on clinical learning and lab experiences</li>
            <li>Community engagement, mentorship, and global partnerships</li>
          </ul>
        </Card>
        <Card
          image={campusImg}
          title="Campus Life"
          description="Supportive learning spaces, modern campus facilities, and an inspiring community for every future health professional."
          className="about-card about-image-card"
        />
      </Section>

      <Section
        eyebrow="Why MIDWIFERY University"
        title="Built for career-ready healthcare learning."
      >
        <div className="content-section">
          {features.map(item => (
            <Card
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Programs & Courses"
        title="Explore our signature academic pathways."
        subtitle="Flexible program types with targeted durations for undergraduate, postgraduate, and professional learners."
      >
        <div className="content-section">
          <Card
            title="Programs"
            description={`MIDWIFERY University offers ${counts.programs ?? 'many'} programs across clinical, research, and leadership fields.`}
          />
          <Card
            title="Courses"
            description={`Choose from ${counts.courses ?? 'many'} courses built for applied midwifery, maternal health, and community care.`}
          />
        </div>
        <div className="content-section">
          {courses.length ? (
            courses.slice(0, 6).map(course => (
              <Card
                key={course._id}
                title={course.title}
                description={course.description || 'A focused course designed for career-ready development.'}
                link={`/courses/${course._id}`}
              >
                <div className="program-card-meta">
                  <span>{course.code || 'Course Code'}</span>
                  <span>{course.faculty || 'Faculty'}</span>
                </div>
              </Card>
            ))
          ) : (
            [
              {
                title: 'Undergraduate Tracks',
                description: 'Comprehensive degrees with clinical placements and strong professional support.'
              },
              {
                title: 'Postgraduate Options',
                description: 'Advanced pathways in research, leadership, and specialized healthcare practice.'
              },
              {
                title: 'Certificate Courses',
                description: 'Short-term career-ready courses focused on essential midwifery and maternal health skills.'
              }
            ].map((item) => (
              <Card key={item.title} title={item.title} description={item.description} />
            ))
          )}
        </div>
      </Section>

      <Section
        eyebrow="Campus Metrics"
        title="Our growth in real numbers."
        subtitle="See the totals that show the size and strength of our student community, academic offerings, and faculty network."
      >
        <div className="stat-grid">
          <StatCard
            icon="🎓"
            target={counts.students || 0}
            label="Students enrolled"
          />
          <StatCard
            icon="📚"
            target={counts.courses || 0}
            label="Courses available"
          />
          <StatCard
            icon="🏛️"
            target={counts.faculties || 0}
            label="Academic faculties"
          />
          <StatCard
            icon="🏢"
            target={counts.departments || 0}
            label="Departments"
          />
          <StatCard
            icon="🧑‍💼"
            target={counts.staffs || 0}
            label="Staff members"
          />
          <StatCard
            icon="🧠"
            target={counts.programs || 0}
            label="Programs offered"
          />
        </div>
      </Section>

      <Section
        eyebrow="Latest News"
        title="Stay informed with the latest campus updates."
      >
        <div className="content-section">
          {news.slice(0, 4).map(item => (
            <Card
              key={item._id}
              image={photo1Img}
              title={item.title}
              description={item.summary || 'Read the latest announcement from the university community.'}
              link="/news"
              className="image-card"
            />
          ))}
        </div>
      </Section>

      <section className="section section-media-highlights">
        <div className="media-highlight-row">
          <div className="media-highlight-card" style={{ backgroundImage: `url(${entrepreneurshipImg})` }}>
            <div>
              <span>Entrepreneurship</span>
              <strong>Launch your ideas from campus to impact.</strong>
            </div>
          </div>
          <div className="media-highlight-card" style={{ backgroundImage: `url(${studentsImg})` }}>
            <div>
              <span>Student Life</span>
              <strong>Experience community, support, and belonging.</strong>
            </div>
          </div>
          <div className="media-highlight-card" style={{ backgroundImage: `url(${photo1Img})` }}>
            <div>
              <span>Innovation</span>
              <strong>Advance research with hands-on labs and mentorship.</strong>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Student Stories"
        title="Trusted by students across every stage of their journey."
      >
        <div className="content-section">
          {testimonials.map(item => (
            <Card
              key={item.name}
              title={`"${item.quote}"`}
            >
              <div className="testimonial-avatar">{item.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="testimonial-meta">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default HomePage;
