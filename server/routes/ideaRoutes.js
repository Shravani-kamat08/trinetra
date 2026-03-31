const express = require("express");
const router = express.Router();

const {
    submitIdea,
    getIdeaById,
    getIdeasByStudentId,
    getIdeasByProblemId,
    countDroppedIdeasByProblemId,
    updateIdeaStatus,
    addManualMarksAndRank
} = require("../controllers/ideaController");


// ✅ SUBMIT IDEA
router.post("/submit", submitIdea);


// ✅ GET IDEA BY ID
router.get("/:id", getIdeaById);


// ✅ GET IDEAS BY STUDENT ID
router.get("/student/:studentId", getIdeasByStudentId);


// ✅ GET IDEAS BY PROBLEM ID
router.get("/problem/:problemId", getIdeasByProblemId);


// ✅ COUNT DROPPED IDEAS BY PROBLEM
router.get("/problem/:problemId/dropped-count", countDroppedIdeasByProblemId);


// ✅ UPDATE APPROVAL STATUS
router.put("/status/:id", updateIdeaStatus);

// ✅ ADD MANUAL MARKS + UPDATE RATING + RANK
router.put("/manual-marks/:id", addManualMarksAndRank);


module.exports = router;