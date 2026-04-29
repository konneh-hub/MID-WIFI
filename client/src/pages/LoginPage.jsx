import { useEffect, useState } from 'react';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.body.classList.add('login-page-mounted');
    }, 20);
    return () => window.clearTimeout(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    window.setTimeout(() => {
      setLoading(false);
      setErrorMessage('Invalid email or password. Please check your credentials and try again.');
    }, 1100);
  };

  return (
    <main className="login-page-shell">
      <section className="login-page-header">
        <div>
          <h1>Login</h1>
          <p>Access your university account</p>
        </div>
      </section>

      <section className="login-card" aria-labelledby="login-card-title">
        <div className="login-card-branding">
          <div className="login-icon" aria-hidden="true">🔒</div>
          <div>
            <h2 id="login-card-title">Login</h2>
            <p>Access your university account</p>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="your.email@university.edu"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <label className="remember-control">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((value) => !value)}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="link-secondary">
              Forgot Password?
            </a>
          </div>

          {errorMessage && <div className="form-error">{errorMessage}</div>}

          <button className="form-button" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <div className="login-card-footer">
            <span className="secure-note">Secure university login system</span>
            <div className="login-links">
              <a href="/register">Create Account</a>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
