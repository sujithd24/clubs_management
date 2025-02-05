import Table from "../../Components/CommanComponent/Table/Table";


const Resource = () => {
    const userData = [
        {el1:"Allocate Budgets" , el2:"Track Expenditures" ,el3:"Total Fund",el4:"Fund Used"},
        {el1:"Allocate Budgets" , el2:"Track Expenditures" ,el3:"Total Fund",el4:"Fund Used"},
        {el1:"Allocate Budgets" , el2:"Track Expenditures" ,el3:"Total Fund",el4:"Fund Used"},
        ]
    
    const tableHeading = [
        "Allocate Budgets","Track Expenditures","Total Fund","Fund Used","","",""
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

export default Resource;