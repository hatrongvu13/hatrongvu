import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { registerUser } from '../services/authService';
import "./Register.css";

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        fullName: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await registerUser(userData);
            navigate('/login');
        } catch (err) {
            console.log(err)
            setError('Registration failed');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div>
                    <h2 className="register-title">Create your account</h2>
                    <p className="register-subtitle">Sign up to get started</p>
                </div>

                {error && (
                    <div className="error-message">
                        <span>{error}</span>
                    </div>
                )}

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="input-field"
                            placeholder="Username"
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="input-field"
                            placeholder="Email address"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            required
                            className="input-field"
                            placeholder="Phone"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            className="input-field"
                            placeholder="Full name"
                            value={userData.fullName}
                            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="input-field"
                            placeholder="Password"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            className="input-field"
                            placeholder="Confirm Password"
                            value={userData.confirmPassword}
                            onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                        />
                    </div>

                    <div>
                        <button type="submit" className="submit-button">
                            Register
                        </button>
                    </div>
                </form>

                <p className="login-link">
                    Already have an account?{' '}
                    <Link to="/login">Sign in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;