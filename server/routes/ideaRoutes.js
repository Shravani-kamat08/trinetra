const express = require("express");
const router = express.Router();

const { submitIdea } = require("../controllers/ideaController");

router.post("/submit", submitIdea);

module.exports = router;