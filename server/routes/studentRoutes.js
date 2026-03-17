const express = require("express");
const router = express.Router();
const { registerStudent, loginStudent, getStudentsByAdmin, getStudentById, updateStudent, deleteStudent } = require("../controllers/studentController");

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/admin/:adminId", getStudentsByAdmin);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;