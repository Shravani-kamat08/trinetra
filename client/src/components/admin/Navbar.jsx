import React from "react";

const Navbar = ({ toggleSidebar }) => {

    return (

        <div className="navbar">
            <i className="fa fa-bars menu-toggle" onClick={toggleSidebar}></i>
        </div>

    );
};

export default Navbar;
