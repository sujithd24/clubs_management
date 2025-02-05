import Table from "../../Components/CommanComponent/Table/Table";


const Member = () => {

    const userData = [
        {el1:"Name" , el2:"Roll Number" ,el3:"Year",el4:"Phone Number"},
        {el1:"Name" , el2:"Roll Number" ,el3:"Year",el4:"Phone Number"},
        {el1:"Name" , el2:"Roll Number" ,el3:"Year",el4:"Phone Number"},
        {el1:"Name" , el2:"Roll Number" ,el3:"Year",el4:"Phone Number"},
        {el1:"Name" , el2:"Roll Number" ,el3:"Year",el4:"Phone Number"},
        ]
    
    const tableHeading = [
        "Name","Roll Number","Year","Phone Number","","","",""
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

export default Member;