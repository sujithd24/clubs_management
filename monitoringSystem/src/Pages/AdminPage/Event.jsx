import Table from "../../Components/CommanComponent/Table/Table";


const Events = () => {

    const userData = [
        {el1:"Club name" , el2:"Event Name" ,el3:"Date",el4:"Activities"},
        {el1:"Club name" , el2:"Event Name" ,el3:"Date",el4:"Activities"},
        {el1:"Club name" , el2:"Event Name" ,el3:"Date",el4:"Activities"},
        {el1:"Club name" , el2:"Event Name" ,el3:"Date",el4:"Activities"},
        {el1:"Club name" , el2:"Event Name" ,el3:"Date",el4:"Activities"},
        ]
    
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
                <Table userData={userData} tableHeading={tableHeading} tableButton={tablebutton} />
            </div>
        </div>
    )
}

export default Events;