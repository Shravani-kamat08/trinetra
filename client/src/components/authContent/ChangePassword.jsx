import React, { useState } from "react";
import api from "../../util/api";

const ChangePassword = ({ password, setPassword }) => {

    // Local state to toggle visibility for each field individually
    const [visibleFields, setVisibleFields] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const toggleVisibility = (field) => {
        setVisibleFields((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // ✅ ADDED PASSWORD CHANGE LOGIC
    const changePassword = async () => {
        try {
            const userId = localStorage.getItem('userId')
            const { oldPassword, newPassword, confirmPassword } = password;

            // ✅ Validation
            if (!oldPassword || !newPassword || !confirmPassword) {
                return alert("All fields are required");
            }

            if (newPassword.length < 8) {
                return alert("Password must be at least 8 characters long");
            }

            if (newPassword !== confirmPassword) {
                return alert("New password and confirm password must match");
            }

            if (oldPassword === newPassword) {
                return alert("New password cannot be same as old password");
            }

            // ✅ API CALL
            const res = await api.put(`/students/change-password/${userId}`, {
                oldPassword,
                newPassword
            });

            alert(res.data.message);

            // ✅ Reset fields after success
            setPassword({
                ...password,
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div id="account-settings">
            <div id="password-manager" className="secure-card">
                <div className="card-header">
                    <h2 className="card-title">Update Password</h2>
                    <p className="card-subtitle">Ensure your new password is at least 8 characters long.</p>
                </div>

                <div className="card-body">
                    {/* Field 1: Old Password */}
                    <div className="input-block">
                        <label htmlFor="old-pass-input" className="input-label">Current Password</label>
                        <div className="input-wrapper">
                            <input
                                id="old-pass-input"
                                type={visibleFields.old ? "text" : "password"}
                                placeholder="Enter current password"
                                value={password.oldPassword}
                                onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                            />
                            <button
                                type="button"
                                className="view-toggle"
                                onClick={() => toggleVisibility('old')}
                            >
                                {visibleFields.old ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Field 2: New Password */}
                    <div className="input-block">
                        <label htmlFor="new-pass-input" className="input-label">New Password</label>
                        <div className="input-wrapper">
                            <input
                                id="new-pass-input"
                                type={visibleFields.new ? "text" : "password"}
                                placeholder="Enter new password"
                                value={password.newPassword}
                                onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                            />
                            <button
                                type="button"
                                className="view-toggle"
                                onClick={() => toggleVisibility('new')}
                            >
                                {visibleFields.new ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Field 3: Confirm Password */}
                    <div className="input-block">
                        <label htmlFor="confirm-pass-input" className="input-label">Confirm New Password</label>
                        <div className="input-wrapper">
                            <input
                                id="confirm-pass-input"
                                type={visibleFields.confirm ? "text" : "password"}
                                placeholder="Repeat new password"
                                value={password.confirmPassword}
                                onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                            />
                            <button
                                type="button"
                                className="view-toggle"
                                onClick={() => toggleVisibility('confirm')}
                            >
                                {visibleFields.confirm ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <button
                        id="submit-password-change"
                        className="primary-button"
                        onClick={changePassword} // ✅ uses new logic
                    >
                        Save New Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;