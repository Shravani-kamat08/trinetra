import React, { useState } from "react";
import "./AdminLogin.css";
import api from "../../util/api";
import { useNavigate } from "react-router-dom";

const AdminAuth = () => {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [collegeName, setCollegeName] = useState("");
    const [phone, setPhone] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    /* LOGIN FUNCTION */

    const login = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/admin/login", {
                email,
                password
            });
            console.log(res.data);

            localStorage.setItem("userId", res.data.adminId);
            localStorage.setItem("userMode ", "Admin");
            navigate("/admin-dashboard");
            window.location.reload();

        } catch (error) {

            alert(error.response?.data?.message || "Invalid Credentials");

        }

    };



    /* REGISTER FUNCTION */

    const register = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/admin/register", {
                name,
                collegeName,
                phone,
                designation,
                department,
                email,
                password
            });

            console.log(res.data);

            localStorage.setItem("userId", res.data.adminId);
            window.location.reload();

            navigate("/admin-dashboard");

        } catch (error) {

            alert(error.response?.data?.message || "Registration Failed");

        }

    };


    /* SWITCH FORM */

    const switchForm = () => {

        setIsLogin(!isLogin);

        setName("");
        setCollegeName("");
        setPhone("");
        setDesignation("");
        setDepartment("");
        setEmail("");
        setPassword("");

    };


    return (

        <div className="login-container">

            <h2>
                <i className="fa-solid fa-user-shield"></i>
                {isLogin ? " Admin Login" : " Admin Register"}
            </h2>


            {isLogin ? (

                /* LOGIN FORM */

                <form onSubmit={login}>

                    <div className="form-group">
                        <i className="fa-solid fa-envelope"></i>

                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <i className="fa-solid fa-lock"></i>

                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit">Login</button>

                </form>

            ) : (

                /* REGISTER FORM */

                <form onSubmit={register}>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Admin Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="College Name"
                            required
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Designation"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit">Register</button>

                </form>

            )}


            {/* TOGGLE LOGIN / REGISTER */}

            <div className="switch-form">

                {isLogin ? (

                    <p>
                        New Admin?
                        <span onClick={switchForm}>
                            Register Here
                        </span>
                    </p>

                ) : (

                    <p>
                        Already have an account?
                        <span onClick={switchForm}>
                            Login Here
                        </span>
                    </p>

                )}

            </div>


            <div className="footer">
                Idea Management System
            </div>

        </div>

    );

};

export default AdminAuth;