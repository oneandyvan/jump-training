import styles from './Login.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, saveAuthToken, saveUser } from '../../services/loginService';
import LoginError from './LoginError';

export default function LoginCard() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate form
        if (!email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const response = await loginUser({ email, password });
            
            // Save token if provided
            if (response.token) {
                saveAuthToken(response.token);
            }

            // Save user info if provided
            if (response.user) {
                saveUser(response.user);
            }

            // Redirect to home or dashboard on success
            navigate('/');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginCard}>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className={styles.formStack}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>
                </div>
                
                {error && <LoginError error={error} />}

                <button type="submit" className={styles.loginButton} disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}