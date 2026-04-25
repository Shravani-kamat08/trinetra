import React from "react";

const Sidebar = ({ setActiveSection, logout }) => {
    return (
        <div className="a-sidebar d-flex flex-column">
            <h2 className="text-center">Admin Panel</h2>
            <ul className="list-unstyled flex-grow-1">
                <li className="d-flex align-items-center" onClick={() => setActiveSection("dashboard")}>
                    <i className="fa fa-chart-line me-2"></i>
                    <span>Dashboard</span>
                </li>

                <li className="d-flex align-items-center" onClick={() => setActiveSection("upload")}>
                    <i className="fa fa-upload me-2"></i>
                    <span>Upload Statement</span>
                </li>

                <li className="d-flex align-items-center" onClick={() => setActiveSection("students")}>
                    <i className="fa fa-users me-2"></i>
                    <span>View Students</span>
                </li>

                <li className="d-flex align-items-center" onClick={() => setActiveSection("iic-team")}>
                    <i className="fa fa-users me-2"></i>
                    <span>IIC Council Team</span>
                </li>

                <li className="d-flex align-items-center" onClick={() => setActiveSection("view")}>
                    <i className="fa fa-folder me-2"></i>
                    <span>View Saved</span>
                </li>

                <li className="d-flex align-items-center" onClick={() => setActiveSection("profile")}>
                    <i className="fa fa-user me-2"></i>
                    <span>Profile</span>
                </li>

                <li className="d-flex align-items-center mt-auto" onClick={logout}>
                    <i className="fa fa-sign-out-alt me-2"></i>
                    <span>Logout</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;