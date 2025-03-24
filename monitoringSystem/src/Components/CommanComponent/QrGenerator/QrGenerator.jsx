import React , {useState,useEffect} from "react";
import QRCode from "react-qr-code";
import { Card, Typography, Box } from "@mui/material";
import { AuthData } from "../../AuthComponent/AuthContext";
import axios from "axios";


const QRGenerator = () => {

  const { fetchid } = AuthData();
  const [ userData , setUserData ] = useState([]);

  useEffect(() => {
    (async () => {
        try {
            setUserData([]);
            const data = window.localStorage.getItem("EventData")
            
            if(data){

              setUserData(JSON.parse(data))
            }
        } catch (error) {
            console.error(error);
        }
    })();
}, []);


  const qrData = JSON.stringify(userData); // Convert student data to JSON string

  return (
    <Card sx={{ py: 5, textAlign: "center", maxWidth: 400, mx: "auto" }}>
      {fetchid}
      <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
        Student QR Code
      </Typography>
      <Box sx={{ bgcolor: "white", p: 2, display: "inline-block" }}>
        <QRCode value={qrData} size={200} />
      </Box>
    </Card>
  );
};

export default QRGenerator;
