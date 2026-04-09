const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    collegeName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    phone: {
        type: String,
        trim: true
    },

    designation: {
        type: String,
        trim: true
    },

    department: {
        type: String,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    profileImage: {
        type: String
    },

    commonId : {
        type: String,
        unique: true,
        required: true
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

}, { timestamps: true });

module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);