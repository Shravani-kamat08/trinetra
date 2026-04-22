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
import IicTeam from "./components/iic/IicTeam"
import IicForm from "./components/iic/IicForm"
import PageNotFound from "./components/PageNotFound";
import Contact from "./components/Contact";

import api from "./util/api";
import StudentDashboard from "./components/authContent/StudentDashboard";
import About from "./components/About";
import IicMembersPage from "./components/IicMembersPage";

function App() {
  const [student, setStudent] = useState(null);
  const [admin, setAdmin] = useState(null)
  const [adminId, setAdminId] = useState(localStorage.getItem('userId'));
  const [problem, setProblem] = useState(null);

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

  useEffect(() => {
    const studentId = localStorage.getItem("userId");
    if (studentId) {
      const getStudent = async (id) => {
        try {
          const res = await api.get(`/students/${id}`);
          console.log(res.data.student)
          if (res.data.success) {
            setStudent(res.data.student);
            getAdmin(res.data.student.adminId);
          }
        } catch (error) {
          console.log("Student fetch error", error);
        }
      };
      getStudent(studentId);
    }

  }, []);

  useEffect(() => {
    if (adminId) {
      getAdmin(adminId);
    }
  }, [])

  return (
    <div className="App">

      {/* Pass student to Navbar */}
      <Navbar student={student} admin={admin} />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route element={<ProtectRoute />}>

          <Route path="/dashboard" element={<TrinetraPlatform student={student} admin={admin} />} />
          <Route path="/problem-statement" element={<ProblemDetail student={student} admin={admin} setProblem={setProblem} />} />
          <Route path="/trinetra-platform" element={<TrinetraPlatform />} />
          <Route path="/idea-submission" element={<IdeaSubmissionForm student={student} problem={problem} />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          {/* <Route path="/iic-team-council" element={<IicTeam />} /> */}
          <Route path="/iic-team-council" element={<IicMembersPage />} />
          <Route path="/iic-team-council/create" element={<IicForm />} />
          
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route
          path="*"
          element={
            <PageNotFound />
          }
        />

      </Routes>

    </div>
  );
}

export default App;