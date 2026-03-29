import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './problemDetail.css';
import api from '../../util/api';

const ProblemDetail = ({ student, admin, setProblem }) => {
    console.log(student, admin)
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const getProblem = async (adminId) => {
            try {
                const res = await api.get(`/problems/admin/${adminId}`);
                if (res.data.success && res.data.data.length > 0) {
                    setProblem(res.data.data[0])
                    setData(res.data.data[0]);
                }
            } catch (error) {
                console.log("Problem fetch error:", error);
            }
        };

        if (student?.adminId) {
            getProblem(student.adminId);
        }else{
            getProblem(admin?._id)
        }

    }, [student]);


    if (!data) {
        return <div className="problem-container">Loading...</div>;
    }

    return (

        <main className="problem-container">

            <div className="problem-header">

                <span className="subject-badge">
                    Subject: {data.subject}
                </span>

                <h1>{data.title}</h1>

                <p className="ps-id">
                    Problem ID: {data._id}
                </p>

            </div>


            <div className="problem-layout">

                <article className="problem-content">

                    {data.image && (
                        <div className="featured-image">
                            <img src={data.image} alt="Problem" />
                        </div>
                    )}

                    <section className="description">

                        <h3>Detailed Problem Description</h3>

                        <div
                            className="text-block"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />

                    </section>

                </article>


                <aside className="problem-sidebar">

                    <div className="sticky-card">

                        <h4>Innovation Stats</h4>

                        <ul>

                            <li>
                                <strong>Category:</strong> {data.category}
                            </li>

                            <li>
                                <strong>Complexity:</strong> {data.complexity}
                            </li>

                            <li>
                                <strong>Estimated Time:</strong> {data.estimatedTime}
                            </li>

                            <li>
                                <strong>Reward:</strong> {data.reward}
                            </li>

                            <li>
                                <strong>Status:</strong> {data.status}
                            </li>

                            <li>
                                <strong>Start Date:</strong> {new Date(data.startDate).toLocaleDateString()}
                            </li>

                            <li>
                                <strong>End Date:</strong> {new Date(data.endDate).toLocaleDateString()}
                            </li>

                        </ul>

                        <hr style={{ margin: '10px 0' }} />

                        <div className="main-btns">

                            <button
                                onClick={() => navigate('/idea-submission')}
                                className="btn-primary-hero"
                            >
                                Drop your idea
                            </button>

                        </div>

                    </div>

                </aside>

            </div>

        </main>
    );
};

export default ProblemDetail;