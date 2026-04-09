import React, { useState } from 'react';
import './loginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../util/api';

const Login = () => {
    const navigate = useNavigate();

    // --- STATE FOR LOGIC ---
    const [showPassword, setShowPassword] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // --- 1. PASSWORD VISIBILITY TOGGLE ---
    const handleTogglePass = () => {
        setShowPassword(!showPassword);
    };

    // --- 2. FORM SUBMISSION ---
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        setMessageText("Authenticating... Please wait.");
        setMessageColor("#2563eb");

        try {

            const response = await api.post("/students/login", {
                email: email,
                password: password
            });

            const result = response.data;

            // ✅ STORE USER ID IN LOCAL STORAGE
            localStorage.setItem("userId", result.student.id);
            localStorage.setItem("userMode", "student");

            setMessageText(result.message || "Login successful! Redirecting to Dashboard...");
            setMessageColor("#16a34a");

            setEmail("");
            setPassword("");

            navigate('/dashboard');
            // setTimeout(() => navigate('/dashboard'), 1500);

        } catch (error) {

            console.error(error);

            setMessageText(error.response?.data?.message || "Login failed");
            setMessageColor("#dc2626");
        }

    };

    // --- 3. SOCIAL LOGIN HANDLER ---
    const handleSocialClick = (provider) => {
        setMessageText(`Connecting to ${provider}...`);
        setMessageColor("#1e40af");
    };

    return (
        <div className="login-box container">
            <div className="step-indicator">
                <Link to="/login" className="step active">1</Link>
                <div className="line"></div>
                <Link to="/register" className="step">2</Link>
            </div>

            <h2>Login to Trinetra</h2>

            <form id="loginForm" onSubmit={handleLoginSubmit}>
                <div className="input-group">
                    <label htmlFor="loginEmail">Email</label>
                    <input
                        type="email"
                        id="loginEmail"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label htmlFor="loginPassword">Password</label>
                        <a
                            href="#"
                            style={{ fontSize: '12px', color: '#2563eb', textDecoration: 'none' }}
                        >
                            Forgot?
                        </a>
                    </div>

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="loginPassword"
                            minLength="8"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span
                            className="toggle-icon"
                            id="togglePass"
                            onClick={handleTogglePass}
                            style={{ cursor: 'pointer' }}
                        >
                            {showPassword ? "🔒" : "👁️"}
                        </span>
                    </div>
                </div>

                <button type="submit">Login</button>

                <p id="loginMessage" style={{ color: messageColor }}>
                    {messageText}
                </p>

                <p className="signup-link">
                    New here? <Link to="/register">Create an account</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;