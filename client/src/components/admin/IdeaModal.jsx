import React, { useState } from "react";
import "./IdeaModal.css";
import api from "../../util/api";

const IdeaModal = ({ idea, onClose, onUpdateMarks, isAdmin = true, updateStatus }) => {
    const [scores, setScores] = useState({
        innovation: 1,
        feasibility: 1,
        costing: 1,
        completeness: 1,
        titlePoints: idea?.title ? 10 : 0,
        descriptionPoints: idea?.description ? 10 : 0,
        filePoints: idea?.file ? 10 : 0
    });

    if (!idea) return null;

    const handleScoreChange = (field, value) => {
        setScores(prev => ({ ...prev, [field]: Number(value) }));
    };

    const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);

    // ✅ FIXED FUNCTION
    const handleSaveMarks = async () => {
        try {
            const marksArray = Object.values(scores);

            const res = await api.put(`/ideas/manual-marks/${idea._id}`, {
                marks: marksArray
            });

            if (res?.data?.success) {

                // ✅ FIX: prevent crash
                if (onUpdateMarks && typeof onUpdateMarks === "function") {
                    onUpdateMarks(idea._id, totalPoints, scores);
                }

                alert("Marks saved successfully");
            } else {
                alert(res?.data?.message || "Failed to save marks");
            }

        } catch (error) {
            console.error("Save Marks Error:", error);
            alert(error?.response?.data?.message || "Error saving marks");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2>{idea?.title ?? "Untitled Idea"}</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close">
                        &times;
                    </button>
                </div>

                <div className="badge-row">
                    {idea?.category && <span className="badge category">{idea.category}</span>}
                    {idea?.type && <span className="badge type">{idea.type}</span>}
                    {idea?.approvedStatus && (
                        <span className={`badge ${idea.approvedStatus}`}>
                            {idea.approvedStatus === "starIdea" ? "⭐ Star Idea" : idea.approvedStatus}
                        </span>
                    )}
                    <span className="badge rating">
                        ⭐ {idea?.rating ?? 0}
                    </span>
                    <span className="badge score-summary">
                        📊 AI analysis: {totalPoints * 2}%
                    </span>
                    {idea.approvedStatus !== "approved" && (
                        <button
                            className="icon-btn approve-btn"
                            title="Approve"
                            onClick={() => updateStatus(idea._id, "approved")}
                        >
                            <i className="fa fa-check"></i>
                        </button>
                    )}
                </div>

                <div className="modal-grid">
                    {idea?.description && (
                        <div className="description-section full-width">
                            <h4>Solution Description</h4>
                            <p>{idea.description}</p>
                        </div>
                    )}

                    {idea?.innovationType && (
                        <div className="card">
                            <h4>Innovation Type</h4>
                            <p>{idea.innovationType}</p>
                        </div>
                    )}

                    {idea?.cost !== undefined && (
                        <div className="card">
                            <h4>Estimated Cost</h4>
                            <p>₹ {Number(idea.cost).toLocaleString('en-IN')}</p>
                        </div>
                    )}

                    {idea?.references && (
                        <div className="card full-width">
                            <h4>References & Links</h4>
                            <p>{idea.references}</p>
                        </div>
                    )}
                </div>

                {idea?.file && (
                    <div className="modal-footer">
                        <a
                            href={idea.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-btn"
                        >
                            📄 View Attached File
                        </a>
                    </div>
                )}

                {Array.isArray(idea?.students) && idea.students.length > 0 ? (
                    <div className="students-section">
                        <h3>Team Members</h3>
                        <div className="students-grid">
                            {idea.students.map((student, index) => (
                                <div key={student?._id || index} className="student-card">
                                    <h4>{student?.name ?? "Unknown Member"}</h4>
                                    {student?.email && <p className="student-email">{student.email}</p>}
                                    <span className="student-info">
                                        {student?.dept ?? "N/A"} • {student?.year ?? "N/A"} Year
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="students-section">
                        <p>No team members listed.</p>
                    </div>
                )}

                {isAdmin && idea.approvedStatus === "approved" && (
                    <div className="evaluation-container">
                        <h3>Evaluation Scorecard</h3>

                        <div className="evaluation-grid">
                            {[
                                { label: "Title Quality (0-10)", key: "titlePoints" },
                                { label: "Description Quality (0-10)", key: "descriptionPoints" },
                                { label: "File/Docs Quality (0-10)", key: "filePoints" }
                            ].map((item) => (
                                <div key={item.key} className="evaluation-row">
                                    <label>{item.label}</label>
                                    <select
                                        value={scores[item.key]}
                                        onChange={(e) => handleScoreChange(item.key, e.target.value)}
                                        className="select-10"
                                    >
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            {[
                                { label: "Innovation (1-5)", key: "innovation" },
                                { label: "Feasibility (1-5)", key: "feasibility" },
                                { label: "Costing (1-5)", key: "costing" },
                                { label: "Completeness (1-5)", key: "completeness" }
                            ].map((item) => (
                                <div key={item.key} className="evaluation-row">
                                    <label>{item.label}</label>
                                    <select
                                        value={scores[item.key]}
                                        onChange={(e) => handleScoreChange(item.key, e.target.value)}
                                    >
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>

                        <div className="evaluation-action">
                            <button
                                className="save-marks-btn"
                                onClick={handleSaveMarks}
                            >
                                Save Evaluation Marks ({totalPoints})
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IdeaModal;