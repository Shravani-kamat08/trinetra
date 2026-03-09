import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './problemDetail.css';
import Navbar from '../Navbar';

const ProblemDetail = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    // Demo JSON Data Object (Preserved from your code)
    const problemData = {
        title: "AI-Powered Real-time Debris Tracking for Space Sustainability",
        psid: "SIH-2026-1024",
        subject: "Space Technology & Robotics",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
        meta: {
            category: "Software/AI",
            complexity: "High",
            estimatedTime: "6 Months",
            reward: "Patent Support & Funding"
        },
        description: `
        <p>Space debris is becoming a critical threat to global communication and navigation systems. With over 27,000 pieces of orbital debris currently tracked, the Kessler Syndrome—a theoretical scenario where the density of objects in Low Earth Orbit (LEO) is high enough that collisions between objects could cause a cascade—is becoming a reality.</p>
        
        <p><strong>The Challenge:</strong> Current tracking systems rely on ground-based radar, which lacks the precision required for small-scale debris detection. We need a decentralized, AI-driven platform that can ingest multi-source sensor data (optical, radar, and satellite-to-satellite) to predict collision paths within a 2-meter margin of error.</p>
        
        <p>The solution must be able to process terabytes of telemetry data in real-time, utilizing edge computing on orbital nodes. Furthermore, the submission should include a protocol for autonomous maneuver suggestions for active satellites to avoid identified debris clouds without human intervention.</p>
        
        <p><em>(Repeat or expand this content to fulfill the 2000-word requirement as per your specific problem statement details...)</em></p>
    `
    };

    useEffect(() => {
        // Simulate fetching data or just setting it from the object
        setData(problemData);
    }, []);

    if (!data) return <div className="problem-container">Loading...</div>;

    return (
        <>
            <Navbar />

            <main className="problem-container">
                <div className="problem-header">
                    <span className="subject-badge" id="display-subject">
                        Subject: {data.subject}
                    </span>
                    <h1 id="display-title">{data.title}</h1>
                    <p className="ps-id" id="display-psid">
                        Problem Statement ID: {data.psid}
                    </p>
                </div>

                <div className="problem-layout">
                    <article className="problem-content">
                        <div className="featured-image">
                            <img id="display-image" src={data.image} alt="Problem Image" />
                        </div>

                        <section className="description">
                            <h3>Detailed Problem Description</h3>
                            {/* Using dangerouslySetInnerHTML to render the HTML tags from your description string */}
                            <div
                                className="text-block"
                                id="display-description"
                                dangerouslySetInnerHTML={{ __html: data.description }}
                            />
                        </section>
                    </article>

                    <aside className="problem-sidebar">
                        <div className="sticky-card">
                            <h4>Innovation Stats</h4>
                            <div id="display-meta">
                                <ul>
                                    {Object.entries(data.meta).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
        </>
    );
};

export default ProblemDetail;