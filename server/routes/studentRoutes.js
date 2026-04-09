
const express = require("express");
const router = express.Router();
const { registerStudent, loginStudent, getStudentsByAdmin, getStudentById, updateStudent, deleteStudent, getStudentDashboard, changePassword } = require("../controllers/studentController");

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/admin/:adminId", getStudentsByAdmin);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

router.get("/dashboard/:studentId", getStudentDashboard);
router.put("/profile/:id", updateStudent)
router.put("/change-password/:id", changePassword);

module.exports = router;
