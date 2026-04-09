const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");

const Idea = require("../models/ideaModel");
const Problem = require("../models/ProblemStatement");
const Admin = require("../models/admin");

exports.registerStudent = async (req, res) => {
    try {

        console.log("Received registration data:", req.body);

        const {
            adminId,   // ✅ ADDED
            fullName,
            classYear,
            branch,
            email,
            phone,
            dateOfBirth,
            password,
            confirmPassword,
            profilePic
        } = req.body;

        // Validate required fields
        if (!adminId || !fullName || !classYear || !branch || !email || !phone || !dateOfBirth || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Password match check
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // Check if email already exists
        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new student
        const newStudent = new Student({
            adminId, // ✅ ADDED
            fullName,
            classYear,
            branch,
            email,
            phone,
            dateOfBirth,
            password: hashedPassword,
            profilePic
        });

        await newStudent.save();

        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            student: {
                id: newStudent._id,
                adminId: newStudent.adminId, // ✅ ADDED
                fullName: newStudent.fullName,
                email: newStudent.email
            }
        });

    } catch (error) {

        console.error("Registration Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


exports.loginStudent = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validate fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check if student exists
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Compare password
        const isMatch = await student.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            student: {
                id: student._id,
                adminId: student.adminId, // ✅ ADDED
                fullName: student.fullName,
                email: student.email,
                classYear: student.classYear,
                branch: student.branch,
                phone: student.phone,
                profilePic: student.profilePic
            }
        });

    } catch (error) {

        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// GET ALL STUDENTS (BY ADMIN)
exports.getStudentsByAdmin = async (req, res) => {

    try {

        const { adminId } = req.params;

        const students = await Student.find({ adminId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            students
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// GET STUDENT BY ID
exports.getStudentById = async (req, res) => {

    try {

        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// UPDATE STUDENT
exports.updateStudent = async (req, res) => {

    try {

        const { id } = req.params;
        const updateData = req.body;

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student: updatedStudent
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// DELETE STUDENT
exports.deleteStudent = async (req, res) => {

    try {

        const { id } = req.params;

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

exports.getStudentDashboard = async (req, res) => {
    try {
        const { studentId } = req.params;

        // ✅ Get student
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // ✅ Get ideas of student (ONLY dropped)
        const ideas = await Idea.find({
            studentId
        }).populate("problemId");

        // ✅ Get admin
        const admin = await Admin.findById(student.adminId).select("-password");

        res.json({
            success: true,
            student,
            admin,
            ideas
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword , newPassword } = req.body;


        // ✅ Validate input
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old and new password are required"
            });
        }

        // ✅ Find student
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // ✅ Compare old password
        const isMatch = await bcrypt.compare(oldPassword, student.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password incorrect"
            });
        }

        // ✅ Prevent same password reuse (optional but good)
        const isSame = await bcrypt.compare(newPassword, student.password);
        if (isSame) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be same as old password"
            });
        }

        // ✅ Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10); //await bcrypt.hash(password, 10)

        // ✅ Update password
        student.password = hashedPassword;
        await student.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (err) {
        console.error("Change Password Error:", err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};