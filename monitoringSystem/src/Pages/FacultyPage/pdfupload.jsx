import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  IconButton, 
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  PictureAsPdf as PdfIcon, 
  Delete as DeleteIcon, 
  CloudUpload as UploadIcon, 
  Check as CheckIcon 
} from '@mui/icons-material';
import axios from 'axios';

const PdfUploadForm = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Check if the first 3 files (required) are present
  const isSubmitEnabled = files.length >= 1;
  
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    
    // Filter only PDF files
    const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');
    
    // Limit to max 5 files
    const combinedFiles = [...files, ...pdfFiles].slice(0, 5);
    setFiles(combinedFiles);
  };
  
  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!isSubmitEnabled) {
      setError('First 1 PDF files are required');
      return;
    }
    setUploading(true);
    setError('');
    
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('pdfFiles', file);
      });
      
      const response = await axios.post('http://localhost:5000/api/pdf/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess(true);
      console.log('Upload successful:', response.data);
      
      // Clear files after successful upload
      setFiles([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading files');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <Box>
<Typography variant="h4" fontWeight="bold" textAlign="center" mt={2} color="primary">
        Upload Club Documents
      </Typography>
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      
      <Typography variant="h5" gutterBottom>
        PDF Upload File
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Please upload up to 5 PDF files. The first 1 files are required.
      </Typography>
      
      <Box sx={{ my: 2 }}>
        <input
          accept="application/pdf"
          style={{ display: 'none' }}
          id="pdf-upload-input"
          type="file"
          multiple
          onChange={handleFileChange}
          disabled={uploading || files.length >= 5}
          />
        <label htmlFor="pdf-upload-input">
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadIcon />}
            disabled={uploading || files.length >= 5}
            >
            Select PDF Files
          </Button>
        </label>
      </Box>
      
      {files.length > 0 && (
        <List>
          {files.map((file, index) => (
            <ListItem
            key={index}
            secondaryAction={
              <IconButton 
              edge="end" 
              aria-label="delete"
              onClick={() => handleRemoveFile(index)}
              disabled={uploading}
              >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{
                bgcolor: index < 1 ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                border: index < 1 ? '1px solid #4caf50' : 'none',
                borderRadius: 1,
                mb: 1
              }}
              >
              <ListItemIcon>
                <PdfIcon color="error" />
              </ListItemIcon>
              <ListItemText 
                primary={file.name} 
                secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`} 
                />
              {index < 1 && (
                <Typography variant="caption" color="success.main" sx={{ mr: 2 }}>
                  Required
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      )}
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color={isSubmitEnabled ? "success.main" : "error"}>
          {isSubmitEnabled ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckIcon fontSize="small" sx={{ mr: 0.5 }} />
              Ready to submit
            </Box>
          ) : (
            `${Math.max(0, 1 - files.length)} more required file(s) needed`
          )}
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!isSubmitEnabled || uploading}
          startIcon={uploading ? <CircularProgress size={20} /> : null}
          >
          {uploading ? 'Processing...' : 'Submit'}
        </Button>
      </Box>
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          PDFs uploaded and merged successfully!
        </Alert>
      </Snackbar>
    </Paper>
        </Box>
  );
};

export default PdfUploadForm;