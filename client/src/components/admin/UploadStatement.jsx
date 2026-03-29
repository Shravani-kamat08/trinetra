import React, { useState } from "react";
import api from "../../util/api";

const UploadStatement = () => {

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [domain, setDomain] = useState("");
    const [complexity, setComplexity] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [reward, setReward] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);


    const submitStatement = async () => {

        if (!title || !subject || !domain) {
            alert("Please fill required fields");
            return;
        }

        const problemData = {
            title,
            subject,
            category: domain,
            complexity,
            estimatedTime,
            reward,
            image,
            description,
            startDate,
            endDate,
            adminId : localStorage.getItem('userId')
        };

        try {

            const response = await api.post("/problems/create", problemData);


            const data = await response.data;

            if (data.success) {

                setShowSuccess(true);

                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);

                setTitle("");
                setSubject("");
                setDomain("");
                setComplexity("");
                setEstimatedTime("");
                setReward("");
                setImage("");
                setDescription("");
                setStartDate("");
                setEndDate("");

            } else {
                alert("Error saving problem statement");
            }

        } catch (error) {

            console.error(error);
            alert("Server Error");

        }

    };


    return (

        <div className="form-container">

            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                Submit Problem Statement
            </h3>

            <div
                className="success-box"
                style={{ display: showSuccess ? "block" : "none" }}
            >
                Statement uploaded successfully
            </div>

            {/* Title */}
            <div className="form-group">
                <label>Idea Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Subject */}
            <div className="form-group">
                <label>Subject</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>

            {/* Category */}
            <div className="form-group">
                <label>Category</label>

                <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option>Software/AI</option>
                    <option>Hardware</option>
                    <option>Healthcare</option>
                    <option>Environment</option>
                    <option>Social Innovation</option>
                    <option>Entrepreneurship</option>
                </select>
            </div>

            {/* Complexity */}
            <div className="form-group">
                <label>Complexity Level</label>

                <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                >
                    <option value="">Select Complexity</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>

            {/* Estimated Time */}
            <div className="form-group">
                <label>Estimated Completion Time</label>
                <input
                    type="text"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                />
            </div>

            {/* Reward */}
            <div className="form-group">
                <label>Reward / Incentives</label>
                <input
                    type="text"
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                />
            </div>

            {/* Image */}
            <div className="form-group">
                <label>Problem Image URL</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>

            {/* Description */}
            <div className="form-group">
                <label>Description</label>

                <textarea
                    rows="6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>

            {/* Start Date */}
            <div className="form-group">
                <label>Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            {/* End Date */}
            <div className="form-group">
                <label>End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <button className="btn" onClick={submitStatement}>
                Submit
            </button>

        </div>

    );
};

export default UploadStatement;