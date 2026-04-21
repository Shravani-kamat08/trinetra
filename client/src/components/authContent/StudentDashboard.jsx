import React, { useEffect, useState } from "react";
import api from "../../util/api";
import "./StudentDashboard.css";

import ProfileCard from "./ProfileCard";
import AdminCard from "./AdminCard";
import IdeasTable from "./IdeasTable";
import ChangePassword from "./ChangePassword";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
    const navigate = useNavigate();
    const studentId = localStorage.getItem("userId");

    const [data, setData] = useState(null);
    const [form, setForm] = useState({});
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const [activeTab, setActiveTab] = useState("ideas");

    useEffect(() => {
        const fetchDashboard = async () => {
            const res = await api.get(`/students/dashboard/${studentId}`);
            setData(res.data);
            setForm(res.data.student);
        };
        fetchDashboard();
    }, []);

    const updateProfile = async () => {
        await api.put(`/students/profile/${studentId}`, form);
        alert("Profile Updated");
    };

    const changePassword = async () => {
        await api.put(`/students/change-password/${studentId}`, password);
        alert("Password Changed");
        setPassword({ oldPassword: "", newPassword: "" });
        navigate("/dashboard");
    };

    if (!data) return <div className="loading-screen">Loading...</div>;

    return (
        <div className="premium-dashboard">

            {/* SIDEBAR */}
            <aside className="premium-sidebar">
                <h2 className="logo">🎓 Student Panel</h2>

                <div className="menu">
                    <button
                        className={activeTab === "ideas" ? "active" : ""}
                        onClick={() => setActiveTab("ideas")}
                    >
                        📊 Ideas
                    </button>

                    <button
                        className={activeTab === "profile" ? "active" : ""}
                        onClick={() => setActiveTab("profile")}
                    >
                        👤 Profile
                    </button>

                    <button
                        className={activeTab === "update" ? "active" : ""}
                        onClick={() => setActiveTab("update")}
                    >
                        ✏️ Update
                    </button>

                    <button
                        className={activeTab === "password" ? "active" : ""}
                        onClick={() => setActiveTab("password")}
                    >
                        🔒 Password
                    </button>
                </div>
            </aside>

            {/* MAIN */}
            <main className="premium-main">

                {/* TOPBAR */}
                <div className="topbar">
                    <h1>Student Dashboard</h1>
                </div>

                {/* CENTERED CONTENT */}
                <div className="content-wrapper">

                    <div className="content-card">

                        {activeTab === "ideas" && (
                            <IdeasTable ideas={data.ideas} />
                        )}

                        {activeTab === "profile" && (
                            <div className="grid">
                                <ProfileCard
                                    form={form}
                                    setForm={setForm}
                                    showProfileForm={false}
                                    updateProfile={updateProfile}
                                />
                                <AdminCard admin={data.admin} />
                            </div>
                        )}

                        {activeTab === "update" && (
                            <ProfileCard
                                form={form}
                                setForm={setForm}
                                showProfileForm={true}
                                updateProfile={updateProfile}
                            />
                        )}

                        {activeTab === "password" && (
                            <ChangePassword
                                password={password}
                                setPassword={setPassword}
                                changePassword={changePassword}
                            />
                        )}

                    </div>

                </div>

            </main>

        </div>
    );
};

export default StudentDashboard;