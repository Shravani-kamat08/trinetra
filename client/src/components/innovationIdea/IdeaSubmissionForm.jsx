import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './IdeaSubmissionForm.css'
import api from '../../util/api';

const IdeaSubmissionForm = ({ student, problem }) => {
    const navigate = useNavigate();

    const userMode = localStorage.getItem("userMode ")
    console.log(userMode, student)
    console.log("problem : ", problem)

    const [currentStep, setCurrentStep] = useState(1);
    const [showModal, setShowModal] = useState(false);

    // Student fields state
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

    // 🔹 AUTO FILL FIRST STUDENT
    useEffect(() => {
        if (student) {
            setStudents([
                {
                    id: Date.now(),
                    name: student.fullName?.toUpperCase() || '',
                    email: student.email || '',
                    dept: student.branch || '',
                    year: student.classYear || ''
                }
            ]);
        }
    }, [student]);

    const getWordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

    const changeStep = (n) => {
        if (n === 1) {
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

    // ADD STUDENT
    const addStudent = () => {
        if (students.length >= 3) {
            alert("Maximum 3 students allowed.");
            return;
        }
        setStudents([...students, { id: Date.now(), name: '', email: '', dept: '', year: '' }]);
    };

    // REMOVE STUDENT
    const removeStudent = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    // UPDATE STUDENT
    const updateStudent = (id, field, value) => {
        const updated = students.map(s => {
            if (s.id === id) {
                return { ...s, [field]: field === 'name' ? value.toUpperCase() : value };
            }
            return s;
        });
        setStudents(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById("fileUpload");
        const file = fileInput?.files[0];

        if (file && file.size > 5 * 1024 * 1024) {
            alert("File size should not exceed 5MB.");
            return;
        }

        try {
            const payload = {
                problemId : problem._id,
                studentId: student?._id,
                students: students.map(({ id, ...rest }) => rest),
                ...projectData
            };
            if (file) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    payload.file = reader.result;
                    await api.post("/ideas/submit", payload);
                    setShowModal(true);
                };
                reader.readAsDataURL(file);
            } else {
                await api.post("/ideas/submit", payload);
                setShowModal(true);
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Submission failed");
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate("/dashboard")
    };

    const progressPercent = ((currentStep - 1) / 2) * 100;

    if (userMode === "Admin") {

        return (
            <div style={{ textAlign: "center", padding: "100px" }}>
                <h2>Admins cannot submit ideas</h2>
                <button onClick={() => navigate("/admin-dashboard")}>
                    Go to Admin Panel
                </button>
            </div>
        );

    }


    return (

        <div className="idea-submission-page">
            <div className="main">
                <div className="container">
                    <h2>Idea Submission Form</h2>
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                        <div className="steps">
                            <div className={`step-node ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                            <div className={`step-node ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                            <div className={`step-node ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                        </div>
                    </div>
                    <form id="ideaForm" onSubmit={handleSubmit}>
                        {/* STEP 1 */}
                        <div className={`form-step ${currentStep === 1 ? 'active' : ''}`} id="step1">
                            <div className="section-title">Step 1: Student Details (Min 1 - Max 3)</div>
                            <div id="studentsContainer">
                                {students.map((studentItem, index) => (
                                    <div className="student-box" key={studentItem.id}>
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="remove-btn"
                                                onClick={() => removeStudent(studentItem.id)}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        <label>Student Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            value={studentItem.name}
                                            readOnly={index === 0}
                                            onChange={(e) =>
                                                updateStudent(studentItem.id, 'name', e.target.value)
                                            }
                                        />
                                        <label>Email <span className="required">*</span></label>
                                        <input
                                            type="email"
                                            required
                                            value={studentItem.email}
                                            readOnly={index === 0}
                                            onChange={(e) =>
                                                updateStudent(studentItem.id, 'email', e.target.value)
                                            }
                                        />
                                        <label>Department <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            value={studentItem.dept}
                                            readOnly={index === 0}
                                            onChange={(e) =>
                                                updateStudent(studentItem.id, 'dept', e.target.value)
                                            }
                                        />
                                        <label>Year of Study <span className="required">*</span></label>
                                        <select
                                            required
                                            value={studentItem.year}
                                            disabled={index === 0}
                                            onChange={(e) =>
                                                updateStudent(studentItem.id, 'year', e.target.value)
                                            }
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
                            <button
                                type="button"
                                className="add-btn"
                                onClick={addStudent}
                            >
                                + Add Student
                            </button>
                            <div className="step-navigation">
                                <button
                                    type="button"
                                    className="next-btn"
                                    onClick={() => changeStep(1)}
                                >
                                    Next Step
                                </button>
                            </div>
                        </div>

                        {/* STEP 2 */}
                        <div className={`form-step ${currentStep === 2 ? 'active' : ''}`} id="step2">
                            <div className="section-title">Step 2: Project Details</div>
                            <label>Idea Title (Max 100 words) *</label>
                            <textarea
                                required
                                value={projectData.title}
                                onChange={(e) => {
                                    const words = e.target.value.trim().split(/\s+/);
                                    if (words.length <= 100) {
                                        setProjectData({
                                            ...projectData,
                                            title: e.target.value
                                        });
                                    }
                                }}
                            />

                            <div className="note">
                                {getWordCount(projectData.title)} / 100 words
                            </div>
                            <label>Project Category *</label>
                            <select
                                required
                                value={projectData.category}
                                onChange={(e) =>
                                    setProjectData({
                                        ...projectData,
                                        category: e.target.value
                                    })
                                }
                            >
                                <option value="">Select Category</option>
                                <option>Technology</option>
                                <option>AI/ML</option>
                                <option>Healthcare</option>
                                <option>Environment</option>
                                <option>Social Innovation</option>
                                <option>Entrepreneurship</option>
                            </select>

                            <label>Project Type *</label>
                            <select
                                required
                                value={projectData.type}
                                onChange={(e) =>
                                    setProjectData({
                                        ...projectData,
                                        type: e.target.value
                                    })
                                }
                            >
                                <option value="">Select Type</option>
                                <option>Hardware</option>
                                <option>Software</option>
                                <option>Hybrid</option>
                            </select>
{/* 
                            <label>Problem Statement *</label>
                            <textarea
                                required
                                value={projectData.problemStatement}
                                onChange={(e) =>
                                    setProjectData({
                                        ...projectData,
                                        problemStatement: e.target.value
                                    })
                                }
                            /> */}

                            <div className="step-navigation">

                                <button
                                    type="button"
                                    className="prev-btn"
                                    onClick={() => changeStep(-1)}
                                >
                                    Previous
                                </button>

                                <button
                                    type="button"
                                    className="next-btn"
                                    onClick={() => changeStep(1)}
                                >
                                    Next Step
                                </button>

                            </div>

                        </div>

                        {/* STEP 3 */}

                        <div className={`form-step ${currentStep === 3 ? 'active' : ''}`} id="step3">

                            <div className="section-title">Step 3: Innovation & Submission</div>

                            <label>Idea Description *</label>

                            <textarea
                                required
                                value={projectData.description}
                                onChange={(e) => {

                                    const words = e.target.value.trim().split(/\s+/);

                                    if (words.length <= 700) {

                                        setProjectData({
                                            ...projectData,
                                            description: e.target.value
                                        });

                                    }

                                }}
                            />

                            <div className="note">
                                {getWordCount(projectData.description)} / 700 words
                            </div>

                            <label>Innovation Type *</label>

                            <select
                                required
                                value={projectData.innovationType}
                                onChange={(e) =>
                                    setProjectData({
                                        ...projectData,
                                        innovationType: e.target.value
                                    })
                                }
                            >
                                <option value="">Select Type</option>
                                <option>New Concept</option>
                                <option>Improvement</option>
                                <option>Research-Based</option>
                                <option>According to Given Statement</option>
                            </select>

                            <label>Estimated Cost</label>

                            <input
                                type="number"
                                value={projectData.cost}
                                onChange={(e) =>
                                    setProjectData({
                                        ...projectData,
                                        cost: e.target.value
                                    })
                                }
                            />

                            <label>References</label>

                            <textarea
                                value={projectData.references}
                                onChange={(e) =>
                                    setProjectData({
                                        ...projectData,
                                        references: e.target.value
                                    })
                                }
                            />

                            <label>Upload Sketch (Max 5MB)</label>

                            <input type="file" id="fileUpload" />

                            <div className="step-navigation">

                                <button
                                    type="button"
                                    className="prev-btn"
                                    onClick={() => changeStep(-1)}
                                >
                                    Previous
                                </button>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                >
                                    Submit Idea
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

            {showModal && (

                <div className="modal" style={{ display: 'flex' }}>

                    <div className="modal-content">

                        <h3>✅ Idea Submitted Successfully!</h3>

                        <p>Your innovation has been recorded.</p>

                        <button
                            className="close-btn"
                            onClick={closeModal}
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
};

export default IdeaSubmissionForm;
