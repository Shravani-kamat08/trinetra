import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardCards from "./DashboardCards";
import UploadStatement from "./UploadStatement";
import ViewIdeas from "./ViewIdeas";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("dashboard");

    const [ideas, setIdeas] = useState([]);

    const [title, setTitle] = useState("");
    const [domain, setDomain] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [total, setTotal] = useState(0);
    const [approved, setApproved] = useState(0);
    const [pending, setPending] = useState(0);
    const [rejected, setRejected] = useState(0);

    const [showSuccess, setShowSuccess] = useState(false);

    const toggleSidebar = () => {
        document.getElementById("sidebar").classList.toggle("collapsed");
        document.getElementById("main").classList.toggle("collapsed");
    };

    const submitStatement = () => {

        if (title === "" || domain === "" || startDate === "" || endDate === "") {
            alert("Please fill all fields");
            return;
        }

        const newIdea = {
            title,
            domain,
            startDate,
            endDate,
            status: "Pending"
        };

        setIdeas([...ideas, newIdea]);

        setTotal(total + 1);
        setPending(pending + 1);

        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);

        setTitle("");
        setDomain("");
        setStartDate("");
        setEndDate("");
    };

    const logout = () => {
        localStorage.clear();
        navigate("/admin-login");
        window.location.reload();
    };

    return (

        <div>

            <Sidebar
                setActiveSection={setActiveSection}
                logout={logout}
            />

            <div className="main" id="main">

                <Navbar toggleSidebar={toggleSidebar} />

                <div className="content">

                    {activeSection === "dashboard" && (
                        <DashboardCards
                            total={total}
                            approved={approved}
                            pending={pending}
                            rejected={rejected}
                        />
                    )}

                    {activeSection === "upload" && (
                        <UploadStatement
                            title={title}
                            setTitle={setTitle}
                            domain={domain}
                            setDomain={setDomain}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            submitStatement={submitStatement}
                            showSuccess={showSuccess}
                        />
                    )}

                    {activeSection === "view" && (
                        <ViewIdeas ideas={ideas} />
                    )}

                </div>

            </div>

        </div>

    );
};

export default AdminDashboard;