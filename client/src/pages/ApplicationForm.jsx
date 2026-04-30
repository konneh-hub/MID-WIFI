import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {},
    academic: {},
    program: {},
    documents: {},
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/application', { withCredentials: true });
        if (response.data) {
          setApplication(response.data);
          setCurrentStep(response.data.step || 1);
          setFormData({
            personal: response.data.personalInfo || {},
            academic: response.data.academicBackground || {},
            program: response.data.programSelection || {},
            documents: response.data.documents || {}
          });
        } else {
          // No application exists, create draft
          const newApplication = { status: 'draft', step: 1 };
          setApplication(newApplication);
        }
      } catch (error) {
        console.error('Error fetching application:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          navigate('/dashboard');
        }
      }
    };

    fetchApplication();
  }, [navigate]);

  const saveProgress = async () => {
    try {
      const dataToSend = {
        status: application.status,
        step: currentStep,
        personalInfo: formData.personal,
        academicBackground: formData.academic,
        programSelection: formData.program,
        documents: formData.documents
      };

      const response = await axios.post('http://localhost:4000/api/application', dataToSend, { withCredentials: true });
      setApplication(response.data);
    } catch (error) {
      console.error('Error saving application:', error);
      // Handle error - maybe show message
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        saveProgress();
      }
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.personal.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.personal.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
        if (!formData.personal.gender) newErrors.gender = 'Gender is required';
        if (!formData.personal.address) newErrors.address = 'Address is required';
        if (!formData.personal.phone) newErrors.phone = 'Phone Number is required';
        break;
      case 2:
        if (!formData.academic.previousSchool) newErrors.previousSchool = 'Previous School is required';
        if (!formData.academic.qualification) newErrors.qualification = 'Qualification is required';
        if (!formData.academic.grades) newErrors.grades = 'Grades are required';
        break;
      case 3:
        if (!formData.program.program) newErrors.program = 'Program selection is required';
        if (!formData.program.department) newErrors.department = 'Department selection is required';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/application/submit', {}, { withCredentials: true });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle error
    }
  };

  const updateFormData = (section, data) => {
    setFormData({ ...formData, [section]: { ...formData[section], ...data } });
  };

  const steps = [
    { id: 1, title: 'Personal Information' },
    { id: 2, title: 'Academic Background' },
    { id: 3, title: 'Program Selection' },
    { id: 4, title: 'Documents' },
    { id: 5, title: 'Review & Submit' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h2>Personal Information</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.personal.fullName || ''}
              onChange={(e) => updateFormData('personal', { fullName: e.target.value })}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
            <input
              type="date"
              placeholder="Date of Birth"
              value={formData.personal.dateOfBirth || ''}
              onChange={(e) => updateFormData('personal', { dateOfBirth: e.target.value })}
              className={errors.dateOfBirth ? 'error' : ''}
            />
            {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth}</p>}
            <select
              value={formData.personal.gender || ''}
              onChange={(e) => updateFormData('personal', { gender: e.target.value })}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="error-text">{errors.gender}</p>}
            <input
              type="text"
              placeholder="Address"
              value={formData.personal.address || ''}
              onChange={(e) => updateFormData('personal', { address: e.target.value })}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.personal.phone || ''}
              onChange={(e) => updateFormData('personal', { phone: e.target.value })}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2>Academic Background</h2>
            <input
              type="text"
              placeholder="Previous School"
              value={formData.academic.previousSchool || ''}
              onChange={(e) => updateFormData('academic', { previousSchool: e.target.value })}
            />
            <input
              type="text"
              placeholder="Qualification"
              value={formData.academic.qualification || ''}
              onChange={(e) => updateFormData('academic', { qualification: e.target.value })}
            />
            <textarea
              placeholder="Grades / Results"
              value={formData.academic.grades || ''}
              onChange={(e) => updateFormData('academic', { grades: e.target.value })}
            />
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h2>Program Selection</h2>
            <select
              value={formData.program.program || ''}
              onChange={(e) => updateFormData('program', { program: e.target.value })}
            >
              <option value="">Select Program</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
            <select
              value={formData.program.department || ''}
              onChange={(e) => updateFormData('program', { department: e.target.value })}
            >
              <option value="">Select Department</option>
              <option value="computer-science">Computer Science</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
            </select>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h2>Documents</h2>
            <p>Upload your documents (UI only, no backend)</p>
            <input type="file" placeholder="Certificate" />
            <input type="file" placeholder="Transcript" />
            <input type="file" placeholder="ID" />
          </div>
        );
      case 5:
        return (
          <div className="form-step">
            <h2>Review & Submit</h2>
            <div className="review-section">
              <h3>Personal Information</h3>
              <p>Full Name: {formData.personal.fullName}</p>
              <p>Date of Birth: {formData.personal.dateOfBirth}</p>
              <p>Gender: {formData.personal.gender}</p>
              <p>Address: {formData.personal.address}</p>
              <p>Phone: {formData.personal.phone}</p>
            </div>
            <div className="review-section">
              <h3>Academic Background</h3>
              <p>School: {formData.academic.previousSchool}</p>
              <p>Qualification: {formData.academic.qualification}</p>
              <p>Grades: {formData.academic.grades}</p>
            </div>
            <div className="review-section">
              <h3>Program Selection</h3>
              <p>Program: {formData.program.program}</p>
              <p>Department: {formData.program.department}</p>
            </div>
            <button className="btn-primary" onClick={handleSubmit}>
              Submit Application
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="application-form-container">
      <div className="step-indicator">
        {steps.map((step) => (
          <div key={step.id} className={`step ${currentStep >= step.id ? 'active' : ''}`}>
            <span>{step.id}</span>
            <p>{step.title}</p>
          </div>
        ))}
      </div>
      <div className="form-content">
        {renderStep()}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button className="btn-secondary" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep < 5 && (
            <button className="btn-primary" onClick={handleNext}>
              Next
            </button>
          )}
          {currentStep < 5 && (
            <button className="btn-outline" onClick={saveProgress}>
              Save & Continue Later
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;