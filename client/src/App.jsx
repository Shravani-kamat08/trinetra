import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import ProtectRoute from './components/ProtectRoute';
import Login from './components/authContent/login';
import Register from './components/authContent/Register';
import ProblemDetail from './components/innovationIdea/ProblemDetail';
import TrinetraPlatform from "./components/innovationIdea/TrinetraPlatform";
import IdeaSubmissionForm from "./components/innovationIdea/IdeaSubmissionForm";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import Home from "./components/Home";

import api from "./util/api";

function App() {
  const [student, setStudent] = useState(null);
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const adminId = localStorage.getItem('userId')

    if (adminId) {
      const getAdmin = async (id) => {
        try {
          const res = await api.get(`/admin/${id}`);
          console.log(res.data)
          if (res.data.success) {
            setAdmin(res.data.data);
          }
        } catch (error) {
          console.log("Student fetch error", error);
        }
      };
      getAdmin(adminId);
    }
  }, [])

  useEffect(() => {
    const studentId = localStorage.getItem("userId");
    if (studentId) {
      const getStudent = async (id) => {
        try {
          const res = await api.get(`/students/${id}`);
          console.log(res.data.student)
          if (res.data.success) {
            setStudent(res.data.student);
          }
        } catch (error) {
          console.log("Student fetch error", error);
        }
      };
      getStudent(studentId);
    }

  }, []);



  return (
    <div className="App">

      {/* Pass student to Navbar */}
      <Navbar student={student} admin={admin} />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route element={<ProtectRoute />}>

          <Route path="/dashboard" element={<TrinetraPlatform />} />
          <Route path="/problem-statement" element={<ProblemDetail student={student} admin={admin} />} />
          <Route path="/trinetra-platform" element={<TrinetraPlatform />} />
          <Route path="/idea-submission" element={<IdeaSubmissionForm student={student} />} />

        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route
          path="*"
          element={
            <div className="section">
              <h2>404 - Page Not Found</h2>
            </div>
          }
        />

      </Routes>

    </div>
  );
}

export default App;