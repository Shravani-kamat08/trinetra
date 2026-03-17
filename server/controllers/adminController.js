const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

/* REGISTER ADMIN */
exports.registerAdmin = async (req, res) => {

    try {
        const { name, collegeName, email, phone, password } = req.body;

        /* CHECK EXISTING ADMIN */
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }


        /* GENERATE COMMON ID */
        // first name
        const firstName = name.trim().split(" ")[0].toLowerCase();

        // college short code (first letter of each word)
        const collegeShort = collegeName
            .split(" ")
            .map(word => word[0])
            .join("")
            .toLowerCase();

        // last 4 digits of phone
        const lastDigits = phone.slice(-4);

        const commonId = `${collegeShort}-${firstName}-${lastDigits}`;



        /* HASH PASSWORD */

        const hashedPassword = await bcrypt.hash(password, 10);



        /* CREATE ADMIN */

        const newAdmin = new Admin({
            name,
            collegeName,
            email,
            phone,
            password: hashedPassword,
            commonId
        });

        await newAdmin.save();



        res.status(201).json({
            success: true,
            message: "Admin Registered Successfully",
            adminId: newAdmin._id,
            commonId: newAdmin.commonId
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });

    }

};



/* LOGIN ADMIN */
exports.loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login Successful",
            adminId: admin._id
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


exports.getAdminByCommonId = async (req, res) => {

    try {

        const { commonId } = req.body;

        const admin = await Admin.findOne({ commonId });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        res.status(200).json({
            success: true,
            adminId: admin._id,
            name: admin.name,
            collegeName : admin.collegeName,
            email : admin.email,
            phone : admin.phone
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });

    }

};


/* GET ALL ADMINS */

exports.getAllAdmins = async (req, res) => {

    try {

        const admins = await Admin.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: admins.length,
            data: admins
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};



/* GET SINGLE ADMIN */

exports.getAdminById = async (req, res) => {

    try {

        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: admin
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};



/* UPDATE ADMIN */

exports.updateAdmin = async (req, res) => {

    try {

        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({
                success: false,
                message: "Admin Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Admin Updated",
            data: updatedAdmin
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};



/* DELETE ADMIN */
exports.deleteAdmin = async (req, res) => {

    try {

        const admin = await Admin.findByIdAndDelete(req.params.id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Admin Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};