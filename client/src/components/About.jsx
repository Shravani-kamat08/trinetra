import React from "react";
import "./home.css";

const About = () => {
    return (
        <>

            {/* ABOUT TRINETRA */}
            <section className="section text-center">

                <h2 className="fw-bold mb-3 text-primary">What is TRINETRA?</h2>

                <p className="mx-auto text-secondary" style={{ maxWidth: "800px" }}>
                    TRINETRA is a digital innovation platform developed under the Institution 
                    of Innovation Council (IIC). It enables students to submit, evaluate, and 
                    track innovative ideas based on Smart India Hackathon problem statements. 
                    The platform replaces the traditional offline idea submission system with 
                    a modern, efficient, and transparent digital solution.
                </p>

            </section>

            {/* VISION & MISSION */}
            <section className="section light text-center">

                <h2 className="fw-bold mb-4 text-success">Our Vision & Mission</h2>

                <div className="container">
                    <div className="row g-4">

                        <div className="col-md-6">
                            <div className="card shadow border-0 h-100">
                                <div className="card-body">
                                    <h5 className="text-primary">Vision</h5>
                                    <p className="text-secondary">
                                        To create a culture of innovation and creativity among students 
                                        by providing a structured platform for idea generation and 
                                        implementation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card shadow border-0 h-100">
                                <div className="card-body">
                                    <h5 className="text-primary">Mission</h5>
                                    <p className="text-secondary">
                                        To digitize the idea submission process, improve evaluation 
                                        transparency, and encourage students to actively participate 
                                        in innovation and entrepreneurship activities.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            {/* FEATURES */}
            <section className="section text-center">

                <h2 className="fw-bold mb-4 text-primary">Key Features</h2>

                <div className="container">
                    <div className="row g-4">

                        <div className="col-md-4">
                            <div className="card shadow border-0 h-100">
                                <div className="card-body">
                                    <i className="fa-solid fa-lightbulb fa-2x text-warning mb-3"></i>
                                    <h5>Idea Submission</h5>
                                    <p className="text-secondary">
                                        Students can easily submit innovative ideas digitally.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow border-0 h-100">
                                <div className="card-body">
                                    <i className="fa-solid fa-chart-line fa-2x text-success mb-3"></i>
                                    <h5>Evaluation System</h5>
                                    <p className="text-secondary">
                                        Admins and experts can review and evaluate ideas efficiently.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow border-0 h-100">
                                <div className="card-body">
                                    <i className="fa-solid fa-trophy fa-2x text-danger mb-3"></i>
                                    <h5>Results & Ranking</h5>
                                    <p className="text-secondary">
                                        Transparent ranking system for best innovative ideas.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            {/* ABOUT IIC */}
            <section className="section light text-center">

                <h2 className="fw-bold mb-3 text-primary">
                    About Institution of Innovation Council (IIC)
                </h2>

                <p className="mx-auto text-secondary" style={{ maxWidth: "800px" }}>
                    Institution of Innovation Council (IIC) is an initiative by the 
                    Ministry of Education (MoE), Government of India, to promote 
                    innovation, startup culture, and entrepreneurship among students 
                    and faculty members across educational institutions.
                </p>

            </section>

            {/* FOOTER */}
            <footer className="text-center py-3">
                <p className="mb-0">© 2026 TRINETRA | IIC Innovation Platform</p>
            </footer>
        </>
    );
};

export default About;