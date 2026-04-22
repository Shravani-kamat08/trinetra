import React, { useEffect, useState } from "react";
import api from "../util/api";
import "./IicMembersPage.css";

const IicMembersPage = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await api.get("/iic");
                if (res.data.success) {
                    setMembers(res.data.members);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchMembers();
    }, []);

    const students = members.filter(
        (m) => m.designation?.toLowerCase() === "student"
    );

    const faculty = members.filter(
        (m) => m.designation?.toLowerCase() !== "student"
    );

    return (
        <div id="iic-members-page">

            <h2 className="title">IIC Council Members</h2>

            {/* STUDENTS */}
            <div className="container-fluid" id="student">
                <h3 className="section-title student-title">Student Members</h3>

                <div className="card-grid">
                    {students.map((m) => (
                        <div className="member-card" key={m._id}>
                            <div className="img-wrapper">
                                <img src={m.profilePic || "/default.png"} alt={m.name} />
                            </div>

                            <h4>{m.name}</h4>
                            <span className="badge role">{m.role}</span>

                            <p className="dept">{m.department}</p>
                            <p className="email">{m.email}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FACULTY */}
            <div className="container-fluid" id="faculty">
                <h3 className="section-title faculty-title">Faculty Members</h3>

                <div className="card-grid">
                    {faculty.map((m) => (
                        <div className="member-card" key={m._id}>
                            <div className="img-wrapper">
                                <img src={m.profilePic || "/default.png"} alt={m.name} />
                            </div>

                            <h4>{m.name}</h4>
                            <span className="badge role">{m.role}</span>

                            <p className="designation">{m.designation}</p>
                            <p className="exp">{m.experience} yrs experience</p>
                            <p className="email">{m.email}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default IicMembersPage;