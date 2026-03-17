const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
    {
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
            index: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        classYear: {
            type: String,
            required: true,
        },
        branch: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            match: /^[0-9]{10}$/,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        profilePic: {
            type: String,
        },
    },
    { timestamps: true }
);

// 🔎 PASSWORD COMPARE METHOD (for login later)
studentSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("student", studentSchema);