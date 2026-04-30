import AdmissionApplication from '../models/AdmissionApplication.js';

// In-memory storage for when DB is not available
const memoryApplications = new Map();

// Check if DB is connected (we'll set this from server)
let dbConnected = true;

export const setDbConnected = (connected) => {
  dbConnected = connected;
};

// Get user's application
export const getApplication = async (req, res) => {
  try {
    if (!dbConnected) {
      const application = memoryApplications.get(req.user._id.toString());
      return res.json(application || null);
    }

    const application = await AdmissionApplication.findOne({ user: req.user._id });
    if (!application) {
      return res.json(null);
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create or update application
export const saveApplication = async (req, res) => {
  try {
    const { status, step, personalInfo, academicBackground, programSelection, documents } = req.body;

    if (!dbConnected) {
      const userId = req.user._id.toString();
      let application = memoryApplications.get(userId) || { user: req.user._id, status: 'draft', step: 1 };

      application.status = status || application.status;
      application.step = step || application.step;
      application.personalInfo = personalInfo || application.personalInfo || {};
      application.academicBackground = academicBackground || application.academicBackground || {};
      application.programSelection = programSelection || application.programSelection || {};
      application.documents = documents || application.documents || {};
      application.updatedAt = new Date();

      memoryApplications.set(userId, application);
      return res.json(application);
    }

    let application = await AdmissionApplication.findOne({ user: req.user._id });

    if (!application) {
      application = new AdmissionApplication({
        user: req.user._id,
        status: status || 'draft',
        step: step || 1,
        personalInfo: personalInfo || {},
        academicBackground: academicBackground || {},
        programSelection: programSelection || {},
        documents: documents || {}
      });
    } else {
      // Update existing
      application.status = status || application.status;
      application.step = step || application.step;
      if (personalInfo) application.personalInfo = { ...application.personalInfo, ...personalInfo };
      if (academicBackground) application.academicBackground = { ...application.academicBackground, ...academicBackground };
      if (programSelection) application.programSelection = { ...application.programSelection, ...programSelection };
      if (documents) application.documents = { ...application.documents, ...documents };
      application.updatedAt = new Date();
    }

    await application.save();
    res.json(application);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Application already exists for this user' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Submit application
export const submitApplication = async (req, res) => {
  try {
    if (!dbConnected) {
      const userId = req.user._id.toString();
      const application = memoryApplications.get(userId);

      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }

      // Validate required fields
      const { personalInfo, academicBackground, programSelection } = application;
      if (!personalInfo.fullName || !personalInfo.dateOfBirth || !personalInfo.gender ||
          !personalInfo.address || !personalInfo.phone ||
          !academicBackground.previousSchool || !academicBackground.qualification ||
          !academicBackground.grades ||
          !programSelection.program || !programSelection.department) {
        return res.status(400).json({ message: 'Please complete all required fields before submitting' });
      }

      application.status = 'submitted';
      application.submittedAt = new Date();
      memoryApplications.set(userId, application);

      return res.json({ message: 'Application submitted successfully', application });
    }

    const application = await AdmissionApplication.findOne({ user: req.user._id });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Validate required fields
    const { personalInfo, academicBackground, programSelection } = application;
    if (!personalInfo.fullName || !personalInfo.dateOfBirth || !personalInfo.gender ||
        !personalInfo.address || !personalInfo.phone ||
        !academicBackground.previousSchool || !academicBackground.qualification ||
        !academicBackground.grades ||
        !programSelection.program || !programSelection.department) {
      return res.status(400).json({ message: 'Please complete all required fields before submitting' });
    }

    application.status = 'submitted';
    application.submittedAt = new Date();
    await application.save();

    res.json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete application (for draft only)
export const deleteApplication = async (req, res) => {
  try {
    if (!dbConnected) {
      const userId = req.user._id.toString();
      const application = memoryApplications.get(userId);

      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }

      if (application.status === 'submitted') {
        return res.status(400).json({ message: 'Cannot delete submitted application' });
      }

      memoryApplications.delete(userId);
      return res.json({ message: 'Application deleted successfully' });
    }

    const application = await AdmissionApplication.findOne({ user: req.user._id });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.status === 'submitted') {
      return res.status(400).json({ message: 'Cannot delete submitted application' });
    }

    await AdmissionApplication.deleteOne({ _id: application._id });
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};