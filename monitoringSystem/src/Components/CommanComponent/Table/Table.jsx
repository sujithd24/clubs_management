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
                    
                    {d.el4 && <td>{d.el4}</td>}   
                    {d.el5 && <td>{d.el5}</td>}   
                    { (userType.isAdmin || userType.isFaculty) && <td className='tableButton' onClick={() => {buttonAction(d._id,tableButton.b2)}}>{tableButton.b2}</td>}
                    { (userType.isAdmin || userType.isFaculty) && <td className='tableButton' onClick={() => {buttonAction(d._id,tableButton.b3)}}>{tableButton.b3}</td>}
                    {(tableButton.b1 && userType.isStudent) && <td className='tableButton' onClick={() => {buttonAction(d._id,tableButton.b1)}}>{tableButton.b1}</td> }
                </tr>
                )
            })
            }
            </tbody>
        
        </table>
    );
} 

export default Table;