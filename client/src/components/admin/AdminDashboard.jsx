import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardCards from "./DashboardCards";
import UploadStatement from "./UploadStatement";
import ViewIdeas from "./ViewIdeas";
import api from "../../util/api"
import IdeaModal from "./IdeaModal";
import IicTeam from "../iic/IicTeam";
import AdminProfile from "./AdminProfile";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const adminId = localStorage.getItem('userId')

    const [activeSection, setActiveSection] = useState("dashboard");
    const [adminData, setAdminData] = useState(null);
    const [studentsByAdmin, setStudentsByAdmin] = useState([]);
    const [problemData, setProblemData] = useState([]);

    const [selectedProblemId, setSelectedProblemId] = useState(null);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [ideas, setIdeas] = useState([]);
    const [filteredIdeas, setFilteredIdeas] = useState([]);

    const [title, setTitle] = useState("");
    const [domain, setDomain] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [total, setTotal] = useState(0);
    const [approved, setApproved] = useState(0);
    const [pending, setPending] = useState(0);
    const [rejected, setRejected] = useState(0);

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchAdmin = async () => {
            const res = await api.get(`/admin/${adminId}`);
            const prob = await api.get(`/problems/admin/${adminId}`);
            const stud = await api.get(`/students/admin/${adminId}`)

            const problems = prob.data.data || [];
            console.log(stud.data.students)

            setProblemData(problems);
            setAdminData(res.data.data);
            setStudentsByAdmin(stud.data.students || []);

            // ✅ set default selected problem (first one)
            if (problems.length > 0) {
                setSelectedProblemId(problems[0]._id);
            }
        };

        fetchAdmin();
    }, []);

    const fetchIdeas = async () => {
        try {
            if (!selectedProblemId) return;

            const res = await api.get(`/ideas/problem/${selectedProblemId}`);
            const data = res.data.ideas || [];

            setIdeas(data);
            setFilteredIdeas(data);

            setTotal(data.length);
            setApproved(data.filter(i => i.approvedStatus === "approved").length);
            setPending(data.filter(i => i.approvedStatus === "drop").length);
            setRejected(data.filter(i => i.approvedStatus === "reject").length);

        } catch (error) {
            console.error("Error fetching ideas:", error);
        }
    };

    const likeIdea = (ideaId) => async () => {
        try {
            const res = await api.put(`/ideas/like/${ideaId}`);
            // Update the UI to reflect the like
            console.log("Liked idea:", res.data);
            fetchIdeas();
        } catch (error) {
            console.error("Error liking idea:", error);
        }
    }

    const deleteIdea = (ideaId) => async () => {
        try {
            const res = await api.delete(`/ideas/${ideaId}`);
            alert(res.data.message);
            fetchIdeas();
        } catch (error) {
            console.error("Error deleting idea:", error);
        }
    }

    useEffect(() => {
        fetchIdeas();
    }, [selectedProblemId]);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/ideas/status/${id}`, { status });
            fetchIdeas();
        } catch (err) {
            console.error(err);
        }
    };

    const toggleSidebar = () => {
        document.getElementById("sidebar").classList.toggle("collapsed");
        document.getElementById("main").classList.toggle("collapsed");
    };

    const submitStatement = () => {

        if (title === "" || domain === "" || startDate === "" || endDate === "") {
            alert("Please fill all fields");
            return;
        }

        const newIdea = {
            title,
            domain,
            startDate,
            endDate,
            status: "Pending"
        };

        setIdeas([...ideas, newIdea]);

        setTotal(total + 1);
        setPending(pending + 1);

        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);

        setTitle("");
        setDomain("");
        setStartDate("");
        setEndDate("");
    };

    const logout = () => {
        localStorage.clear();
        navigate("/admin-login");
        window.location.reload();
    };

    return (

        <div>

            <Sidebar
                setActiveSection={setActiveSection}
                logout={logout}
            />

            <div className="main" id="main">

                <Navbar toggleSidebar={toggleSidebar} adminData={adminData} />

                <div className="content">

                    {/* ✅ PROBLEM SELECT */}
                    {(activeSection === "dashboard" || activeSection === "view") &&
                        <select
                            className="problemSelector"
                            value={selectedProblemId || ""}
                            onChange={(e) => setSelectedProblemId(e.target.value)}
                        >
                            {problemData.map((prob, index) => (
                                <option key={prob._id} value={prob._id}>
                                    {prob.title || `Problem ${index + 1}`}
                                </option>
                            ))}
                        </select>
                    }

                    {activeSection === "dashboard" && (
                        <>
                            <DashboardCards
                                total={total}
                                approved={approved}
                                pending={pending}
                                rejected={rejected}
                                ideas={ideas}
                                onCardClick={setFilteredIdeas}
                            />

                            {filteredIdeas.length > 0 && (
                                <div className="idea-table-container">

                                    <table className="idea-table">
                                        <thead>
                                            <tr>
                                                <th>Idea Title</th>
                                                <th>First Student</th>
                                                <th>Total mark</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {[...filteredIdeas]
                                                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                                                .map((idea) => (
                                                    <tr key={idea._id}>
                                                        <td>{idea.title}</td>
                                                        <td>{idea.students?.[0]?.name}</td>

                                                        <td>
                                                            <span className="rating-badge">
                                                                {idea?.totalScore|| 0}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <button
                                                                className="icon-btn view-btn"
                                                                title="View"
                                                                onClick={() => {
                                                                    setSelectedIdea(idea);
                                                                    setShowModal(true);
                                                                }}
                                                            >
                                                                <i className="fa fa-eye"></i>
                                                            </button>

                                                            {idea.approvedStatus !== "approved" && (
                                                                <button
                                                                    className="icon-btn approve-btn"
                                                                    title="Approve"
                                                                    onClick={() => updateStatus(idea._id, "approved")}
                                                                >
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                            )}

                                                            {idea.approvedStatus !== "reject" && (
                                                                <button
                                                                    className="icon-btn reject-btn"
                                                                    title="Reject"
                                                                    onClick={() => updateStatus(idea._id, "reject")}
                                                                >
                                                                    <i className="fa fa-times"></i>
                                                                </button>
                                                            )}

                                                            {/* {idea.likeStamp != true && ( */}
                                                                <button
                                                                    className="icon-btn like-btn"
                                                                    title="Like"
                                                                    onClick={likeIdea(idea._id)}
                                                                >
                                                                    {idea.likeStamp ? (
                                                                        <i className="fa fa-heart liked-idea"></i>
                                                                    ) : (
                                                                    <i className="fa fa-heart"></i>
                                                                    ) }
                                                                </button>
                                                            {/* )} */}

                                                            <button className="icon-btn delete-btn" title="Delete" onClick={deleteIdea(idea._id)}>
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}

                    {activeSection === "upload" && (
                        <UploadStatement
                            title={title}
                            setTitle={setTitle}
                            domain={domain}
                            setDomain={setDomain}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            submitStatement={submitStatement}
                            showSuccess={showSuccess}
                        />
                    )}

                    {activeSection === "students" && (
                        <div style={{ padding: "20px" }}>
                            <h2>Students Section</h2>
                            <p>This section will display all students who have submitted ideas for the selected problem.</p>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile No.</th>
                                        <th>class/Year</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {studentsByAdmin.map((student) => (
                                        <tr key={student._id}>
                                            <td>
                                                <img className="adminDashboard-img" src={student.profilePic} alt="Img not found" width="50" height="50" />
                                                </td>
                                            <td>{student.fullName}</td>
                                            <td>{student.email}</td>
                                            <td>{student.phone}</td>
                                            <td>{student.classYear}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeSection === "iic-team" && (
                        <IicTeam />
                    )}


                    {activeSection === "view" && (
                        <ViewIdeas ideas={ideas} />
                    )}

                    {activeSection === "profile" && (
                        <AdminProfile />
                    )}

                </div>

            </div>

            {showModal && (
                <IdeaModal
                    idea={selectedIdea}
                    onClose={() => setShowModal(false)}
                    updateStatus={updateStatus}
                />
            )}
        </div>

    );
};

export default AdminDashboard;