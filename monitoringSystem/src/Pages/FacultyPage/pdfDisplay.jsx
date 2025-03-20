import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
  List
} from '@mui/material';
import { 
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import axios from 'axios';
import { format } from 'date-fns';

const PDFListComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fileName: '',
    description: '',
    tags: ''
  });

  // Fetch PDFs on initial load and when pagination changes
  useEffect(() => {
    fetchPdfs();
  }, [page, rowsPerPage]);

  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/pdf?page=${page + 1}&limit=${rowsPerPage}&search=${searchTerm}`);
      setPdfs(response.data.data);
      setTotalCount(response.data.totalDocuments);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching PDFs:', err);
      setError('Failed to load PDFs. Please try again.');
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setPage(0);
    fetchPdfs();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const openDeleteDialog = (pdf) => {
    setCurrentPdf(pdf);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCurrentPdf(null);
  };

  const openEditDialog = (pdf) => {
    setCurrentPdf(pdf);
    setEditFormData({
      fileName: pdf.fileName,
      description: pdf.description || '',
      tags: pdf.tags ? pdf.tags.join(', ') : ''
    });
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentPdf(null);
  };

  const openViewDialog = (pdf) => {
    setCurrentPdf(pdf);
    setViewDialogOpen(true);
  };

  const closeViewDialog = () => {
    setViewDialogOpen(false);
    setCurrentPdf(null);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const tagsArray = editFormData.tags
        ? editFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];
      
      const response = await axios.put(`http://localhost:5000/api/pdf/${currentPdf._id}`, {
        fileName: editFormData.fileName,
        description: editFormData.description,
        tags: tagsArray
      });
      
      // Update the local state
      setPdfs(pdfs.map(pdf => 
        pdf._id === currentPdf._id 
          ? { ...pdf, ...response.data.pdf } 
          : pdf
      ));
      
      setSnackbar({
        open: true,
        message: 'PDF updated successfully',
        severity: 'success'
      });
      
      closeEditDialog();
    } catch (err) {
      console.error('Error updating PDF:', err);
      setSnackbar({
        open: true,
        message: 'Failed to update PDF',
        severity: 'error'
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/pdf/${currentPdf._id}`);
      
      // Remove the deleted PDF from the list
      setPdfs(pdfs.filter(pdf => pdf._id !== currentPdf._id));
      
      setSnackbar({
        open: true,
        message: 'PDF deleted successfully',
        severity: 'success'
      });
      
      closeDeleteDialog();
    } catch (err) {
      console.error('Error deleting PDF:', err);
      setSnackbar({
        open: true,
        message: 'Failed to delete PDF',
        severity: 'error'
      });
    }
  };

  const handleDownload = async (pdf) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pdf/${pdf._id}/download`, {
        responseType: 'blob'
      });
      
      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pdf.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Update the download count in the UI
      setPdfs(pdfs.map(p => 
        p._id === pdf._id 
          ? { ...p, downloadCount: (p.downloadCount || 0) + 1 } 
          : p
      ));
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setSnackbar({
        open: true,
        message: 'Failed to download PDF',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  // Render table view for desktop
  const renderTable = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="PDF documents table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Total Pages</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Downloads</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pdfs.map((pdf) => (
            <TableRow key={pdf._id} hover>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PdfIcon color="error" sx={{ mr: 1 }} />
                  <Typography variant="body2">{pdf.fileName}</Typography>
                </Box>
                {pdf.tags && pdf.tags.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    {pdf.tags.slice(0, 3).map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                    {pdf.tags.length > 3 && (
                      <Chip 
                        label={`+${pdf.tags.length - 3}`} 
                        size="small" 
                        variant="outlined"
                      />
                    )}
                  </Box>
                )}
              </TableCell>
              <TableCell>{formatDate(pdf.createdAt)}</TableCell>
              <TableCell>{pdf.totalPages || 'N/A'}</TableCell>
              <TableCell>
                {pdf.fileMetadata && pdf.fileMetadata[0] 
                  ? formatFileSize(pdf.fileMetadata.reduce((sum, file) => sum + file.size, 0))
                  : 'N/A'
                }
              </TableCell>
              <TableCell>{pdf.downloadCount || 0}</TableCell>
              <TableCell align="right">
                <Tooltip title="View Details">
                  <IconButton 
                    size="small" 
                    onClick={() => openViewDialog(pdf)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download">
                  <IconButton 
                    size="small" 
                    onClick={() => handleDownload(pdf)}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton 
                    size="small" 
                    onClick={() => openEditDialog(pdf)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => openDeleteDialog(pdf)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {loading && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <CircularProgress size={24} />
              </TableCell>
            </TableRow>
          )}
          {!loading && pdfs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body1">No PDFs found</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
  
  // Render card view for mobile
  const renderCardView = () => (
    <Box>
      {pdfs.map((pdf) => (
        <Card key={pdf._id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PdfIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="subtitle1">{pdf.fileName}</Typography>
            </Box>
            
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Created: {formatDate(pdf.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Pages: {pdf.totalPages || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Downloads: {pdf.downloadCount || 0}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Size: {pdf.fileMetadata && pdf.fileMetadata[0] 
                    ? formatFileSize(pdf.fileMetadata.reduce((sum, file) => sum + file.size, 0))
                    : 'N/A'
                  }
                </Typography>
              </Grid>
            </Grid>
            
            {pdf.tags && pdf.tags.length > 0 && (
              <Box sx={{ mt: 1 }}>
                {pdf.tags.slice(0, 2).map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    size="small" 
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
                {pdf.tags.length > 2 && (
                  <Chip 
                    label={`+${pdf.tags.length - 2}`} 
                    size="small" 
                    variant="outlined"
                  />
                )}
              </Box>
            )}
          </CardContent>
          <CardActions>
            <Button 
              size="small" 
              startIcon={<VisibilityIcon />}
              onClick={() => openViewDialog(pdf)}
            >
              View
            </Button>
            <Button 
              size="small" 
              startIcon={<DownloadIcon />}
              onClick={() => handleDownload(pdf)}
            >
              Download
            </Button>
            <Button 
              size="small" 
              startIcon={<EditIcon />}
              onClick={() => openEditDialog(pdf)}
            >
              Edit
            </Button>
            <Button 
              size="small" 
              color="error" 
              startIcon={<DeleteIcon />}
              onClick={() => openDeleteDialog(pdf)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      
      {!loading && pdfs.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body1">No PDFs found</Typography>
        </Box>
      )}
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
       Documents
      </Typography>
      
      {/* Search and filter bar */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search PDFs"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <IconButton size="small" onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              size="medium"
            >
              Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {/* Responsive view - table for desktop, cards for mobile */}
      {isMobile ? renderCardView() : renderTable()}
      
      {/* View PDF dialog */}
      <Dialog
  open={viewDialogOpen}
  onClose={closeViewDialog}
  fullWidth
  maxWidth="md"
  sx={{ '& .MuiPaper-root': { backgroundColor: 'white' } }} // Set Dialog background to white
>
  <DialogTitle sx={{ backgroundColor: 'white' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <PdfIcon color="error" sx={{ mr: 1 }} />
      {currentPdf?.fileName}
    </Box>
  </DialogTitle>
  <DialogContent sx={{ backgroundColor: 'white' }}> {/* Set DialogContent background to white */}
    {currentPdf && (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Details</Typography>
          <Typography variant="body2">
            Created: {formatDate(currentPdf.createdAt)}
          </Typography>
          <Typography variant="body2">
            Last Updated: {formatDate(currentPdf.updatedAt)}
          </Typography>
          <Typography variant="body2">
            Total Pages: {currentPdf.totalPages || 'N/A'}
          </Typography>
          <Typography variant="body2">
            Downloaded: {currentPdf.downloadCount || 0} times
          </Typography>
          <Typography variant="body2">
            Last Downloaded: {formatDate(currentPdf.lastDownloaded) || 'Never'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Source Files</Typography>
          <List>
            {currentPdf.originalFiles?.map((file, index) => (
              <Typography key={index} variant="body2">
                • {file}
              </Typography>
            ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Description</Typography>
          <Typography variant="body2">
            {currentPdf.description || 'No description available'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Tags</Typography>
          <Box>
            {currentPdf.tags && currentPdf.tags.length > 0 ? (
              currentPdf.tags.map((tag, index) => (
                <Chip 
                  key={index} 
                  label={tag} 
                  size="small" 
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))
            ) : (
              <Typography variant="body2">No tags</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    )}
  </DialogContent>
  <DialogActions sx={{ backgroundColor: 'white' }}>
    <Button onClick={() => handleDownload(currentPdf)} color="primary">
      Download
    </Button>
    <Button onClick={closeViewDialog}>Close</Button>
  </DialogActions>
</Dialog>

      
      {/* Edit PDF dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        fullWidth
        maxWidth="sm"
        sx={{ '& .MuiPaper-root': { backgroundColor: 'white' } }} 
      >
        <DialogTitle>Edit PDF</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="fileName"
            label="File Name"
            fullWidth
            variant="outlined"
            value={editFormData.fileName}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={editFormData.description}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="tags"
            label="Tags (comma separated)"
            fullWidth
            variant="outlined"
            value={editFormData.tags}
            onChange={handleEditChange}
            helperText="Enter tags separated by commas"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        sx={{ '& .MuiPaper-root': { backgroundColor: 'white' } }} 
      >
        <DialogTitle>Delete PDF</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{currentPdf?.fileName}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PDFListComponent;