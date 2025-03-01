import { AuthData } from '../../AuthComponent/AuthContext'
import './Table.css'

const Table = ({userData,tableHeading,tableButton}) => {

    const {userType} = AuthData()

    const  buttonAction = (e,d) => {
        alert(e)
    }



    
    return(
        <table className="table">
            <thead >
                <tr className='tableHeading'>
                    <th>SNO</th>
                {tableHeading.map((h,i) => {
                return(
                    <th key={i}>{h}</th>
                )
                })}
                
                </tr>
              
            </thead>
            <tbody>
            {userData.map((d,i) => {
                return(
                <tr key={i} className='tableElements'>
                    <td>{i+1}</td>
                    {d.userid && <td>{d.userid}</td>}
                    {d.username && <td>{d.username}</td>}
                    {d.email && <td>{d.email}</td>}
                    {d.usertype && <td>{d.usertype}</td>}


                    {d.clubName && <td>{d.clubName}</td>}                    
                    {d.eventName && <td>{d.eventName}</td>}
                    {d.Date && <td>{d.Date}</td>}
                    {d.activities && <td>{d.activities}</td>}


                    {d.totalFund && <td>{d.totalFund}</td>}
                    {d.usedFund  && <td>{d.usedFund}</td>}
                    {d.remainingFund && <td>{d.remainingFund}</td>}


                    {d.el1 && <td>{d.el1}</td>}   
                    {d.el2 && <td>{d.el2}</td>}  
                    {d.el3 && <td>{d.el3}</td>}   
                    {d.el4 && <td>{d.el4}</td>}   
                    {d.el5 && <td>{d.el5}</td>}  

                    { (userType.isAdmin || userType.isFaculty) && <td className='tableButton' onClick={() => {buttonAction(d._id,tableButton.b2)}}><span className='btnflex'>{tableButton.b2}</span></td>}
                    { (userType.isAdmin || userType.isFaculty) && <td className='tableButton' onClick={() => {buttonAction(d._id,tableButton.b3)}}><span className='btnflex'>{tableButton.b3}</span></td>}
                    {(tableButton.b1 && userType.isStudent) && <td className='tableButton' onClick={() => {buttonAction(d._id,tableButton.b1)}}><span className='btnflex'>{tableButton.b1}</span></td> }
                </tr>
                )
            })
            }
            </tbody>
        
        </table>
    );
} 

export default Table;