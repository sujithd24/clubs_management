import Table from "../../Components/CommanComponent/Table/Table";


const Feedback = () => {

    const userData = [
        {el1:"Club name" , el2:"00/00/0000" ,el3:"Feedback",el4:null},
        {el1:"Club name" , el2:"00/00/0000" ,el3:"Feedback",el4:null},
        {el1:"Club name" , el2:"00/00/0000" ,el3:"Feedback",el4:null},
        {el1:"Club name" , el2:"00/00/0000" ,el3:"Feedback",el4:null},
        {el1:"Club name" , el2:"00/00/0000" ,el3:"Feedback",el4:null},
        {el1:"Club name" , el2:"00/00/0000" ,el3:"Feedback",el4:null},
        ]
    
    const tableHeading = [
        "Club Name","Date","Feedback","","","",
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

export default Feedback;