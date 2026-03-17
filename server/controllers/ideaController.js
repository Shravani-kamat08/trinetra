const Idea = require("../models/ideaModel");

exports.submitIdea = async (req, res) => {
    try {

        const {
            students,
            studentId,
            problemId,
            title,
            category,
            type,
            problemStatement,
            description,
            innovationType,
            cost,
            references
        } = req.body;

        if (!students || students.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one student is required"
            });
        }

        if (!studentId) {
            return res.status(400).json({
                success: false,
                message: "Student ID is required"
            });
        }

        if (!problemId) {
            return res.status(400).json({
                success: false,
                message: "Problem ID is required"
            });
        }

        const newIdea = new Idea({
            students,
            studentId,
            problemId,
            title,
            category,
            type,
            problemStatement,
            description,
            innovationType,
            cost,
            references,
            file: req.body.file || null
        });

        await newIdea.save();

        res.status(201).json({
            success: true,
            message: "Idea submitted successfully",
            idea: newIdea
        });

    } catch (error) {

        console.error("Idea Submission Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });

    }
};