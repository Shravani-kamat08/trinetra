import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ student, admin }) => {
    const navigate = useNavigate();
    const [profileOpen, setProfileOpen] = useState(false);

    const userId = localStorage.getItem("userId");
    const userMode = localStorage.getItem("userMode");

    const user = userMode === "Admin" ? admin : student;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    const defaultAvatar =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
            <div className="container-fluid">

                {/* BRAND */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <span>🔺</span>
                    <h2 className=" mb-0">
                        TRINETRA <span className="sub-title">Innovation Portal</span>
                    </h2>
                </Link>

                {/* TOGGLER */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* NAV ITEMS */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="w-100 navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">

                        <li className="nav-item">
                            <Link className="nav-link active" to="/dashboard">
                                Home
                            </Link>
                        </li>

                        {userMode === "Admin" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-dashboard">
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}

                        {userMode === "student" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/student-dashboard">
                                    Student Dashboard
                                </Link>
                            </li>
                        )}

                        {/* DROPDOWN */}
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                About IIC
                            </a>

                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#student">
                                        Student Council
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#faculty">
                                        Faculty Council
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#contact">
                                Contact
                            </a>
                        </li>
                    {/* </ul> */}

                    {/* RIGHT SIDE */}
                    {/* <div className="d-flex align-items-center ml-10"> */}

                        {!userId ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="btn-login p-2 px-3">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="btn-register p-2">
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin-login" className="btn-admin">
                                        Admin
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <div
                                className="position-relative ms-3"
                                onMouseEnter={() => setProfileOpen(true)}
                                onMouseLeave={() => setProfileOpen(false)}
                            >
                                <img
                                    src={user?.profilePic || defaultAvatar}
                                    alt="profile"
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                    style={{ cursor: "pointer" }}
                                />

                                {profileOpen && (
                                    <div className="position-absolute end-0 mt-2 bg-white shadow p-3" style={{ minWidth: "250px" }}>

                                        <div className="text-center mb-2">
                                            <img
                                                src={user?.profilePic || defaultAvatar}
                                                alt="profile"
                                                className="rounded-circle"
                                                width="60"
                                            />
                                            <h6 className="mt-2">
                                                {userMode === "Admin"
                                                    ? user?.name
                                                    : user?.fullName}
                                            </h6>
                                        </div>

                                        <p><strong>Email:</strong> {user?.email}</p>

                                        {userMode === "student" && (
                                            <>
                                                <p><strong>Branch:</strong> {user?.branch}</p>
                                                <p><strong>Year:</strong> {user?.classYear}</p>
                                            </>
                                        )}

                                        <p><strong>Role:</strong> {userMode}</p>

                                        <button
                                            className="btn btn-danger w-100 mt-2"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    {/* </div> */}
                        </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;