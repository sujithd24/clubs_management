import Table from "../../Components/CommanComponent/Table/Table";


const Report = () => {

    const userData = [
        {el1:"Participated in events" , el2:"3" ,el3:"10",el4:null},
        {el1:"Participated in events" , el2:"3" ,el3:"10",el4:null},
        {el1:"Participated in events" , el2:"3" ,el3:"10",el4:null},
        {el1:"Participated in events" , el2:"3" ,el3:"10",el4:null},
        {el1:"Participated in events" , el2:"3" ,el3:"10",el4:null},
        {el1:"Participated in events" , el2:"3" ,el3:"10",el4:null},
        ]
    
    const tableHeading = [
        "Participations","Monthly Events","Overall Performance(Out Of 10)","","","",
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

export default Report;