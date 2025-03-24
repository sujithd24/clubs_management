import Table from "../../Components/CommanComponent/Table/Table";
import { useState , useEffect } from "react";
import axios from "axios";
import {Typography} from '@mui/material';


const Report = () => {

    const [ userData , setUserData ] = useState([]);

    useEffect(() => {
      (async () => {
          try {
              const res = await axios.get(`http://localhost:5000/api/report`);
              setUserData(res.data)
              console.log(res.data)
          } catch (error) {
              console.error(error);
          }
      })();
  }, []);
    
    const tableHeading = [
        "Club Name","Participations","Monthly Events","Overall Performance(Out Of 10)","","","",
      ]

    const tablebutton = {
        b2:"Update",
        b3:"Delete",
        b1:"Create"
      }

    return(
        <div className="allContent">
            <div className="userContent">
            <Typography variant="h4" fontWeight="bold" textAlign="center" mt={2} color="primary">
        Report
      </Typography>
                <Table userData={userData} tableHeading={tableHeading} tableButton={tablebutton} />
            </div>
        </div>
    )
}

export default Report;