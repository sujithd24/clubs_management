import React from "react";
import { AuthData } from "../../Components/AuthComponent/AuthContext";
import Card from "../../Components/CommanComponent/CardComponent/Card";
import { Box, Typography, Grid, Card as MuiCard, CardContent, Avatar, useTheme, Paper } from "@mui/material";
import img from "../../assets/image.png";

const Fdashbord = () => {
  const clubs = [
    {
      title: "National Service Scheme",
      content:
        'NOT ME BUT YOU — "The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi. Join the NSS community of BIT to make a difference.',
    },
  ];

  const { userType } = AuthData();

  const incharge = {
    incharge1: "Incharge 1",
    incharge2: "Incharge 2",
  };

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: isDarkMode ? "grey.900" : "grey.100"}}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color="primary">
        Club Dashboard
      </Typography>

      {/* Club Section */}
      <Grid container spacing={3}>
        {userType.isFaculty &&
          clubs.map((c, i) => (
            <Grid item xs={12} md={6} lg={4} key={i} ml={50}>
              <Card content={c} />
            </Grid>
          ))}

        {userType.isStudent &&
          clubs.map((c, i) => (
            <Grid item xs={12} key={i}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 4, bgcolor: isDarkMode ? "grey.800" : "white" }}>
                <Typography variant="h5" fontWeight="bold" color="secondary">
                  {c.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  {c.content}
                </Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>

      {/* Incharge Section */}
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
          Club Incharge
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {Object.values(incharge).map((name, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MuiCard sx={{ p: 3, borderRadius: 3, boxShadow: 4, textAlign: "center" }}>
                <Avatar src={img} alt={name} sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  {name}
                </Typography>
              </MuiCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Fdashbord;
