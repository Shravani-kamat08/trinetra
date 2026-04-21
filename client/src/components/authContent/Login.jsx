import React, { useState } from 'react';
import './loginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../util/api';

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleTogglePass = () => {
        setShowPassword(!showPassword);
    };

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

            localStorage.setItem("userId", result.student.id);
            localStorage.setItem("userMode", "student");

            setMessageText(result.message || "Login successful!");
            setMessageColor("#16a34a");

            setEmail("");
            setPassword("");

            navigate('/dashboard');

        } catch (error) {
            setMessageText(error.response?.data?.message || "Login failed");
            setMessageColor("#dc2626");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="login-box w-100" style={{ maxWidth: "420px" }}>

                {/* Step Indicator */}
                <div className="step-indicator d-flex justify-content-center align-items-center mb-3">
                    <Link to="/login" className="step active">1</Link>
                    <div className="line mx-2"></div>
                    <Link to="/register" className="step">2</Link>
                </div>

                <h2 className="text-center mb-4">Login to Trinetra</h2>

                <form onSubmit={handleLoginSubmit}>

                    {/* EMAIL */}
                    <div className="input-group mb-3 d-block">
                        <label htmlFor="loginEmail" className="form-label">Email</label>
                        <div className="position-relative">
                        <input
                            type="email"
                            id="loginEmail"
                            className="form-control pe-5"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="input-group mb-3 d-block">
                        {/* <div className="d-flex justify-content-between"> */}
                            <label htmlFor="loginPassword" className="form-label">Password</label>
                            {/* <a href="#" className="small text-primary text-decoration-none"> */}
                                {/* Forgot? */}
                            {/* </a> */}
                        {/* </div> */}

                        <div className="position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="loginPassword"
                                className="form-control pe-5"
                                minLength="8"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <span
                                className="position-absolute top-50 end-0 translate-middle-y me-3"
                                onClick={handleTogglePass}
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword ? "🔒" : "👁️"}
                            </span>

                        </div>

                    </div>

                    {/* BUTTON */}
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>

                    {/* MESSAGE */}
                    <p className="text-center mt-3" style={{ color: messageColor }}>
                        {messageText}
                    </p>

                    {/* REGISTER LINK */}
                    <p className="text-center mt-2">
                        New here? <Link to="/register">Create an account</Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Login;