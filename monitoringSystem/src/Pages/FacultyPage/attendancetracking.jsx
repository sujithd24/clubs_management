import Table from "../../Components/CommanComponent/Table/Table";
import axios from "axios";
import { useState , useEffect } from "react";

const Attendance = () => {
   const [ userData , setUserData ] = useState([]);

    useEffect(() => {
      (async () => {
          try {
              const res = await axios.get(`http://localhost:5000/api/attendance`);
              setUserData(res.data)
              console.log(res.data)
          } catch (error) {
              console.error(error);
          }
      })();
  }, []);
    
    const tableHeading = [
        "Club Name","Event Name","Name","Roll Number","Attendance","","","",""
      ]

    const tablebutton = {
        b2:"Update",
        b3:"Delete",
        b1:"Create"
      }

    return(
        <div className="allContent">
            <div className="userContent">
                <Table userData={userData} tableHeading={tableHeading} tableButton={tablebutton} />
            </div>
        </div>
    )
}

export default Attendance;