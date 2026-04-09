const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {uploadProfileImage, uploadProblemStatementImage, uploadIdeaDocsImage
} = require('../controllers/uploadController');

const router = express.Router();

router.post('/upload-profile', upload.single('image'), uploadProfileImage);
router.post('/problem-statement', upload.single('image'), uploadProblemStatementImage);
router.post('/idea-docs', upload.single('image'), uploadIdeaDocsImage);

module.exports = router;