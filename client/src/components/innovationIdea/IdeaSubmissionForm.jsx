import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './IdeaSubmissionForm.css'

const IdeaSubmissionForm = () => {
    const navigate = useNavigate();

    // --- STATE MANAGEMENT ---
    const [currentStep, setCurrentStep] = useState(1);
    const [showModal, setShowModal] = useState(false);

    // Student fields state (Starts with 1 student)
    const [students, setStudents] = useState([
        { id: Date.now(), name: '', email: '', dept: '', year: '' }
    ]);

    // Project details state
    const [projectData, setProjectData] = useState({
        title: '',
        category: '',
        type: '',
        problemStatement: '',
        description: '',
        innovationType: '',
        cost: '',
        references: ''
    });

    // --- WORD COUNTERS ---
    const getWordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

    // --- STEP NAVIGATION & VALIDATION ---
    const changeStep = (n) => {
        if (n === 1) {
            // Basic HTML5 validation check for the current active step
            const currentStepEl = document.getElementById(`step${currentStep}`);
            const inputs = currentStepEl.querySelectorAll("input[required], select[required], textarea[required]");

            for (let input of inputs) {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    return;
                }
            }
        }
        setCurrentStep((prev) => prev + n);
    };

    // --- STUDENT DYNAMIC FIELDS ---
    const addStudent = () => {
        if (students.length >= 3) {
            alert("Maximum 3 students allowed.");
            return;
        }
        setStudents([...students, { id: Date.now(), name: '', email: '', dept: '', year: '' }]);
    };

    const removeStudent = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    const updateStudent = (id, field, value) => {
        const updated = students.map(s => {
            if (s.id === id) {
                return { ...s, [field]: field === 'name' ? value.toUpperCase() : value };
            }
            return s;
        });
        setStudents(updated);
    };

    // --- FORM SUBMISSION ---
    const handleSubmit = (e) => {
        e.preventDefault();
        const fileInput = document.getElementById("fileUpload");
        const file = fileInput?.files[0];

        if (file && file.size > 5 * 1024 * 1024) {
            alert("File size should not exceed 5MB.");
            return;
        }

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        navigate(0); // Reloads the current route to reset
    };

    // --- PROGRESS BAR CALCULATION ---
    const progressPercent = ((currentStep - 1) / 2) * 100;

    return (
        <div className="idea-submission-page">
            <div className="main">
                <div className="container">
                    <h2>Idea Submission Form</h2>

                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            id="progressBar"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                        <div className="steps">
                            <div className={`step-node ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                            <div className={`step-node ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                            <div className={`step-node ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                        </div>
                    </div>

                    <form id="ideaForm" onSubmit={handleSubmit}>

                        {/* STEP 1: STUDENT DETAILS */}
                        <div className={`form-step ${currentStep === 1 ? 'active' : ''}`} id="step1">
                            <div className="section-title">Step 1: Student Details (Min 1 - Max 3)</div>
                            <div id="studentsContainer">
                                {students.map((student, index) => (
                                    <div className="student-box" key={student.id}>
                                        {index > 0 && (
                                            <button type="button" className="remove-btn" onClick={() => removeStudent(student.id)}>Cancel</button>
                                        )}
                                        <label>Student Name (LAST FIRST MIDDLE) <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            className="student-name"
                                            placeholder="LastName FirstName MiddleName"
                                            required
                                            value={student.name}
                                            onChange={(e) => updateStudent(student.id, 'name', e.target.value)}
                                        />

                                        <label>Email <span className="required">*</span></label>
                                        <input
                                            type="email"
                                            placeholder="student@example.com"
                                            required
                                            value={student.email}
                                            onChange={(e) => updateStudent(student.id, 'email', e.target.value)}
                                        />

                                        <label>Department <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Computer Engineering"
                                            required
                                            value={student.dept}
                                            onChange={(e) => updateStudent(student.id, 'dept', e.target.value)}
                                        />

                                        <label>Year of Study <span className="required">*</span></label>
                                        <select
                                            required
                                            value={student.year}
                                            onChange={(e) => updateStudent(student.id, 'year', e.target.value)}
                                        >
                                            <option value="">Select Year</option>
                                            <option>First Year</option>
                                            <option>Second Year</option>
                                            <option>Third Year</option>
                                            <option>Final Year</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="add-btn" onClick={addStudent}>+ Add Student</button>
                            <div className="step-navigation">
                                <button type="button" className="next-btn" onClick={() => changeStep(1)}>Next Step</button>
                            </div>
                        </div>

                        {/* STEP 2: PROJECT DETAILS */}
                        <div className={`form-step ${currentStep === 2 ? 'active' : ''}`} id="step2">
                            <div className="section-title">Step 2: Project Details</div>

                            <label>Idea Title (Max 100 words) <span className="required">*</span></label>
                            <textarea
                                id="title"
                                required
                                value={projectData.title}
                                onChange={(e) => {
                                    const words = e.target.value.trim().split(/\s+/);
                                    if (words.length <= 100) setProjectData({ ...projectData, title: e.target.value });
                                }}
                            ></textarea>
                            <div className="note" id="titleCount">{getWordCount(projectData.title)} / 100 words</div>

                            <label>Project Category <span className="required">*</span></label>
                            <select
                                required
                                value={projectData.category}
                                onChange={(e) => setProjectData({ ...projectData, category: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                <option>Technology</option>
                                <option>AI/ML</option>
                                <option>Healthcare</option>
                                <option>Environment</option>
                                <option>Social Innovation</option>
                                <option>Entrepreneurship</option>
                            </select>

                            <label>Project Type (Hardware / Software) <span className="required">*</span></label>
                            <select
                                required
                                value={projectData.type}
                                onChange={(e) => setProjectData({ ...projectData, type: e.target.value })}
                            >
                                <option value="">Select Type</option>
                                <option>Hardware</option>
                                <option>Software</option>
                                <option>Hybrid (Hardware + Software)</option>
                            </select>

                            <label>Problem Statement <span className="required">*</span></label>
                            <textarea
                                placeholder="Describe the problem your idea solves..."
                                required
                                value={projectData.problemStatement}
                                onChange={(e) => setProjectData({ ...projectData, problemStatement: e.target.value })}
                            ></textarea>

                            <div className="step-navigation">
                                <button type="button" className="prev-btn" onClick={() => changeStep(-1)}>Previous</button>
                                <button type="button" className="next-btn" onClick={() => changeStep(1)}>Next Step</button>
                            </div>
                        </div>

                        {/* STEP 3: INNOVATION & SUBMISSION */}
                        <div className={`form-step ${currentStep === 3 ? 'active' : ''}`} id="step3">
                            <div className="section-title">Step 3: Innovation & Submission</div>

                            <label>Idea Description (Max 700 words) <span className="required">*</span></label>
                            <textarea
                                id="description"
                                required
                                value={projectData.description}
                                onChange={(e) => {
                                    const words = e.target.value.trim().split(/\s+/);
                                    if (words.length <= 700) setProjectData({ ...projectData, description: e.target.value });
                                }}
                            ></textarea>
                            <div className="note" id="descCount">{getWordCount(projectData.description)} / 700 words</div>

                            <label>Innovation Type <span className="required">*</span></label>
                            <select
                                required
                                value={projectData.innovationType}
                                onChange={(e) => setProjectData({ ...projectData, innovationType: e.target.value })}
                            >
                                <option value="">Select Type</option>
                                <option>New Concept</option>
                                <option>Improvement of Existing System</option>
                                <option>Research-Based</option>
                                <option>According to Given Statement</option>
                            </select>

                            <label>Estimated Cost (Optional)</label>
                            <input
                                type="number"
                                placeholder="Approximate cost in INR"
                                value={projectData.cost}
                                onChange={(e) => setProjectData({ ...projectData, cost: e.target.value })}
                            />

                            <label>References (Optional)</label>
                            <textarea
                                placeholder="Mention references if any..."
                                value={projectData.references}
                                onChange={(e) => setProjectData({ ...projectData, references: e.target.value })}
                            ></textarea>

                            <label>Upload Sketch/Design (Optional, Max 5MB)</label>
                            <input type="file" id="fileUpload" />

                            <div className="step-navigation">
                                <button type="button" className="prev-btn" onClick={() => changeStep(-1)}>Previous</button>
                                <button type="submit" className="submit-btn">Submit Idea</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            {/* SUCCESS MODAL */}
            {showModal && (
                <div className="modal" id="successModal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <h3>✅ Idea Submitted Successfully!</h3>
                        <p>Your innovation has been recorded.</p>
                        <button className="close-btn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IdeaSubmissionForm;