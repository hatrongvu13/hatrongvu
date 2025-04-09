import {useAuth} from "../context/AuthContext.jsx";
import {useState} from "react";
import {authService} from "../services/authService.js";
import {Link, useNavigate} from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await authService.loginUser(credentials);
            login(userData);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div>
                    <h2 className="login-title">Sign in to your account</h2>
                    <p className="login-subtitle">
                        Enter your credentials to access your dashboard
                    </p>
                </div>

                {error && (
                    <div className="error-message">
                        <span>{error}</span>
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            id="username"
                            name="Username"
                            type="text"
                            required
                            className="input-field"
                            placeholder="Username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="input-field"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <button type="submit" className="submit-button">
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="register-link">
                    Don't have an account?{' '}
                    <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;