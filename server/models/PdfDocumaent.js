const mongoose = require('mongoose');

const pdfDocumentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  filePath: {
    type: String,
    required: true
  },
  originalFiles: [String],
  fileMetadata: [{
    name: String,
    size: Number,
    uploadedAt: Date
  }],
  totalPages: {
    type: Number,
    default: 0
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  lastDownloaded: {
    type: Date
  }
});

// Create a text index for searching
pdfDocumentSchema.index({ 
  fileName: 'text', 
  description: 'text',
  tags: 'text',
  originalFiles: 'text'
});

const PdfDocument = mongoose.model('PdfDocument', pdfDocumentSchema);

module.exports = PdfDocument;