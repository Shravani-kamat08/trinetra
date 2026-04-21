import React, { useState } from "react";
import api from "../../util/api";
import "./IicForm.css";
import AnimatedImageUpload from "../uploadImages/AnimatedImageUpload";

function UploadProfileImage({ onClose, onUploadSuccess }) {
    return (
        <AnimatedImageUpload
            title="Profile Image"
            uploadEndpoint="/file/upload-profile"
            onClose={onClose}
            onUploadSuccess={onUploadSuccess}
        />
    );
}

const IicForm = ({ isAdmin = true }) => {
    const [formData, setFormData] = useState({
        role: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        qualification: "",
        experience: "",
        profilePic: ""
    });

    const [loading, setLoading] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    if (!isAdmin) {
        return <p style={{ textAlign: "center" }}>Access Denied</p>;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUploadSuccess = (url) => {
        setFormData({ ...formData, profilePic: url });
        setShowUploadModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.role || !formData.name) {
            return alert("Role and Name are required");
        }

        try {
            setLoading(true);

            const res = await api.post("/iic/create", formData);

            if (res.data.success) {
                alert("Member added successfully");

                setFormData({
                    role: "",
                    name: "",
                    email: "",
                    phone: "",
                    department: "",
                    designation: "",
                    qualification: "",
                    experience: "",
                    profilePic: ""
                });
            } else {
                alert(res.data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Error adding member");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Add IIC Team Member</h2>

            <form onSubmit={handleSubmit} className="iic-form">
                <input name="role" placeholder="Role (e.g. President)" value={formData.role} onChange={handleChange} required />
                <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
                <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
                <input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} />
                <input
                    name="experience"
                    type="number"
                    placeholder="Experience (years)"
                    value={formData.experience}
                    onChange={handleChange}
                />

                <button 
                    type="button" 
                    onClick={() => setShowUploadModal(true)}
                    className="upload-btn"
                >
                    {formData.profilePic ? "Image Uploaded ✓" : "Upload Profile Image"}
                </button>

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Add Member"}
                </button>
            </form>

            {showUploadModal && (
                <UploadProfileImage
                    onClose={() => setShowUploadModal(false)}
                    onUploadSuccess={handleUploadSuccess}
                />
            )}
        </div>
    );
};

export default IicForm;