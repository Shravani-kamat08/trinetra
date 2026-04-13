import React, { useState } from "react";
import api from "../../util/api";
import "./IicForm.css";

const IicForm = ({ isAdmin = true }) => {
    const [formData, setFormData] = useState({
        role: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        qualification: "",
        experience: ""
    });

    const [loading, setLoading] = useState(false);

    // ❌ Block non-admin
    if (!isAdmin) {
        return <p style={{ textAlign: "center" }}>Access Denied</p>;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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

                // reset form
                setFormData({
                    role: "",
                    name: "",
                    email: "",
                    phone: "",
                    department: "",
                    designation: "",
                    qualification: "",
                    experience: ""
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

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Add Member"}
                </button>
            </form>
        </div>
    );
};

export default IicForm;