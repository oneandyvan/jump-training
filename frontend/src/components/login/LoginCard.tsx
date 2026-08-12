import { useState } from 'react';
import LoginError from './LoginError';

export default function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    // TODO: For now use hardcoded password since backend has not implemented password/hashing/auth yet
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        // TODO: Implement login logic
        console.log('Login attempt:', { email, password });
        if (!email || !password) {
            setError('Please fill in all fields');
        } else {
            setError('');
            // Handle login
        }
    };

    return (
    <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
          {error && <LoginError error={error} />}
        </form>
      </div>
    );
}