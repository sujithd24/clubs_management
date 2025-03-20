const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pdfController = require('../controllers/pdfController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/temp'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Create temp directory if it doesn't exist
const fs = require('fs');
const tempDir = path.join(__dirname, '../uploads/temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// PDF Routes
router.post('/upload', upload.array('pdfFiles', 5), pdfController.uploadAndMergePdfs);
router.get('/', pdfController.getAllPdfs);
router.get('/:id', pdfController.getPdfById);
router.get('/:id/download', pdfController.downloadPdf);
router.put('/:id', pdfController.updatePdf);
router.delete('/:id', pdfController.deletePdf);

module.exports = router;