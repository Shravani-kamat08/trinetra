import React from "react";

const AdminCard = ({ admin }) => {
    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-3">Admin Info</h2>
            <div className="info-group">
                <label> Name : </label>
                <p>{admin?.name || "—"}</p>
            </div>

            <div className="info-group">
                <label> Email : </label>
                <p>{admin?.email || "—"}</p>
            </div>
        </div>
    );
};

export default AdminCard;