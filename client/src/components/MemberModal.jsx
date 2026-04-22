import React from "react";

const MemberModal = ({ title, members, onClose }) => {
    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">

                    {/* Header */}
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        <div className="row g-4">
                            {members.map((m) => (
                                <div className="col-md-4" key={m._id}>
                                    <div className="card text-center shadow border-0 h-100">
                                        <div className="card-body">
                                            <img
                                                src={m.profilePic || "/default.png"}
                                                alt={m.name}
                                                className="rounded-circle mb-3"
                                                style={{
                                                    width: "90px",
                                                    height: "90px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                            <h6>{m.name}</h6>
                                            <p className="text-secondary small">{m.department}</p>
                                            <p className="small text-muted">{m.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* backdrop */}
            <div className="modal-backdrop fade show"></div>
        </div>
    );
};

export default MemberModal;