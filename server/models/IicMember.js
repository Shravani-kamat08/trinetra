const mongoose = require("mongoose");

const iicMemberSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        department: {
            type: String,
        },
        designation: {
            type: String,
            required: true,
        },
        qualification: {
            type: String,
        },
        experience: {
            type: Number, // in years
        },
        profilePic: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("IICMember", iicMemberSchema);
