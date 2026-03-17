import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const TrinetraPlatform = () => {
    const navigate = useNavigate();
    const images = [
        "img/slide1.avif",
        "img/slide2.avif",
        "img/slide3.jpeg"
    ];

    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(() => {
        let index = 0;
        const changeBackground = () => {
            index = (index + 1) % images.length;
            setCurrentImage(images[index]);
        };
        const interval = setInterval(changeBackground, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* HERO SECTION */}
            <section
                id="home"
                className="hero"
                style={{ backgroundImage: `url('${currentImage}')` }}
            >
                <div className="overlay"></div>

                <div className="hero-content">
                    <h2>TRINETRA</h2>
                    <p className="tagline">Turning Ideas into Innovation & Patents</p>
                    <div className="main-btns">
                        <button
                            onClick={() => navigate('/problem-statement')}
                            className="btn-primary-hero"
                        >
                            New innovation idea
                        </button>
                    </div>
                </div>
            </section>

            {/* <!-- ABOUT TRINETRA --> */}
            <section id="trinetra" className="section">
                <h2>About Trinetra</h2>
                <p>
                    Trinetra is an initiative under the Institution of Innovation Council
                    (IIC) where students submit innovative ideas based on Smart India
                    Hackathon problem statements. Previously conducted offline using a
                    physical idea box, Trinetra is now proposed as a digital platform to
                    simplify idea submission, evaluation, and result declaration. This
                    ensures faster review, transparency, and efficient innovation
                    management.
                </p>
            </section>

            {/* <!-- ABOUT IIC --> */}
            <section id="iic" className="section light">
                <h2>About Institution of Innovation Council (IIC)</h2>
                <p>
                    Institution of Innovation Council (IIC) is an initiative by the Ministry
                    of Education (MoE) to promote innovation, entrepreneurship, and startup
                    culture among students and faculty. It supports activities like
                    ideation, patent filing, workshops, and innovation challenges within
                    academic institutions.
                </p>
            </section>

            {/* <!-- CONTACT --> */}
            <section id="contact" className="section contact">
                <h2>Contact Us</h2>

                <div className="contact-box">
                    <p>
                        <strong>College Name:</strong> Dr. A. D. Shinde College of Engineering
                    </p>
                    <p><strong>Address:</strong> A/P Bhadgaon, Kolhapur – 416502</p>
                    <p><strong>Email:</strong> info@adshindecoengg.edu.in</p>
                </div>
            </section>

            <footer>
                <p>© 2026 TRINETRA | IIC Innovation Platform</p>
            </footer>
        </>
    );
};

export default TrinetraPlatform;