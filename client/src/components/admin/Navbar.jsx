import React, { useState } from "react";

const Navbar = ({ toggleSidebar, adminData }) => {
    const [copied, setCopied] = useState(false);

    if (!adminData) return <div className="admin-navbar">Loading...</div>;

    const handleCopyId = () => {
        navigator.clipboard.writeText(adminData.commonId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <nav className="admin-navbar">
            <div className="nav-left">
                <i className="fa fa-bars menu-toggle" onClick={toggleSidebar}></i>
                <div className="college-branding">
                    <span className="college-name">{adminData.collegeName}</span>
                    <div className="copy-wrapper" onClick={handleCopyId} title="Click to copy ID">
                        <span className="common-id">ID: {adminData.commonId}</span>
                        <i className={`fa ${copied ? "fa-check" : "fa-copy"}`}></i>
                        {copied && <span className="tooltip">Copied!</span>}
                    </div>
                </div>
            </div>

            <div className="nav-center">
                <h1 className="admin-title">Name: {adminData.name}</h1>
            </div>

            <div className="nav-right">
                <div className="contact-details">
                    <p><i className="fa fa-envelope"></i> {adminData.email}</p>
                    <p><i className="fa fa-phone"></i> {adminData.phone}</p>
                </div>
                <span className="status-indicator">{adminData.status}</span>
            </div>
        </nav>
    );
};

export default Navbar;