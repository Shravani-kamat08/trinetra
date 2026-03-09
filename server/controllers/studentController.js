const student = require("../models/studentModel");

exports.registerStudent = async (req, res) => {
    try {

        console.log("Received registration data:", req.body);

        const {
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

        // password validation
        // if (password !== confirmPassword) {
        //     return res.status(400).json({ message: "Passwords do not match" });
        // }

        // check email
        // const existing = await Student.findOne({ email });
        // if (existing) {
        //     return res.status(400).json({ message: "Email already registered" });
        // }

        const newStudent = new student({
            fullName,
            classYear,
            branch,
            email,
            phone,
            dateOfBirth,
            password,
            profilePic   // base64 image stored directly
        });

        await newStudent.save();

        res.status(201).json({
            message: "Student registered successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};