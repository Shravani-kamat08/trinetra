import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../util/api";
import UploadProfileImage from "./UploadProfileImage"; // ✅ NEW IMPORT

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [commonId, setCommonId] = useState("");
    const [adminData, setAdminData] = useState({
        adminId: "",
        name: "",
        email: " ",
        phone: " ",
        collegeName: ""
    });

    const [formData, setFormData] = useState({
        fullname: "",
        classyear: "",
        branch: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        confirmPassword: ""
    });

    const [preview, setPreview] = useState("https://via.placeholder.com/80");

    // ✅ NEW STATES FOR MODAL
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    /* STEP 1 : FETCH ADMIN */
    const handleCommonIdSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/admin/get-admin", { commonId });
            console.log(res.data);
            setAdminData({
                adminId: res.data.adminId,
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone,
                collegeName: res.data.collegeName
            });
            setStep(2);
        } catch (error) {
            alert("Invalid Common ID");
        }
    };

    /* HANDLE INPUT */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /* FINAL REGISTER */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const data = {
            adminId: adminData.adminId,
            fullName: formData.fullname,
            classYear: formData.classyear,
            branch: formData.branch,
            email: formData.email,
            phone: formData.phone,
            dateOfBirth: formData.dob,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            profilePic: uploadedImageUrl || null // ✅ UPDATED
        };

        try {
            const response = await api.post("/students/register", data);
            const result = response.data;
            localStorage.setItem("userId", result.student.id);
            localStorage.setItem("userMode", "student");
            alert("Registration Successful");
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="container">
            <h2>Student Registration</h2>

            {/* STEP 1 : COMMON ID */}
            {step === 1 && (
                <form onSubmit={handleCommonIdSubmit}>
                    <div className="input-group">
                        <label>Enter College Common ID</label>
                        <input
                            type="text"
                            placeholder="example: adscoe-rohit-1234"
                            value={commonId}
                            onChange={(e) => setCommonId(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="register-btn">
                        Continue
                    </button>
                </form>
            )}

            {/* STEP 2 : REGISTER FORM */}
            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    {/* ADMIN INFO */}
                    <div
                        style={{
                            background: "#f4f6ff",
                            padding: "10px",
                            marginBottom: "20px",
                            borderRadius: "8px"
                        }}
                    >
                        <h3>Name : {adminData.name}</h3>
                        <p>College : {adminData.collegeName}</p>
                        <p>Email ID :{adminData.email}</p>
                        <p>Contact No. : {adminData.phone}</p>
                    </div>

                    {/* PROFILE IMAGE */}
                    <div className="profile-upload">
                        <div className="avatar-preview">
                            <img
                                src={uploadedImageUrl || preview} // ✅ UPDATED
                                alt="Profile"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%"
                                }}
                            />
                        </div>

                        {/* ✅ OPEN MODAL INSTEAD OF INPUT */}
                        <label
                            onClick={() => setShowUploadModal(true)}
                            style={{ cursor: "pointer" }}
                        >
                            Upload Photo
                        </label>
                    </div>

                    {/* STUDENT FORM */}
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullname"
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
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
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
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="register-btn">
                        Register
                    </button>
                </form>
            )}

            {/* ✅ MODAL RENDER */}
            {showUploadModal && (
                <UploadProfileImage
                    onClose={() => setShowUploadModal(false)}
                    onUploadSuccess={(url) => {
                        setUploadedImageUrl(url);
                        setShowUploadModal(false);
                    }}
                />
            )}

            <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;