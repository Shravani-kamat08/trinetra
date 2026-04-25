import React, { useEffect, useState } from "react";
import api from "../../util/api";
import { useNavigate } from "react-router-dom";
import UploadProfileImage from "../uploadImages/UploadProfileImage";

const UpdateAdmin = () => {
    const adminId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        profilePic: "",
        collegeName: "",
        email: "",
        phone: "",
        designation: "",
        department: "",
        password: "",
        profileImage: "",
        commonId: "",
        status: "Active"
    });

    const [loading, setLoading] = useState(false);
    const [showUpload, setShowUpload] = useState(false);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await api.get(`/admin/${adminId}`);
                setFormData(res.data.data);
            } catch (err) {
                console.error(err);
                alert("Failed to load admin data");
            }
        };

        fetchAdmin();
    }, [adminId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put(`/admin/${adminId}`, formData);
            alert("Admin Updated Successfully");
            navigate("/admin-dashboard");
        } catch (err) {
            console.error(err);
            alert("Update Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 text-black">
            {/* <div className="card shadow"> */}
                <div className="card-body">
                    <h3 className="mb-4 text-primary">Update Admin</h3>

                    <form onSubmit={handleSubmit}>

                        {/* ✅ Profile Upload at Top with Preview */}
                        <div className="mb-4 text-center">
                            <label className="form-label text-dark d-block mb-2">
                                Profile Picture
                            </label>

                            <div className="mb-3">
                                <img
                                    src={formData.profilePic || "https://via.placeholder.com/120"}
                                    alt="Profile"
                                    className="rounded-circle border"
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                />
                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => setShowUpload(true)}
                            >
                                {formData.profilePic ? "Change Image" : "Upload Profile Image"}
                            </button>
                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label text-dark">
                                    Full Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label text-dark">
                                    Email Address <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label text-dark">
                                    College Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="collegeName"
                                    value={formData.collegeName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label text-dark">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label text-dark">Designation</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label text-dark">Department</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label text-dark">
                                    Common ID <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="commonId"
                                    value={formData.commonId}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label text-dark">Status</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Admin"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger mt-2"
                            onClick={() => navigate("/admin-dashboard")}
                        >
                            Cancel
                        </button>

                    </form>
                </div>
            {/* </div> */}

            {/* ✅ Upload Modal */}
            {showUpload && (
                <UploadProfileImage
                    onClose={() => setShowUpload(false)}
                    onUploadSuccess={(url) => {
                        setFormData({
                            ...formData,
                            profilePic: url
                        });
                        setShowUpload(false);
                    }}
                />
            )}
        </div>
    );
};

export default UpdateAdmin;