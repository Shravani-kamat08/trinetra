import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyMembers = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        axios.get("/api/members/faculty")
            .then(res => setMembers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container my-5">
            <h2 className="text-center text-success mb-4">Faculty Members</h2>

            <div className="row g-4">
                {members.map((m) => (
                    <div className="col-md-4" key={m._id}>
                        <div className="card shadow border-0 text-center h-100">
                            <div className="card-body">
                                <img
                                    src={m.profilePic || "/default.png"}
                                    alt={m.name}
                                    className="rounded-circle mb-3"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                                <h5>{m.name}</h5>
                                <p className="text-secondary">{m.designation}</p>
                                <p className="small text-muted">{m.email}</p>
                                <p className="small text-muted">
                                    {m.experience} yrs experience
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FacultyMembers;