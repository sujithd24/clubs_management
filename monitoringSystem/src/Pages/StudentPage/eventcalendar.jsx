import Table from "../../Components/CommanComponent/Table/Table";


const EventCalander = () => {

    const userData = [
        {el1:"Event Name" , el2:"Date" ,el3:"Activity",},
        {el1:"Event Name" , el2:"Date" ,el3:"Activity",},
        {el1:"Event Name" , el2:"Date" ,el3:"Activity",},
        {el1:"Event Name" , el2:"Date" ,el3:"Activity",},
        {el1:"Event Name" , el2:"Date" ,el3:"Activity",},
        ]
    
    const tableHeading = [
        "Event Name","Date","Activity","Register","","","",""
      ]

    const tablebutton = {
        b2:"Update",
        b3:"Delete",
        b1:"Register"
      }

    return(
        <div className="allContent">
            <div className="userContent">
                <Table userData={userData} tableHeading={tableHeading} tableButton={tablebutton} />
            </div>
        </div>
    )
}

export default EventCalander;