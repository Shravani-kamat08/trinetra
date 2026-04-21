import React, { useState } from "react";
import UploadProfileImage from "../uploadImages/UploadProfileImage";

const ProfileCard = ({
    form,
    setForm,
    showProfileForm,
    setShowProfileForm,
    updateProfile,
}) => {
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleImageUploadSuccess = (url) => {
        setForm({ ...form, profilePic: url });
        setShowUploadModal(false);
    };

    return (
        <div className="profile-card">
            <div className="card-header">
                <h2>User Profile</h2>
            </div>

            <div className="card-body">
                {/* PROFILE IMAGE DISPLAY */}
                <div className="text-center mb-4">
                    <img
                        src={form.profilePic || "https://via.placeholder.com/100"}
                        alt="Profile"
                        className="rounded-circle mb-2"
                        width="100"
                        height="100"
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                </div>

                {!showProfileForm ? (
                    /* DISPLAY MODE */
                    <div className="view-container">
                        <div className="info-grid">
                            <div className="info-group full-width">
                                <label>Full Name</label>
                                <p>{form.fullName || "—"}</p>
                            </div>
                            <div className="info-group full-width">
                                <label>Email Address</label>
                                <p>{form.email || "—"}</p>
                            </div>
                            <div className="info-group">
                                <label>Branch</label>
                                <p>{form.branch || "—"}</p>
                            </div>
                            <div className="info-group">
                                <label>Class Year</label>
                                <p>{form.classYear || "—"}</p>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button className="btn-edit" onClick={() => setShowProfileForm(true)}>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    /* EDIT MODE */
                    <div className="edit-container">
                        <div className="text-center mb-3">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => setShowUploadModal(true)}
                            >
                                Change Photo
                            </button>
                        </div>

                        <div className="input-grid">
                            <div className="input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={form.fullName || ""}
                                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={form.email || ""}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            <div className="input-row">
                                <div className="input-group">
                                    <label>Branch</label>
                                    <input
                                        type="text"
                                        value={form.branch || ""}
                                        onChange={(e) => setForm({ ...form, branch: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Year</label>
                                    <input
                                        type="text"
                                        value={form.classYear || ""}
                                        onChange={(e) => setForm({ ...form, classYear: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="card-footer-actions">
                            <button className="btn-save" onClick={updateProfile}>Save Changes</button>
                            <button className="btn-cancel" onClick={() => setShowProfileForm(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            {/* UPLOAD MODAL */}
            {showUploadModal && (
                <UploadProfileImage
                    onClose={() => setShowUploadModal(false)}
                    onUploadSuccess={handleImageUploadSuccess}
                />
            )}
        </div>
    );
};

export default ProfileCard;