import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [menuOpen,setMenuOpen] = useState(false);

    return (
        <header>

            <div className="logo">
                <span>🔺</span>
                <h1>TRINETRA <span className="sub-title">Innovation Portal</span></h1>
            </div>

            {/* Mobile Menu Button */}
            <div className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)}>
                ☰
            </div>

            <nav className={menuOpen ? "active" : ""}>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#trinetra">About Trinetra</a></li>

                    <li className="dropdown">
                        <a href="#iic">About IIC ▾</a>
                        <ul className="dropdown-content">
                            <li><a href="#student">Student Council</a></li>
                            <li><a href="#faculty">Faculty Council</a></li>
                        </ul>
                    </li>

                    <li><a href="#contact">Contact Us</a></li>

                    <li className="nav-auth">
                        <Link to="/login" className="btn-login">Login</Link>
                    </li>

                    <li className="nav-auth">
                        <Link to="/register" className="btn-register">Register</Link>
                    </li>
                </ul>
            </nav>

        </header>
    );
};

export default Navbar;