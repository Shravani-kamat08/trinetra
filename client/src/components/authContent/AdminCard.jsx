import React from "react";

const AdminCard = ({ admin }) => {
    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-3">Admin Info</h2>
            <p className="info-item">
                <strong className="label">Name:</strong>
                <span className="value">{admin?.name}</span>
            </p>
            <p className="info-item">
                <strong className="label">Email:</strong>
                <span className="value">{admin?.email}</span>
            </p>
        </div>
    );
};

export default AdminCard;