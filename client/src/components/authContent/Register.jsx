import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../util/api";
import AnimatedImageUpload from "../uploadImages/UploadProfileImage";

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [commonId, setCommonId] = useState("");

    const [adminData, setAdminData] = useState({
        adminId: "",
        name: "",
        email: "",
        phone: "",
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
        confirmPassword: "",
        profilePic: ""
    });

    console.log("form Data : ", formData);

    const [preview, setPreview] = useState("https://via.placeholder.com/80");
    const [showUploadModal, setShowUploadModal] = useState(false);


    const handleCommonIdSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/admin/get-admin", { commonId });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUploadSuccess = (url) => {
        console.log("URL : ", url)
        setFormData(prev => ({
            ...prev,
            profilePic: url
        }));
        setPreview(url);
        setShowUploadModal(false);
        toast.success("Image uploaded successfully! 📸");
    };

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
            profilePic: formData.profilePic || null
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
        <div className="container py-5">
            <div className="mx-auto" style={{ maxWidth: "500px" }}>
                <h2 className="text-center mb-4">Student Registration</h2>

                {step === 1 && (
                    <form onSubmit={handleCommonIdSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Enter College Common ID</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="example: adscoe-rohit-1234"
                                value={commonId}
                                onChange={(e) => setCommonId(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Continue</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit}>
                        <div className="bg-light p-3 rounded mb-3 border">
                            <h5 className="mb-2">{adminData.name}</h5>
                            <p className="mb-1"><strong>College:</strong> {adminData.collegeName}</p>
                            <p className="mb-1"><strong>Email:</strong> {adminData.email}</p>
                            <p className="mb-0"><strong>Phone:</strong> {adminData.phone}</p>
                        </div>

                        <div className="text-center mb-3">
                            <img src={preview} alt="Profile" className="rounded-circle mb-2" width="80" height="80" />
                            <div>
                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowUploadModal(true)}>
                                    Upload Photo
                                </button>
                            </div>
                        </div>

                        {/* Standard Inputs */}
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" name="fullname" className="form-control" required value={formData.fullname} onChange={handleChange} />
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Class / Year</label>
                                <input type="text" name="classyear" className="form-control" required value={formData.classyear} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Branch</label>
                                <input type="text" name="branch" className="form-control" required value={formData.branch} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="tel" name="phone" className="form-control" required value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input type="date" name="dob" className="form-control" required value={formData.dob} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" required value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" name="confirmPassword" className="form-control" required value={formData.confirmPassword} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Register</button>
                    </form>
                )}

                <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
            </div>

            {showUploadModal && (
                <AnimatedImageUpload
                    title="Profile Image"
                    uploadEndpoint="/api/file/upload-profile"
                    onClose={() => setShowUploadModal(false)}
                    onUploadSuccess={handleImageUploadSuccess}
                />
            )}
        </div>
    );
};

export default Register;