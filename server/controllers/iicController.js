const IICMember = require("../models/IicMember");

// ✅ ADD MEMBER
exports.addMember = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging line
        const member = new IICMember(req.body);
        await member.save();

        res.status(201).json({
            success: true,
            message: "Member added successfully",
            member
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ GET ALL MEMBERS
exports.getAllMembers = async (req, res) => {
    try {
        const members = await IICMember.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: members.length,
            members
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ UPDATE MEMBER
exports.updateMember = async (req, res) => {
    try {
        const member = await IICMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        res.json({
            success: true,
            message: "Member updated",
            member
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ DELETE MEMBER
exports.deleteMember = async (req, res) => {
    try {
        const member = await IICMember.findByIdAndDelete(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        res.json({
            success: true,
            message: "Member deleted"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};