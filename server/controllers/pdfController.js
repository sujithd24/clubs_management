const { PDFDocument } = require('pdf-lib');
const PdfDocument = require('../models/PdfDocumaent'); // Fixed typo in import
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * Upload and Merge PDFs (CREATE)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.uploadAndMergePdfs = async (req, res) => {
  try {
    const files = req.files;
    
    // Validate the files
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    if (files.length < 3) {
      // Clean up uploaded files
      files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
      return res.status(400).json({ message: 'At least 3 PDF files are required' });
    }
    
    // Validate file types
    const invalidFiles = files.filter(file => !file.mimetype || file.mimetype !== 'application/pdf');
    if (invalidFiles.length > 0) {
      // Clean up all uploaded files
      files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
      return res.status(400).json({ 
        message: 'All files must be PDFs',
        invalidFiles: invalidFiles.map(f => f.originalname)
      });
    }
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Merge PDFs
    const mergedPdfPath = await mergePdfs(files);
    
    // Save reference in MongoDB
    const originalFileNames = files.map(file => file.originalname);
    const fileMetadata = files.map(file => ({
      name: file.originalname,
      size: file.size,
      uploadedAt: new Date()
    }));
    
    const pdfDoc = new PdfDocument({
      fileName: path.basename(mergedPdfPath),
      filePath: mergedPdfPath,
      originalFiles: originalFileNames,
      fileMetadata: fileMetadata,
      totalPages: await countTotalPages(files),
      createdAt: new Date()
    });
    
    await pdfDoc.save();
    
    // Clean up individual files after successful merge if needed
    // Uncomment if you want to delete individual files after merging
    // files.forEach(file => {
    //   if (fs.existsSync(file.path)) {
    //     fs.unlinkSync(file.path);
    //   }
    // });
    
    res.status(201).json({
      message: 'PDFs uploaded, merged, and stored successfully',
      documentId: pdfDoc._id,
      fileName: pdfDoc.fileName,
      totalPages: pdfDoc.totalPages,
      originalFiles: pdfDoc.originalFiles
    });
  } catch (error) {
    console.error('Error processing PDF files:', error);
    
    // Clean up any uploaded files in case of error
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    
    res.status(500).json({ 
      message: 'Error processing PDF files',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get All PDFs with pagination (READ)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllPdfs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;
    
    const totalDocs = await PdfDocument.countDocuments();
    const pdfs = await PdfDocument.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .select('-__v');
    
    res.status(200).json({
      data: pdfs,
      currentPage: page,
      totalPages: Math.ceil(totalDocs / limit),
      totalDocuments: totalDocs
    });
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).json({ message: 'Error fetching PDFs' });
  }
};

/**
 * Get Single PDF by ID (READ)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getPdfById = async (req, res) => {
  try {
    const pdf = await PdfDocument.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: 'PDF not found' });
    
    // Check if file exists
    const fileExists = fs.existsSync(pdf.filePath);
    
    res.status(200).json({
      ...pdf.toObject(),
      fileExists
    });
  } catch (error) {
    console.error('Error retrieving PDF:', error);
    res.status(500).json({ message: 'Error retrieving PDF' });
  }
};

/**
 * Download PDF file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.downloadPdf = async (req, res) => {
  try {
    const pdf = await PdfDocument.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: 'PDF not found' });
    
    if (!fs.existsSync(pdf.filePath)) {
      return res.status(404).json({ message: 'PDF file not found on server' });
    }
    
    // Update download count
    pdf.downloadCount = (pdf.downloadCount || 0) + 1;
    pdf.lastDownloaded = new Date();
    await pdf.save();
    
    res.download(pdf.filePath, pdf.fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error('Error downloading PDF:', error);
    res.status(500).json({ message: 'Error downloading PDF' });
  }
};

/**
 * Update PDF Name and metadata (UPDATE)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updatePdf = async (req, res) => {
  try {
    const pdf = await PdfDocument.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: 'PDF not found' });
    
    // Update allowed fields
    if (req.body.fileName) pdf.fileName = req.body.fileName;
    if (req.body.tags) pdf.tags = req.body.tags;
    if (req.body.description) pdf.description = req.body.description;
    
    pdf.updatedAt = new Date();
    await pdf.save();
    
    res.status(200).json({ 
      message: 'PDF updated successfully', 
      pdf: {
        _id: pdf._id,
        fileName: pdf.fileName,
        tags: pdf.tags,
        description: pdf.description,
        updatedAt: pdf.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating PDF:', error);
    res.status(500).json({ message: 'Error updating PDF' });
  }
};

/**
 * Delete a PDF (DELETE)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deletePdf = async (req, res) => {
  try {
    const pdf = await PdfDocument.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: 'PDF not found' });
    
    // Delete file from uploads folder
    if (fs.existsSync(pdf.filePath)) {
      try {
        fs.unlinkSync(pdf.filePath);
      } catch (fsError) {
        console.error('Error deleting file:', fsError);
        // Continue with deletion from DB even if file deletion fails
      }
    }
    
    await PdfDocument.findByIdAndDelete(req.params.id);
    res.status(200).json({ 
      message: 'PDF deleted successfully',
      documentId: req.params.id
    });
  } catch (error) {
    console.error('Error deleting PDF:', error);
    res.status(500).json({ message: 'Error deleting PDF' });
  }
};

/**
 * Function to merge PDFs
 * @param {Array} files - Array of file objects
 * @returns {String} - Path to the merged PDF file
 */
async function mergePdfs(files) {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    try {
      const pdfBytes = fs.readFileSync(file.path);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    } catch (error) {
      console.error(`Error processing file ${file.originalname}:`, error);
      throw new Error(`Failed to process file ${file.originalname}: ${error.message}`);
    }
  }
  
  const mergedPdfBuffer = await mergedPdf.save();
  const mergedFileName = `merged-${uuidv4()}.pdf`;
  const mergedFilePath = path.join(__dirname, '../uploads', mergedFileName);
  
  fs.writeFileSync(mergedFilePath, mergedPdfBuffer);
  
  return mergedFilePath;
}

/**
 * Count total pages in all PDF files
 * @param {Array} files - Array of file objects
 * @returns {Number} - Total number of pages
 */
async function countTotalPages(files) {
  let totalPages = 0;
  
  for (const file of files) {
    try {
      const pdfBytes = fs.readFileSync(file.path);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      totalPages += pdfDoc.getPageCount();
    } catch (error) {
      console.error(`Error counting pages in ${file.originalname}:`, error);
    }
  }
  
  return totalPages;
}