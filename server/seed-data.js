import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Department from './src/models/Department.js';
import Course from './src/models/Course.js';
import Event from './src/models/Event.js';
import Faculty from './src/models/Faculty.js';
import Program from './src/models/Program.js';
import User from './src/models/User.js';
import Media from './src/models/Media.js';
import bcrypt from 'bcryptjs';

dotenv.config();

async function seedData() {
  try {
    // Use localhost for connecting from host machine, or docker hostname from container
    const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/midwifi?authSource=admin';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Create default admin user
    console.log('Creating admin user...');
    try {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      console.log('Password hashed');
      const adminUser = await User.findOneAndUpdate(
        { email: 'admin@midwifi.edu' },
        {
          name: 'Administrator',
          email: 'admin@midwifi.edu',
          password: hashedPassword,
          role: 'admin'
        },
        { upsert: true, new: true }
      );
      console.log('✓ Admin user created/updated:', adminUser.email);
    } catch (error) {
      console.error('✗ Failed to create admin user:', error.message);
    }

    // Create faculties
    const faculties = await Faculty.insertMany([
      {
        name: 'Faculty of Science and Technology',
        description: 'Advancing knowledge in science, engineering, and technology.',
        dean: 'Dr. Sarah Johnson',
        established: new Date('1995-09-01')
      },
      {
        name: 'Faculty of Business and Management',
        description: 'Developing future leaders in business and entrepreneurship.',
        dean: 'Prof. Michael Chen',
        established: new Date('1998-09-01')
      },
      {
        name: 'Faculty of Arts and Humanities',
        description: 'Exploring human culture, history, and creative expression.',
        dean: 'Dr. Emily Rodriguez',
        established: new Date('1990-09-01')
      }
    ]);
    console.log(`✓ Created ${faculties.length} faculties`);

    // Create departments
    const depts = await Department.insertMany([
      {
        name: 'Computer Science',
        faculty: faculties[0]._id,
        description: 'Learn programming, algorithms, and software development.'
      },
      {
        name: 'Engineering',
        faculty: faculties[0]._id,
        description: 'Explore civil, mechanical, and electrical engineering disciplines.'
      },
      {
        name: 'Business Administration',
        faculty: faculties[1]._id,
        description: 'Master business management, finance, and entrepreneurship.'
      },
      {
        name: 'Liberal Arts',
        faculty: faculties[2]._id,
        description: 'Study humanities, sciences, and social disciplines.'
      }
    ]);
    console.log(`✓ Created ${depts.length} departments`);

    // Create courses
    const courses = await Course.insertMany([
      {
        title: 'Introduction to Programming',
        code: 'CS101',
        department: depts[0]._id,
        faculty: faculties[0]._id,
        description: 'Learn Python and JavaScript fundamentals.',
        credits: 3
      },
      {
        title: 'Data Structures',
        code: 'CS201',
        department: depts[0]._id,
        faculty: faculties[0]._id,
        description: 'Master arrays, linked lists, trees, and graphs.',
        credits: 4
      },
      {
        title: 'Web Development',
        code: 'CS301',
        department: depts[0]._id,
        faculty: faculties[0]._id,
        description: 'Build modern web applications with React and Node.js.',
        credits: 3
      },
      {
        title: 'Structural Engineering',
        code: 'ENG101',
        department: depts[1]._id,
        faculty: faculties[0]._id,
        description: 'Design and analyze building structures.',
        credits: 4
      },
      {
        title: 'Thermodynamics',
        code: 'ENG201',
        department: depts[1]._id,
        faculty: faculties[0]._id,
        description: 'Study heat and energy systems.',
        credits: 3
      },
      {
        title: 'Business Management',
        code: 'BUS101',
        department: depts[2]._id,
        faculty: faculties[1]._id,
        description: 'Learn organizational and management principles.',
        credits: 3
      },
      {
        title: 'Financial Accounting',
        code: 'BUS201',
        department: depts[2]._id,
        faculty: faculties[1]._id,
        description: 'Master accounting principles and financial reporting.',
        credits: 3
      },
      {
        title: 'World History',
        code: 'LA101',
        department: depts[3]._id,
        faculty: faculties[2]._id,
        description: 'Explore major events and movements in world history.',
        credits: 3
      }
    ]);
    console.log(`✓ Created ${courses.length} courses`);

    // Create events
    const events = await Event.insertMany([
      {
        title: 'Orientation Week',
        description: 'Welcome new students with campus tours and activities.',
        location: 'Main Campus',
        date: new Date('2026-08-25')
      },
      {
        title: 'Hackathon 2026',
        description: 'Compete in a 24-hour coding challenge.',
        location: 'Tech Building',
        date: new Date('2026-09-15')
      },
      {
        title: 'Guest Lecture: AI in Industry',
        description: 'Learn from tech industry leaders about artificial intelligence.',
        location: 'Auditorium',
        date: new Date('2026-10-10')
      },
      {
        title: 'Career Fair',
        description: 'Network with leading companies and explore job opportunities.',
        location: 'Student Center',
        date: new Date('2026-10-20')
      },
      {
        title: 'Midterm Exams',
        description: 'All midterm examinations.',
        location: 'Various locations',
        date: new Date('2026-10-01')
      },
      {
        title: 'Sports Festival',
        description: 'Annual inter-department sports competition.',
        location: 'Sports Complex',
        date: new Date('2026-11-05')
      },
      {
        title: 'Graduation Ceremony',
        description: 'Celebrate graduates of the class 2026.',
        location: 'Main Auditorium',
        date: new Date('2026-12-10')
      }
    ]);
    console.log(`✓ Created ${events.length} events`);

    // Create programs
    const programs = await Program.insertMany([
      {
        title: 'Bachelor of Computer Science',
        code: 'BCS',
        type: 'undergraduate',
        duration: 4,
        durationUnit: 'years',
        faculty: faculties[0]._id,
        department: depts[0]._id,
        description: 'Comprehensive program in computer science fundamentals and applications.',
        requirements: 'High school diploma with mathematics background.'
      },
      {
        title: 'Master of Business Administration',
        code: 'MBA',
        type: 'masters',
        duration: 2,
        durationUnit: 'years',
        faculty: faculties[1]._id,
        department: depts[2]._id,
        description: 'Advanced business education for aspiring leaders.',
        requirements: 'Bachelor\'s degree in business or related field.'
      },
      {
        title: 'Doctor of Philosophy in Engineering',
        code: 'PhD-ENG',
        type: 'phd',
        duration: 5,
        durationUnit: 'years',
        faculty: faculties[0]._id,
        department: depts[1]._id,
        description: 'Research-focused program in engineering disciplines.',
        requirements: 'Master\'s degree in engineering.'
      },
      {
        title: 'Diploma in Liberal Arts',
        code: 'DLA',
        type: 'diploma',
        duration: 2,
        durationUnit: 'years',
        faculty: faculties[2]._id,
        department: depts[3]._id,
        description: 'Foundation program in humanities and social sciences.',
        requirements: 'High school diploma.'
      },
      {
        title: 'Certificate in Web Development',
        code: 'CERT-WD',
        type: 'certificate',
        duration: 6,
        durationUnit: 'months',
        faculty: faculties[0]._id,
        department: depts[0]._id,
        description: 'Practical skills in modern web development.',
        requirements: 'Basic computer literacy.'
      }
    ]);
    console.log(`✓ Created ${programs.length} programs`);

    // Create media
    const mediaItems = await Media.insertMany([
      {
        title: 'Campus Welcome Event',
        description: 'Freshmen orientation and welcome ceremony',
        category: 'Campus Life',
        fileUrl: '/uploads/sample-campus.jpg', // placeholder
        fileType: 'image'
      },
      {
        title: 'Research Symposium',
        description: 'Annual research presentation by faculty and students',
        category: 'Academic Events',
        fileUrl: '/uploads/sample-research.jpg',
        fileType: 'image'
      },
      {
        title: 'Community Outreach Program',
        description: 'Volunteering at local schools and charities',
        category: 'Community Impact',
        fileUrl: '/uploads/sample-community.jpg',
        fileType: 'image'
      },
      {
        title: 'Graduation Ceremony 2025',
        description: 'Celebrating our graduates',
        category: 'Academic Events',
        fileUrl: '/uploads/sample-graduation.mp4',
        fileType: 'video'
      }
    ]);
    console.log(`✓ Created ${mediaItems.length} media items`);

    console.log('\n✅ All seed data created successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
