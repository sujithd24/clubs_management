import Table from "../../Components/CommanComponent/Table/Table";


const Participation = () => {

    const userData = [
        {el1:"Event Name" , el2:"Date" ,el3:"Timing",},
        {el1:"Event Name" , el2:"Date" ,el3:"Timing",},
        {el1:"Event Name" , el2:"Date" ,el3:"Timing",},
        {el1:"Event Name" , el2:"Date" ,el3:"Timing",},
        {el1:"Event Name" , el2:"Date" ,el3:"Timing",},
        {el1:"Event Name" , el2:"Date" ,el3:"Timing",},
        ]
    
    const tableHeading = [
        "Event Name","Date","Timing","","","","",""
      ]

    const tablebutton = {
        b2:"Update",
        b3:"Delete",
      }

    return(
        <div className="allContent">
            <div className="userContent">
                <Table userData={userData} tableHeading={tableHeading} tableButton={tablebutton} />
            </div>
        </div>
    )
}

export default Participation;