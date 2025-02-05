import Table from "../../Components/CommanComponent/Table/Table";


const Attendance = () => {

    const userData = [
        {el1:"Event Name" , el2:"Name" ,el3:"Roll Number",el4:"Attendance"},
        {el1:"Event Name" , el2:"Name" ,el3:"Roll Number",el4:"Attendance"},
        {el1:"Event Name" , el2:"Name" ,el3:"Roll Number",el4:"Attendance"},
        {el1:"Event Name" , el2:"Name" ,el3:"Roll Number",el4:"Attendance"},
        {el1:"Event Name" , el2:"Name" ,el3:"Roll Number",el4:"Attendance"},
        {el1:"Event Name" , el2:"Name" ,el3:"Roll Number",el4:"Attendance"},
        ]
    
    const tableHeading = [
        "Event Name","Name","Roll Number","Attendance","","","",""
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