const express = require("express");
const router = express.Router();
const { createProblem, getAllProblems, getProblemById, getProblemsByAdmin } = require("../controllers/problemController.js")


router.post("/create", createProblem);
router.get("/all", getAllProblems);
router.get("/:id", getProblemById);
router.get("/admin/:adminId", getProblemsByAdmin);


module.exports = router;