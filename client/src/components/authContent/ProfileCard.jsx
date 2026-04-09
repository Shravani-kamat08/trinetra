import React from "react";

const ProfileCard = ({
    form,
    setForm,
    showProfileForm,
    setShowProfileForm,
    updateProfile,
}) => {
    return (
        <div className="profile-card">
            <div className="card-header">
                <h2>User Profile</h2>
            </div>

            <div className="card-body">
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
        </div>
    );
};

export default ProfileCard;