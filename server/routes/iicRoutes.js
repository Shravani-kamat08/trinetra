const express = require("express");
const router = express.Router();
const {
    addMember,
    getAllMembers,
    updateMember,
    deleteMember
} = require("../controllers/iicController");

router.post("/create", addMember);
router.get("/", getAllMembers);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

module.exports = router;