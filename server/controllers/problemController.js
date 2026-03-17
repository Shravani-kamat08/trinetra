const ProblemStatement = require("../models/ProblemStatement");

/* CREATE PROBLEM STATEMENT */
exports.createProblem = async (req, res) => {

    try {

        const {
            title,
            subject,
            image,
            category,
            complexity,
            estimatedTime,
            reward,
            description,
            startDate,
            endDate,
            adminId
        } = req.body;

        if (!title || !description || !adminId) {
            return res.status(400).json({
                success: false,
                message: "Title, Description and AdminId are required"
            });
        }

        const newProblem = new ProblemStatement({
            title,
            adminId,
            subject,
            image,
            category,
            complexity,
            estimatedTime,
            reward,
            description,
            startDate,
            endDate
        });

        const savedProblem = await newProblem.save();

        res.status(201).json({
            success: true,
            message: "Problem Statement Created Successfully",
            data: savedProblem
        });

    } catch (error) {

        console.error("Create Problem Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

/* GET ALL PROBLEM STATEMENTS */
exports.getAllProblems = async (req, res) => {

    try {

        const problems = await ProblemStatement
            .find()
            .populate("adminId", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: problems.length,
            data: problems
        });

    } catch (error) {

        console.error("Get Problems Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

/* GET PROBLEMS BY ADMIN ID */
exports.getProblemsByAdmin = async (req, res) => {
    try {

        const { adminId } = req.params;

        const problems = await ProblemStatement
            .find({ adminId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: problems.length,
            data: problems
        });

    } catch (error) {

        console.error("Get Problems By Admin Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


/* GET SINGLE PROBLEM */
exports.getProblemById = async (req, res) => {

    try {

        const { id } = req.params;

        const problem = await ProblemStatement
            .findById(id)
            .populate("adminId", "name email");

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem Statement Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: problem
        });

    } catch (error) {

        console.error("Get Problem By Id Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};