import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user from localStorage (set by login)
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        // Fetch application from API
        const response = await axios.get('http://localhost:4000/api/application', { withCredentials: true });
        setApplication(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // If not authenticated, redirect to login
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleStartApplication = () => {
    const newApplication = { status: 'draft', data: {}, step: 1 };
    localStorage.setItem('application', JSON.stringify(newApplication));
    setApplication(newApplication);
    navigate('/application');
  };

  const handleContinueApplication = () => {
    navigate('/application');
  };

  const handleViewApplication = () => {
    navigate('/application');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome back, {user.name}!</h1>
        <div className="application-card">
          <h2>Application Status</h2>
          {application ? (
            <div>
              <p>Status: <span className={`status-${application.status}`}>{application.status}</span></p>
              {application.status === 'draft' && (
                <button className="btn-primary" onClick={handleContinueApplication}>
                  Continue Application
                </button>
              )}
              {application.status === 'submitted' && (
                <div>
                  <p>Application Submitted</p>
                  <button className="btn-secondary" onClick={handleViewApplication}>
                    View Application
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p>No application started yet.</p>
              <button className="btn-primary" onClick={handleStartApplication}>
                Start Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;