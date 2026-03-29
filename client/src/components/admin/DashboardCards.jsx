import React from "react";

const DashboardCards = ({ total, approved, pending, rejected, ideas = [], onCardClick }) => {

    const handleClick = (type) => {
        let filtered = [];

        if (type === "total") {
            filtered = ideas;
        } else if (type === "approved") {
            filtered = ideas.filter(i => i.approvedStatus === "approved");
        } else if (type === "pending") {
            filtered = ideas.filter(i => i.approvedStatus === "drop");
        } else if (type === "rejected") {
            filtered = ideas.filter(i => i.approvedStatus === "reject");
        }

        onCardClick(filtered);
    };

    return (

        <div className="cards">

            <div className="card blue" onClick={() => handleClick("total")} style={{ cursor: "pointer" }}>
                <div>
                    <h4>{total}</h4>
                    <p>Total Ideas</p>
                </div>
                <i className="fa fa-lightbulb"></i>
            </div>

            <div className="card green" onClick={() => handleClick("approved")} style={{ cursor: "pointer" }}>
                <div>
                    <h4>{approved}</h4>
                    <p>Approved</p>
                </div>
                <i className="fa fa-check-circle"></i>
            </div>

            <div className="card orange" onClick={() => handleClick("pending")} style={{ cursor: "pointer" }}>
                <div>
                    <h4>{pending}</h4>
                    <p>Pending</p>
                </div>
                <i className="fa fa-hourglass-half"></i>
            </div>

            <div className="card red" onClick={() => handleClick("rejected")} style={{ cursor: "pointer" }}>
                <div>
                    <h4>{rejected}</h4>
                    <p>Rejected</p>
                </div>
                <i className="fa fa-times-circle"></i>
            </div>

        </div>

    );
};

export default DashboardCards;