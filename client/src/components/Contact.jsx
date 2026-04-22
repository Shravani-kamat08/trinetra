import { useEffect, useState } from "react";
import "./Contact.css";
import api from "../util/api";

const team = [
    {
        name: "Prachi Shivaji Chothe",
        email: "prachichothe2004@gmail.com",
        img: "/team/prachi.jpeg",
        github: "https://github.com/PrachyaaC7",
        linkedin: "https://www.linkedin.com/in/prachi-chothe-56942a272",
    },
    {
        name: "Vaishnavi Jivan Kumbhar",
        email: "vaishnavik0711@gmail.com",
        img: "/team/vaishnavi.jpeg",
        github: "https://github.com/VaishnaviK77",
        linkedin: "https://www.linkedin.com/in/vaishnavi-kumbhar-7b869426a",
    },
    {
        name: "Shravani Samir Kamat",
        email: "shravanikamat18@gmail.com",
        img: "/team/shravani.jpeg",
        github: "https://github.com/Shravani-kamat08",
        linkedin: "www.linkedin.com/in/shravani-kamat-95928226b/",
    },
];

const guide = {
    name: "Ms. P. B. Jangali",
    email: "computer science & engineering",
};

const hod = {
    name: "Prof. R. M. Jadhav",
    email: "computer science & engineering",
};

const principal = {
    name: "Dr. D. B. Ghewade",
    email: "principal@adshindecoe.edu.in",
};

export default function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/feedback/send", {
                name: formData.name,
                email: formData.email,
                message: formData.message
            });


            alert("Feedback sent!");
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        const container = document.getElementById("particles");
        if (!container) return;

        container.innerHTML = "";

        for (let i = 0; i < 20; i++) {
            const div = document.createElement("div");
            div.className = "position-absolute bg-light rounded-circle opacity-25";
            const size = Math.random() * 6 + 3;
            div.style.width = `${size}px`;
            div.style.height = `${size}px`;
            div.style.left = `${Math.random() * 100}%`;
            div.style.top = `${Math.random() * 100}%`;
            container.appendChild(div);
        }
    }, []);

    return (
        <div className="bg-light min-vh-100 position-relative overflow-hidden text-dark">
            <div id="particles" className="position-absolute w-100 h-100"></div>

            <div className="container-fluid position-relative">
                {/* Title */}
                <h2 className=" mb-0">
                    <img src="/main-logo-1.png" alt="Default Avatar" className="" style={{
                        height: "400px", objectFit: "cover"
                    }} /><br />
                    {/* TRINETRA <span className="sub-title">Innovation Portal</span> */}
                </h2>

                {/* <p className="text-center text-secondary mb-5"> */}
                {/* Trinetra is an initiative under the Institution of Innovation Council (IIC) */}
                {/* </p> */}

                {/* Vision */}
                <div className="card shadow-sm mb-5 text-center border-0">
                    <div className="card-body">
                        <h3 className="mb-3 text-success">Project Vision & Mission</h3>
                        <p className="text-secondary">
                            Trinetra is an initiative under the Institution of Innovation Council (IIC) where students submit innovative ideas based on Smart India Hackathon problem statements. Previously conducted offline using a physical idea box, Trinetra is now proposed as a digital platform to simplify idea submission, evaluation, and result declaration.
                        </p>
                    </div>
                </div>

                {/* Team */}
                <h2 className="text-center mb-4 text-primary">Meet Our Team</h2>

                <div className="row g-4 mb-5">
                    {team.map((member, i) => (
                        <div className="col-md-6 col-lg-4" key={i}>
                            <div className="card text-center shadow h-100 border-0">
                                <div className="card-body">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="rounded-circle mb-3"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <h5 className="text-dark">{member.name}</h5>

                                    <p className="small text-secondary d-flex justify-content-center align-items-center gap-2">
                                        <i className="fa-solid fa-envelope text-danger"></i> {member.email}
                                    </p>

                                    <div className="d-flex justify-content-center gap-3">
                                        <a href={member.linkedin} target="_blank" rel="noreferrer">
                                            <i className="fa-brands fa-linkedin fs-5 icon-hover"></i>
                                        </a>
                                        <a href={member.github} target="_blank" rel="noreferrer">
                                            <i className="fa-brands fa-github fs-5 icon-hover"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Guide / HOD / Principal */}
                <div className="row g-4 mb-5">
                    {[{ title: "Project Guide", ...guide }, { title: "HOD", ...hod }, { title: "Principal", ...principal }].map((item, i) => (
                        <div className="col-md-4" key={i}>
                            <div className="card text-center shadow h-100 border-0">
                                <div className="card-body">
                                    <h5 className="text-primary">{item.title}</h5>
                                    <p className="fw-semibold text-muted">{item.name}</p>
                                    <p className="small text-secondary d-flex justify-content-center align-items-center gap-2">
                                        {item.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="row g-4">
                    {/* Form */}
                    <div className="col-lg-6 p-2">
                        <div className="shadow border-0">
                            <div className="card-body">
                                <h4 className="mb-3 text-success">Send Message</h4>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="form-control mb-3"
                                        placeholder="Your Name"
                                    />

                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="form-control mb-3"
                                        placeholder="Email"
                                    />

                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="form-control mb-3"
                                        rows="4"
                                        placeholder="Message"
                                    ></textarea>

                                    <button type="submit" className="btn btn-success w-100">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="col-lg-6 text-center">
                        <div className="card mb-3 shadow border-0">
                            <div className="card-body text-center">
                                <h5 className="text-primary">Our College</h5>
                                <p className="mb-0 text-secondary">
                                    Dr. A.D. Shinde College Of Engineering
                                </p>
                            </div>
                        </div>

                        <div className="card mb-3 shadow border-0">
                            <div className="card-body text-center">
                                <h5 className="text-primary">Email</h5>
                                <p className="mb-0 text-secondary">
                                    principal@adshindecoe.edu.in
                                </p>
                            </div>
                        </div>

                        <div className="card shadow border-0">
                            <div className="card-body text-center">
                                <h5 className="text-primary">Address</h5>
                                <p className="mb-0 text-secondary">
                                    At- Guddai, Post- Bhadgaon, Tal- Gadhinglaj,
                                    Dist- Kolhapur - 416502
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}