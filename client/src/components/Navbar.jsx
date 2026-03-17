import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ student, admin }) => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const userId = localStorage.getItem("userId");
    const userMode = localStorage.getItem("userMode ");

    console.log(userId, userMode)

    const user = userMode === "Admin" ? admin : student;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    const defaultAvatar =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    return (
        <header>

            <div className="logo">
                <span>🔺</span>
                <h1>
                    TRINETRA <span className="sub-title">Innovation Portal</span>
                </h1>
            </div>

            <div
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </div>

            <nav className={menuOpen ? "active" : ""}>
                <ul>

                    <li>
                        <Link to="/dashboard">Home</Link>
                    </li>

                    <li>
                        <a href="#trinetra">About Trinetra</a>
                    </li>

                    <li className="dropdown">
                        <a href="#iic">About IIC ▾</a>

                        <ul className="dropdown-content">
                            <li>
                                <a href="#student">Student Council</a>
                            </li>
                            <li>
                                <a href="#faculty">Faculty Council</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#contact">Contact</a>
                    </li>

                    {!userId && (
                        <>
                            <li>
                                <Link to="/login" className="btn-login">
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link to="/register" className="btn-register">
                                    Register
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin-login" className="btn-admin">
                                    Admin
                                </Link>
                            </li>
                        </>
                    )}

                    {userId && user && (
                        <li
                            className="profile-menu"
                            onMouseEnter={() => setProfileOpen(true)}
                            onMouseLeave={() => setProfileOpen(false)}
                        >

                            {/* Profile Image */}
                            <img
                                src={user.profilePic || defaultAvatar}
                                alt="profile"
                                className="profile-img"
                            />

                            {profileOpen && (
                                <div className="profile-dropdown">

                                    <div className="profile-header">

                                        <img
                                            src={user.profilePic || defaultAvatar}
                                            alt="profile"
                                        />

                                        <h4>
                                            {userMode === "Admin"
                                                ? user.name
                                                : user.fullName}
                                        </h4>

                                    </div>

                                    <div className="profile-info">

                                        <p>
                                            <strong>Email:</strong> {user.email}
                                        </p>

                                        {userMode === "student" && (
                                            <>
                                                <p>
                                                    <strong>Branch:</strong> {user.branch}
                                                </p>

                                                <p>
                                                    <strong>Year:</strong> {user.classYear}
                                                </p>
                                            </>
                                        )}

                                        {user.phone && (
                                            <p>
                                                <strong>Phone:</strong> {user.phone}
                                            </p>
                                        )}

                                        <p>
                                            <strong>Role:</strong> {userMode}
                                        </p>

                                    </div>

                                    <button
                                        className="btn-logout"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>

                                </div>
                            )}

                        </li>
                    )}

                </ul>
            </nav>

        </header>
    );
};

export default Navbar;