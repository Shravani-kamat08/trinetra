import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../util/api';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: '',
        classyear: '',
        branch: '',
        email: '',
        phone: '',
        dob: '',
        password: '',
        confirmPassword: ''
    });

    const [preview, setPreview] = useState("https://via.placeholder.com/80");
    const [selectedFile, setSelectedFile] = useState(null);

    // handle text input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // handle image upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);

            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result); // base64 string
            };

            reader.readAsDataURL(file);
        }
    };

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const data = {
            fullName: formData.fullname,
            classYear: formData.classyear,
            branch: formData.branch,
            email: formData.email,
            phone: formData.phone,
            dateOfBirth: formData.dob,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            profilePic: selectedFile ? preview : null
        };

        try {

            const response = await api.post("/students/register", data);

            const result = response.data;

            alert(result.message || "Registration Successful!");

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <div className="container">

                <div className="step-indicator">
                    <Link to="/login" className="step">1</Link>
                    <div className="line"></div>
                    <Link to="/register" className="step active">2</Link>
                </div>

                <h2>Student Registration</h2>

                <form id="registerForm" onSubmit={handleSubmit}>

                    <div className="profile-upload">
                        <div className="avatar-preview">
                            <img
                                id="imagePreview"
                                src={preview}
                                alt="Profile"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>

                        <span className="upload-hint">
                            upload only identity size image
                        </span>

                        <label htmlFor="profilePic" className="upload-label">
                            Upload Photo
                        </label>

                        <input
                            type="file"
                            id="profilePic"
                            name="profilePic"
                            accept="image/*"
                            hidden
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-grid">

                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Enter your name"
                                id="fullname"
                                pattern="[A-Za-z\s]+"
                                required
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-row">

                            <div className="input-group">
                                <label>Class / Year</label>
                                <input
                                    type="text"
                                    name="classyear"
                                    placeholder="e.g. Final Year"
                                    id="classyear"
                                    required
                                    value={formData.classyear}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Branch</label>
                                <input
                                    type="text"
                                    name="branch"
                                    placeholder="eg. CSE"
                                    id="branch"
                                    required
                                    value={formData.branch}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="example@gmail.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="10 Digit Number"
                                id="phone"
                                maxLength="10"
                                pattern="[0-9]{10}"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                required
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                minLength="8"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <button type="submit" className="register-btn">
                        Create Account
                    </button>

                    <p className="login-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>

                </form>

            </div>
        </>
    );
};

export default Register;