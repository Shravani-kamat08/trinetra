import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* HERO SECTION */}
            <section className="hero-simple h-100 d-flex flex-column justify-content-center align-items-center text-center">

                {/* <div className="container"> */}

                    <h2 className="hero-title fw-bold">TRINETRA</h2>

                    <p className="tagline">
                        Turning Ideas into Innovation & Patents
                    </p>

                    <div className="login-options row justify-content-center">

                        {/* Student */}
                        <div className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
                            <div
                                className="login-card text-center"
                                onClick={() => navigate("/login")}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                                    alt="Student Login"
                                />
                                <h3 className="mt-2">Student</h3>
                            </div>
                        </div>

                        {/* Admin */}
                        <div className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
                            <div
                                className="login-card text-center"
                                onClick={() => navigate("/admin-login")}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                                    alt="Admin Login"
                                />
                                <h3 className="mt-2">Admin</h3>
                            </div>
                        </div>

                    </div>

                {/* </div> */}
            </section>

            {/* ABOUT TRINETRA */}
            <section id="trinetra" className="section text-center">

                <h2 className="fw-bold mb-3">About Trinetra</h2>

                <p className="mx-auto">
                    Trinetra is an initiative under the Institution of Innovation Council
                    (IIC) where students submit innovative ideas based on Smart India
                    Hackathon problem statements. Previously conducted offline using a
                    physical idea box, Trinetra is now proposed as a digital platform to
                    simplify idea submission, evaluation, and result declaration.
                </p>

            </section>

            {/* ABOUT IIC */}
            <section id="iic" className="section light text-center">

                <h2 className="fw-bold mb-3">
                    About Institution of Innovation Council (IIC)
                </h2>

                <p className="mx-auto">
                    Institution of Innovation Council (IIC) is an initiative by the
                    Ministry of Education (MoE) to promote innovation, entrepreneurship,
                    and startup culture among students and faculty.
                </p>

            </section>

            {/* CONTACT */}
            <section id="contact" className="section contact text-center">

                <h2 className="fw-bold mb-4">Contact Us</h2>

                <div className="contact-box mx-auto">

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

            <footer className="text-center py-3">
                <p className="mb-0">© 2026 TRINETRA | IIC Innovation Platform</p>
            </footer>
        </>
    );
};

export default Home;