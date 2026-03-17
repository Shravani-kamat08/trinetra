const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Problem title is required"],
        trim: true,
        minlength: 5,
        maxlength: 200
    },

    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
        index: true
    },

    subject: {
        type: String,
        trim: true
    },

    image: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        enum: [
            "Software",
            "Hardware",
            "AI/ML",
            "IoT",
            "Cyber Security",
            "Robotics",
            "General"
        ],
        default: "General"
    },

    complexity: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },

    estimatedTime: {
        type: String,
        trim: true
    },

    reward: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        required: [true, "Problem description is required"]
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "End date must be after start date"
        }
    },

    status: {
        type: String,
        enum: ["Pending", "Active", "Closed"],
        default: "Pending"
    }

}, {
    timestamps: true
});

/* INDEXES FOR FASTER QUERY */
problemSchema.index({ category: 1 });
problemSchema.index({ status: 1 });
problemSchema.index({ startDate: 1 });

module.exports = mongoose.model("ProblemStatement", problemSchema);