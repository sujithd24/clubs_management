import Table from "../../Components/CommanComponent/Table/Table";
import axios from "axios";
import { useState , useEffect } from "react";
import {Typography} from '@mui/material';
const Events = () => {
    const [ userData , setUserData ] = useState([]);

    useEffect(() => {
      (async () => {
          try {
              const res = await axios.get(`http://localhost:5000/api/event`);
              setUserData(res.data)
              console.log(res.data)
          } catch (error) {
              console.error(error);
          }
      })();
  }, []);

   
    
    const tableHeading = [
        "Club Name","Event Name","Date","Activities","","","",
      ]

    const tablebutton = {
        b2:"Update",
        b3:"Delete",
        b1:"Create"
      }

    return(
        <div className="allContent">
            
            <div className="userContent">
            {(window.location.href === "http://localhost:3000/eventlist" || window.location.href === "http://localhost:3001/eventlist" ) && <Typography variant="h4" fontWeight="bold" textAlign="center" mt={2} color="primary">
        Event Oversight
      </Typography>}
      {(window.location.href === "http://localhost:3000/event" || window.location.href === "http://localhost:3001/event" )&& <Typography variant="h4" fontWeight="bold" textAlign="center" mt={2} color="primary">
        Event
      </Typography>}
                <Table userData={userData} tableHeading={tableHeading} tableButton={tablebutton}  />
            </div>
        </div>
    )
}

export default Events;