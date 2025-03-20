import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    clubName: "",
    Date: "",
    feedback: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/feedback`, formData);
      setSnackbarMessage("Feedback submitted successfully! 🎉");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({ clubName: "", Date: "", feedback: "" }); // Reset form after submission
    } catch (error) {
      setSnackbarMessage("Error submitting feedback. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.error("Feedback submission error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          borderRadius: 3,
          backgroundColor: "white",
          textAlign: "center",
          mt: 5,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Club Feedback Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Club Name"
            variant="outlined"
            fullWidth
            name="clubName"
            value={formData.clubName}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2, borderRadius: 1 }}
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            fullWidth
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2, borderRadius: 1 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Your Feedback"
            variant="outlined"
            fullWidth
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            multiline
            rows={4}
            sx={{ marginBottom: 3, borderRadius: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#7d53f6",
              color: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#5e3ce7" },
            }}
          >
            Submit Feedback
          </Button>
        </form>
      </Paper>

      {/* ✅ Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FeedbackForm;
