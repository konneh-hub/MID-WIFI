import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CookiesPage() {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (cookieChoice === 'accepted') {
      setAccepted(true);
    } else if (cookieChoice === 'rejected') {
      setRejected(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setAccepted(true);
    navigate('/');
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setRejected(true);
    // Still allow navigation but with limited functionality
    navigate('/');
  };

  if (accepted) {
    return (
      <div className="cookies-status">
        <div className="container">
          <h1>Cookies Accepted</h1>
          <p>You have accepted our cookie policy. You can continue using our website with full functionality.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">Continue to Home</button>
        </div>
      </div>
    );
  }

  if (rejected) {
    return (
      <div className="cookies-status">
        <div className="container">
          <h1>Cookies Rejected</h1>
          <p>You have rejected our cookie policy. Some features may be limited.</p>
          <button onClick={() => navigate('/')} className="btn btn-secondary">Continue to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cookies-page">
      <div className="container">
        <div className="cookies-content">
          <h1>Cookie Policy</h1>
          <div className="cookies-section">
            <h2>What Are Cookies</h2>
            <p>Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and understanding how you use our site.</p>
          </div>

          <div className="cookies-section">
            <h2>How We Use Cookies</h2>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </div>

          <div className="cookies-section">
            <h2>Your Choices</h2>
            <p>You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.</p>
          </div>

          <div className="cookies-actions">
            <button onClick={handleAccept} className="btn btn-primary">Accept All Cookies</button>
            <button onClick={handleReject} className="btn btn-secondary">Reject Non-Essential Cookies</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookiesPage;