import React, {useEffect, useState} from 'react';
import {useAuth} from '../context/AuthContext';
import "./Dashboard.css";
import {getUserProfile} from "../services/authService.js";

const Dashboard = () => {
    const { logout} = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [logoutLoading, setLogoutLoading] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const userProfile = await getUserProfile();
            setProfile(userProfile.data);
        } catch (err) {
            console.log(err)
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLogoutLoading(true);
        logout();
        setLogoutLoading(false);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2 className="sidebar-title">Dashboard</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><a href="#" className="sidebar-link active">Home</a></li>
                        <li><a href="#" className="sidebar-link">Profile</a></li>
                        <li><a href="#" className="sidebar-link">Settings</a></li>
                        <li>
                            <button onClick={handleLogout} className="sidebar-link logout-btn">Logout</button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <header className="dashboard-header">
                    <h1 className="header-title">Welcome,</h1>
                </header>

                {/* Dashboard Body */}
                <div className="dashboard-body">
                    {loading && <p className="loading-text">Loading...</p>}
                    {error && <div className="error-message">{error}</div>}

                    {profile && (
                        <div className="profile-card">
                            <h2 className="card-title">Your Profile</h2>
                            <p><strong>Name:</strong> {profile.username || 'N/A'}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Last Login:</strong> {profile.fullName || 'Unknown'}</p>
                        </div>
                    )}

                    {/* Sample Widgets */}
                    <div className="widgets-grid">
                        <div className="widget">
                            <h3 className="widget-title">Stats</h3>
                            <p>Active Sessions: 3</p>
                            <p>Total Logins: 42</p>
                        </div>
                        <div className="widget">
                            <h3 className="widget-title">Quick Actions</h3>
                            <button className="widget-button">Update Profile</button>
                            <button className="widget-button">View Reports</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;