import React from "react";

const DashboardCards = ({ total, approved, pending, rejected }) => {

    return (

        <div className="cards">

            <div className="card blue">
                <div>
                    <h4>{total}</h4>
                    <p>Total Ideas</p>
                </div>
                <i className="fa fa-lightbulb"></i>
            </div>

            <div className="card green">
                <div>
                    <h4>{approved}</h4>
                    <p>Approved</p>
                </div>
                <i className="fa fa-check-circle"></i>
            </div>

            <div className="card orange">
                <div>
                    <h4>{pending}</h4>
                    <p>Pending</p>
                </div>
                <i className="fa fa-hourglass-half"></i>
            </div>

            <div className="card red">
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