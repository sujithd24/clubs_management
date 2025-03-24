import Table from "../../Components/CommanComponent/Table/Table";
import axios from "axios";
import { useState , useEffect } from "react";
import {Typography} from '@mui/material';

const Resource = () => {
    const [ userData , setUserData ] = useState([]);

    useEffect(() => {
      (async () => {
          try {
              const res = await axios.get(`http://localhost:5000/api/fund`);
              setUserData(res.data)
              console.log(res.data)
          } catch (error) {
              console.error(error);
          }
      })();
  }, []);
    
    const tableHeading = [
        "ClubName","Allocate Budgets","Used Fund","Fund Remaining","","",""
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
            Resource Oversight
      </Typography>
                <Table userData={userData} tableHeading={tableHeading} tableButton={tablebutton} />
            </div>
        </div>
    )
}

export default Resource;