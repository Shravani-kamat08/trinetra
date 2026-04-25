import React, { useEffect, useState } from "react";
import api from "../../util/api";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
    const adminId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await api.get(`/admin/${adminId}`);
                setAdmin(res.data.data);
            } catch (err) {
                console.error(err);
                alert("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, [adminId]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!admin) {
        return <div className="text-center mt-5">No Data Found</div>;
    }

    return (
            <div className="card shadow-lg text-dark">
                <div className="card-body text-center">

                    {/* Profile Image */}
                    <img
                        src={admin.profilePic || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="rounded-circle mb-3 border"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />

                    <h3 className="text-primary">{admin.name}</h3>
                    <p className="text-muted">{admin.email}</p>

                    <hr />

                    {/* Details */}
                    <div className="row text-start">

                        <div className="col-md-6 mb-3">
                            <strong>College Name:</strong>
                            <p>{admin.collegeName}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Phone:</strong>
                            <p>{admin.phone || "-"}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Designation:</strong>
                            <p>{admin.designation || "-"}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Department:</strong>
                            <p>{admin.department || "-"}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Common ID:</strong>
                            <p>{admin.commonId}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Status:</strong>
                            <p>
                                <span className={`badge ${admin.status === "Active" ? "bg-success" : "bg-danger"}`}>
                                    {admin.status}
                                </span>
                            </p>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="mt-3">
                        <button
                            className="btn btn-primary me-2"
                            onClick={() => navigate("/admin-dashboard/update")}
                        >
                            Edit Profile
                        </button>
                    </div>

                </div>
            </div>
    );
};

export default AdminProfile;