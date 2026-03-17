const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    dept: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
});

const ideaSchema = new mongoose.Schema(
    {
        students: {
            type: [studentSchema],
            validate: {
                validator: function (v) {
                    return v.length >= 1 && v.length <= 3;
                },
                message: "Minimum 1 and Maximum 3 students allowed",
            },
        },

        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "student",
            required: true,
            index: true,
        },

        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProblemStatement",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        problemStatement: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        innovationType: {
            type: String,
            required: true,
        },

        cost: {
            type: Number,
            default: 0,
        },

        references: {
            type: String,
        },

        file: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Idea", ideaSchema);
