
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

// ✅ ADD MANUAL MARKS + CALCULATE TOTAL SCORE + RATING + RANK
exports.addManualMarksAndRank = async (req, res) => {
    try {
        const { marks } = req.body;

        if (!marks || !Array.isArray(marks)) {
            return res.status(400).json({
                success: false,
                message: "Marks must be an array"
            });
        }

        const idea = await Idea.findById(req.params.id);

        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found"
            });
        }

        // ✅ Store manual marks (array)
        idea.manualMarks = marks;

        // ✅ Step 1: sum all elements of manualMarks array
        const manualTotal = marks.reduce((sum, value) => {
            return sum + Number(value || 0);
        }, 0);

        // ✅ Step 2: get autoPoints
        const autoScore = Number(idea.autoPoints || 0);

        // ✅ Step 3: final totalScore
        const totalScore = manualTotal + autoScore;

        // ✅ Store totalScore (single number)
        idea.totalScore = totalScore;

        // ✅ Convert to 5-star rating
        let rating = (totalScore / 100) * 5;
        rating = Math.min(5, Math.max(0, rating));
        idea.rating = Math.round(rating * 10) / 10;

        await idea.save();

        // ✅ UPDATED: Rank ONLY approved ideas
        const ideas = await Idea.find({
            problemId: idea.problemId,
            approvedStatus: "approved"
        }).sort({ rating: -1 });

        for (let i = 0; i < ideas.length; i++) {
            ideas[i].rank = i + 1;
            await ideas[i].save();
        }

        res.json({
            success: true,
            message: "Total score calculated and stored (ranking only for approved ideas)",
            totalScore,
            idea
        });

    } catch (error) {
        console.error("Manual Marks Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// like or unlike an idea
exports.toggleLike = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found"
            });
        }

        idea.likeStamp = !idea.likeStamp;
        await idea.save();
        res.json({
            success: true,
            message: idea.likeStamp ? "Idea liked" : "Idea unliked",
            likeStamp: idea.likeStamp
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// delete an idea
exports.deleteIdea = async (req, res) => {
    try {
        const idea = await Idea.findByIdAndDelete(req.params.id);

        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found"
            });
        }

        res.json({
            success: true,
            message: "Idea deleted successfully"
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}