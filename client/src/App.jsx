import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/authContent/login';
import Register from './components/authContent/Register';
import ProblemDetail from './components/innovationIdea/ProblemDetail';
import TrinetraPlatform from "./components/innovationIdea/TrinetraPlatform";
import IdeaSubmissionForm from "./components/innovationIdea/IdeaSubmissionForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<TrinetraPlatform />} />

        {/* Other Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/problem-statement" element={<ProblemDetail />} />
        <Route path="/trinetra-platform" element={<TrinetraPlatform />} />
        <Route path="/idea-submission" element={<IdeaSubmissionForm />} />

        {/* 404 Page */}
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