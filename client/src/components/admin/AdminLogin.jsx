import React, { useState } from "react";
import "./AdminLogin.css";
import api from "../../util/api";
import { useNavigate } from "react-router-dom";
import UploadProfileImage from "../uploadImages/UploadProfileImage";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showUpload, setShowUpload] = useState(false);

    const [name, setName] = useState("");
    const [collegeName, setCollegeName] = useState("");
    const [phone, setPhone] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");

    /* LOGIN FUNCTION */
    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/admin/login", {
                email,
                password
            });
            localStorage.setItem("userId", res.data.adminId);
            localStorage.setItem("userMode", "Admin");
            navigate("/admin-dashboard");
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Invalid Credentials");
        }
    };

    /* REGISTER FUNCTION */
    const register = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/admin/register", {
                name,
                collegeName,
                phone,
                designation,
                department,
                email,
                password,
                profilePic // Added profilePic here
            });
            localStorage.setItem("userId", res.data.adminId);
            window.location.reload();
            navigate("/admin-dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed");
        }
    };

    /* SWITCH FORM */
    const switchForm = () => {
        setIsLogin(!isLogin);
        setName("");
        setCollegeName("");
        setPhone("");
        setDesignation("");
        setDepartment("");
        setEmail("");
        setPassword("");
        setProfilePic("");
    };

    return (
        <div className="admin-container pt-3">
            <h2>
                <i className="fa-solid fa-user-shield"></i>
                {isLogin ? " Admin Login" : " Admin Register"}
            </h2>
            {isLogin ? (
                /* LOGIN FORM */
                <div className="login-container">
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label className="small">Admin Email </label>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                                                        <label className="small">Admin password </label>
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <p className="switch-form">
                        New Admin?
                        <span className="text-primary" onClick={switchForm}> Register Here</span>
                    </p>
                </div>
            ) : (
                /* REGISTER FORM */
                <div className="register-conteiner">
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label className="small">Admin Name</label>
                            <input type="text" placeholder="Admin Name" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="small">College Name</label>
                            <input type="text" placeholder="College Name" required value={collegeName} onChange={(e) => setCollegeName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="small">Phone</label>
                            <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="small">Designation</label>
                            <input type="text" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="small">Department</label>

                            <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="small">Email</label>
                            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="small">Password</label>
                            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {/* Profile Picture Upload Button */}
                        <label className="small">Profile Picture</label>
                        <div className="form-group">
                            <button type="button" onClick={() => setShowUpload(true)} style={{ width: "100%", padding: "10px" }}>
                                {profilePic ? "Image Uploaded ✓" : "Upload Profile Image"}
                            </button>
                        </div>

                        <button type="submit">Register</button>
                    </form>
                    <p className="switch-form">
                        Already have an account?
                        <span className="text-primary" onClick={switchForm}> Login Here</span>
                    </p>
                </div>
            )}

            <div className="footer">Idea Management System</div>

            {/* Profile Image Modal */}
            {showUpload && (
                <UploadProfileImage
                    onClose={() => setShowUpload(false)}
                    onUploadSuccess={(url) => {
                        setProfilePic(url);
                        setShowUpload(false);
                    }}
                />
            )}
        </div>
    );
};

export default AdminLogin;