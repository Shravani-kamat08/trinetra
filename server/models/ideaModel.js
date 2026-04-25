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

        description: {
            type: String,
            required: true,
        },

        innovationType: {
            type: String,
            required: true,
        },

        cost: {
            type: String,
            default: "0",
        },

        references: {
            type: String,
        },

        file: {
            type: String,
        },

        approvedStatus: {
            type: String,
            enum: ["approved", "drop", "reject", "starIdea"],
            default: "drop",
        },
        rating: {
            type: Number,
            default: 0,
        },

        autoPoints: {
            type: Number,
            default: 0,
        }, // System generated based on documentation quality

        manualMarks: {
            type: [Number],
            default: [0],
        }, // Set by Admin/Judge during evaluation

        totalScore: {
            type: Number,
            default: 0,
        }, // autoPoints + average of manualMarks

        rank: {
            type: Number,
            default: 0,
        },

        likeStamp : {
            type : Boolean,
            default : false,
        }
    },
    { timestamps: true },
);

// --- AUTOMATIC SCORING LOGIC ---
// This runs every time an idea is saved or updated
ideaSchema.pre("save", function (next) {
    let score = 0;

    // 1. Depth of content (Description length)
    if (this.description && this.description.length > 100) score += 10;

    // 2. Documentation provided (File upload)
    if (this.file) score += 10;

    // 3. Categorization (Innovation type specified)
    if (this.innovationType) score += 5;

    // 4. Financial planning (Cost estimated)
    if (this.cost > 0) score += 2;

    // 5. Research done (References provided)
    if (this.references) score += 3;

    this.autoPoints = score;
    next();
});

module.exports = mongoose.model("Idea", ideaSchema);
