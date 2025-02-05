import Table from "../../Components/CommanComponent/Table/Table";


const EventList = () => {

    const userData = [
        {el1:"Event Name" , el2:"Date" ,el3:"Activities",el4:"Participation",el5:"Amount Spend"},
        {el1:"Event Name" , el2:"Date" ,el3:"Activities",el4:"Participation",el5:"Amount Spend"},
        {el1:"Event Name" , el2:"Date" ,el3:"Activities",el4:"Participation",el5:"Amount Spend"},
        {el1:"Event Name" , el2:"Date" ,el3:"Activities",el4:"Participation",el5:"Amount Spend"},
        {el1:"Event Name" , el2:"Date" ,el3:"Activities",el4:"Participation",el5:"Amount Spend"},
        {el1:"Event Name" , el2:"Date" ,el3:"Activities",el4:"Participation",el5:"Amount Spend"},
        ]
    
    const tableHeading = [
        "Event Name","Date","Activities","Participation","Amount Spend","","",""
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

export default EventList;