import React from "react";

const Sidebar = ({ setActiveSection, logout }) => {

    return (

        <div className="sidebar" id="sidebar">

            <h2>Admin Panel</h2>

            <ul>

                <li onClick={() => setActiveSection("dashboard")}>
                    <i className="fa fa-chart-line"></i>
                    <span>Dashboard</span>
                </li>

                <li onClick={() => setActiveSection("upload")}>
                    <i className="fa fa-upload"></i>
                    <span>Upload Statement</span>
                </li>

                <li onClick={() => setActiveSection("students")}>
                    <i className="fa fa-users"></i>
                    <span>View Students</span>
                </li>

                <li onClick={() => setActiveSection("view")}>
                    <i className="fa fa-folder"></i>
                    <span>View Saved</span>
                </li>

                <li onClick={logout}>
                    <i className="fa fa-sign-out-alt"></i>
                    <span>Logout</span>
                </li>

            </ul>

        </div>

    );
};

export default Sidebar;