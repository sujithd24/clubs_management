import React, { useState, useEffect } from "react";
import { AuthData } from "../../Components/AuthComponent/AuthContext";
import Card from "../../Components/CommanComponent/CardComponent/Card";
import { Box, Typography, Grid, Card as MuiCard, Avatar, useTheme, Paper } from "@mui/material";
import axios from "axios";

const Fdashbord = () => {
  const [clubs, setClubs] = useState([]);

  // Fetch Club Details from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clubdetail/byfaculty", {
        params: { faculty: "Dr Vanitha K" }
      })
      .then((response) => setClubs(response.data))
      .catch((error) => console.error("Error fetching clubs:", error));
  }, []);

  const { userType } = AuthData();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: isDarkMode ? "grey.900" : "grey.100" }}>
      {/* Dashboard Title */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color="primary">
        Club Dashboard
      </Typography>

      {/* Club Section */}
      <Grid container spacing={3} sx={{textAlign:"center",justifyContent:"center"}} >
        {userType.isFaculty &&
          clubs.map((club, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card content={club} />
            </Grid>
          ))}

       
      </Grid>

      {/* Club Incharge Section */}
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
          Club Incharges
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {clubs.map((club, index) => (
            <Grid item xs={12} key={index}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 4, bgcolor: isDarkMode ? "grey.800" : "white" }}>
                {/* Club Name */}
                <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center" mb={2}>
                  {club.clubName}
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                  {/* Club Incharge 1 */}
                  {club.clubIncharge1 && (
                    <Grid item xs={12} sm={6} md={4}>
                      <MuiCard sx={{ p: 3, borderRadius: 3, boxShadow: 4, textAlign: "center" }}>
                        <Avatar
                          src={club.clubIncharge1img || ""}
                          alt={club.clubIncharge1}
                          sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                        />
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                          {club.clubIncharge1}
                        </Typography>
                      </MuiCard>
                    </Grid>
                  )}
                  {/* Club Incharge 2 */}
                  {club.clubIncharge2 && (
                    <Grid item xs={12} sm={6} md={4}>
                      <MuiCard sx={{ p: 3, borderRadius: 3, boxShadow: 4, textAlign: "center" }}>
                        <Avatar
                          src={club.clubIncharge2img || ""}
                          alt={club.clubIncharge2}
                          sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                        />
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                          {club.clubIncharge2}
                        </Typography>
                      </MuiCard>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Fdashbord;
