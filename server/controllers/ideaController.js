
const Idea = require("../models/ideaModel");

// ✅ SUBMIT IDEA
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



// ✅ 1. GET IDEA BY ID
exports.getIdeaById = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found"
            });
        }

        res.json({ success: true, idea });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// ✅ 2. GET IDEAS BY STUDENT ID
exports.getIdeasByStudentId = async (req, res) => {
    try {
        const ideas = await Idea.find({ studentId: req.params.studentId });

        res.json({
            success: true,
            count: ideas.length,
            ideas
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// ✅ 3. GET IDEAS BY PROBLEM ID
exports.getIdeasByProblemId = async (req, res) => {
    try {
        const ideas = await Idea.find({ problemId: req.params.problemId });

        res.json({
            success: true,
            count: ideas.length,
            ideas
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// ✅ 4. COUNT DROPPED IDEAS BY PROBLEM ID
exports.countDroppedIdeasByProblemId = async (req, res) => {
    try {
        const count = await Idea.countDocuments({
            problemId: req.params.problemId,
            approvedStatus: "drop"
        });

        res.json({
            success: true,
            problemId: req.params.problemId,
            droppedCount: count
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// ✅ 5. UPDATE APPROVAL STATUS
exports.updateIdeaStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const validStatus = ["approved", "drop", "reject", "starIdea"];

        if (!validStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
            { approvedStatus: status },
            { new: true }
        );

        if (!updatedIdea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found"
            });
        }

        res.json({
            success: true,
            message: "Status updated successfully",
            idea: updatedIdea
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};