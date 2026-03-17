import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className="hero-simple">

                <h2 className="hero-title">TRINETRA</h2>

                <p className="tagline">
                    Turning Ideas into Innovation & Patents
                </p>

                <div className="login-options">

                    {/* Student Login */}
                    <div
                        className="login-card"
                        onClick={() => navigate("/login")}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                            alt="Student Login"
                        />
                        <h3>Student</h3>
                    </div>

                    {/* Admin Login */}
                    <div
                        className="login-card"
                        onClick={() => navigate("/admin-login")}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                            alt="Admin Login"
                        />
                        <h3>Admin</h3>
                    </div>

                </div>

            </section>

            {/* ABOUT TRINETRA */}
            <section id="trinetra" className="section">

                <h2>About Trinetra</h2>

                <p>
                    Trinetra is an initiative under the Institution of Innovation Council
                    (IIC) where students submit innovative ideas based on Smart India
                    Hackathon problem statements. Previously conducted offline using a
                    physical idea box, Trinetra is now proposed as a digital platform to
                    simplify idea submission, evaluation, and result declaration.
                </p>

            </section>

            {/* ABOUT IIC */}
            <section id="iic" className="section light">

                <h2>About Institution of Innovation Council (IIC)</h2>

                <p>
                    Institution of Innovation Council (IIC) is an initiative by the
                    Ministry of Education (MoE) to promote innovation, entrepreneurship,
                    and startup culture among students and faculty.
                </p>

            </section>

            {/* CONTACT */}
            <section id="contact" className="section contact">

                <h2>Contact Us</h2>

                <div className="contact-box">

                    <p>
                        <strong>College Name:</strong> Dr. A. D. Shinde College of Engineering
                    </p>

                    <p>
                        <strong>Address:</strong> A/P Bhadgaon, Kolhapur – 416502
                    </p>

                    <p>
                        <strong>Email:</strong> info@adshindecoengg.edu.in
                    </p>

                </div>

            </section>

            <footer>
                <p>© 2026 TRINETRA | IIC Innovation Platform</p>
            </footer>
        </>
    );
};

export default Home;