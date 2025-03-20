import { AuthData } from '../../AuthComponent/AuthContext';
import './Table.css';
import { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Table = ({ userData, tableHeading, tableButton }) => {
    const { userType } = AuthData();
    const [isUpdateClick, setUpdateClick] = useState(false);
    const [isCreateClick, setCreateClick] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [formData, setFormData] = useState({});
    const [createFormData, setCreateFormData] = useState({});


    const exportToExcel = () => {
        // Filter out '__v' from userData
        const filteredData = userData.map(({ __v,_id, ...rest }) => rest);
    
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "TableData");
    
        // Save file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(data, "Resources.xlsx");
    };
    


    // Handle button actions (Update, Delete, Create)
    const buttonAction = async (id, action) => {
        if (action === "Update") {
            const dataToUpdate = userData.find((d) => d._id === id);
            if (dataToUpdate) {
                setSelectedData(dataToUpdate);
                setFormData({ ...dataToUpdate });
                setUpdateClick(true);
            }
        } else if (action === "Delete") {
            const confirmDelete = window.confirm("Are you sure you want to delete this item?");
            if (confirmDelete) {
                try {
                    
                    if(window.location.href === "http://localhost:3000/usermanagement"){
                        await axios.delete(`http://localhost:5000/api/user/${id}`);
                        window.location.reload();
                        } else if (window.location.href === "http://localhost:3000/event"){
                            await axios.delete(`http://localhost:5000/api/event/${id}`);
                        window.location.reload();
                        } else if (window.location.href === "http://localhost:3000/resource"){
                            await axios.delete(`http://localhost:5000/api/fund/${id}`);
                        window.location.reload();
                        } else if (window.location.href === "http://localhost:3000/report"){
                            await axios.delete(`http://localhost:5000/api/report/${id}`);
                        window.location.reload();
                        }else if (window.location.href === "http://localhost:3000/attendance"){
                            await axios.delete(`http://localhost:5000/api/attendance/${id}`);
                        window.location.reload();
                        }else if (window.location.href === "http://localhost:3000/eventlist"){
                            await axios.delete(`http://localhost:5000/api/event/${id}`);
                        window.location.reload();
                        }else if (window.location.href === "http://localhost:3000/feedback"){
                            await axios.delete(`http://localhost:5000/api/feedback/${id}`);
                        window.location.reload();
                        }


                        if(window.location.href === "http://localhost:3001/usermanagement"){
                            await axios.delete(`http://localhost:5000/api/user/${id}`);
                            window.location.reload();
                            } else if (window.location.href === "http://localhost:3001/event"){
                                await axios.delete(`http://localhost:5000/api/event/${id}`);
                            window.location.reload();
                            } else if (window.location.href === "http://localhost:3001/resource"){
                                await axios.delete(`http://localhost:5000/api/fund/${id}`);
                            window.location.reload();
                            } else if (window.location.href === "http://localhost:3001/report"){
                                await axios.delete(`http://localhost:5000/api/report/${id}`);
                            window.location.reload();
                            } else if (window.location.href === "http://localhost:3001/attendance"){
                                await axios.delete(`http://localhost:5000/api/attendance/${id}`);
                            window.location.reload();
                            }else if (window.location.href === "http://localhost:3001/eventlist"){
                                await axios.delete(`http://localhost:5000/api/event/${id}`);
                            window.location.reload();
                            }else if (window.location.href === "http://localhost:3001/feedback"){
                                await axios.delete(`http://localhost:5000/api/feedback/${id}`);
                            window.location.reload();
                            }
                } catch (error) {
                    console.error("Error deleting user:", error);
                }
            }
        } else if (action === "Create") {
            setCreateFormData({}); // Reset form for new entry
            setCreateClick(true);
        }
    };

    // Handle input change for Update Form
    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle input change for Create Form
    const handleCreateChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value)
        setCreateFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle Update Submission
    const handleUpdateSubmit = async (event, id) => {
        event.preventDefault();
        try {
            if(window.location.href === "http://localhost:3000/usermanagement"){
                    await axios.put(`http://localhost:5000/api/user/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3000/event"){
                    await axios.put(`http://localhost:5000/api/event/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3000/resource"){
                    await axios.put(`http://localhost:5000/api/fund/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3000/report"){
                    await axios.put(`http://localhost:5000/api/report/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                }
                else if (window.location.href === "http://localhost:3000/attendance"){
                    await axios.put(`http://localhost:5000/api/attendance/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                }else if (window.location.href === "http://localhost:3000/eventlist"){
                    await axios.put(`http://localhost:5000/api/event/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3000/feedback"){
                    await axios.put(`http://localhost:5000/api/feedback/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                }


                if(window.location.href === "http://localhost:3001/usermanagement"){
                    await axios.put(`http://localhost:5000/api/user/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3001/event"){
                    await axios.put(`http://localhost:5000/api/event/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3001/resource"){
                    await axios.put(`http://localhost:5000/api/fund/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3001/report"){
                    await axios.put(`http://localhost:5000/api/report/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                }
                else if (window.location.href === "http://localhost:3001/attendance"){
                    await axios.put(`http://localhost:5000/api/attendance/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                }else if (window.location.href === "http://localhost:3001/eventlist"){
                    await axios.put(`http://localhost:5000/api/event/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                }else if (window.location.href === "http://localhost:3001/feedback"){
                    await axios.put(`http://localhost:5000/api/feedback/${id}`, formData);
                setUpdateClick(false);
                window.location.reload();
                }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Handle Create Submission
    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        try {
            if(window.location.href === "http://localhost:3000/usermanagement"){
            await axios.post('http://localhost:5000/api/user', createFormData);
            setCreateClick(false);
            window.location.reload();
            } else if (window.location.href === "http://localhost:3000/event"){
                await axios.post('http://localhost:5000/api/event ', createFormData);
            setCreateClick(false);
            window.location.reload();
            } else if (window.location.href === "http://localhost:3000/resource"){
                await axios.post('http://localhost:5000/api/fund', createFormData);
            setCreateClick(false);
            window.location.reload();
            } else if (window.location.href === "http://localhost:3000/report"){
                await axios.post('http://localhost:5000/api/report', createFormData);
            setCreateClick(false);
            window.location.reload();
            }else if ((window.location.href === "http://localhost:3000/attendance")){
                await axios.post('http://localhost:5000/api/attendance', createFormData);
            setCreateClick(false);
            window.location.reload();
            }else if (window.location.href === "http://localhost:3000/eventlist"){
                await axios.post('http://localhost:5000/api/event', createFormData);
            setCreateClick(false);
            window.location.reload();
            }else if (window.location.href === "http://localhost:3000/eventclander"){
                await axios.post('http://localhost:5000/api/attendance', createFormData);
            setCreateClick(false);
            window.location.reload();
            }


            if(window.location.href === "http://localhost:3001/usermanagement"){
                await axios.post('http://localhost:5000/api/user', createFormData);
                setCreateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3001/event"){
                    await axios.post('http://localhost:5000/api/event ', createFormData);
                setCreateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3001/resource"){
                    await axios.post('http://localhost:5000/api/fund', createFormData);
                setCreateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3001/report"){
                    await axios.post('http://localhost:5000/api/report', createFormData);
                setCreateClick(false);
                window.location.reload();
                } else if ((window.location.href === "http://localhost:3001/attendance")){
                    await axios.post('http://localhost:5000/api/attendance', createFormData);
                setCreateClick(false);
                window.location.reload();
                } else if (window.location.href === "http://localhost:3001/eventlist"){
                    await axios.post('http://localhost:5000/api/event', createFormData);
                setCreateClick(false);
                window.location.reload();
                } else if ((window.location.href === "http://localhost:3001/eventclander")){
                    await axios.post('http://localhost:5000/api/attendance', createFormData);
                setCreateClick(false);
                window.location.reload();
                }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <div className="table-container">
            {/* Update Form Modal */}
            {isUpdateClick && selectedData && (
                <div className="update-form-container">
                    <div className="update-form-overlay" onClick={() => setUpdateClick(false)}></div>
                    <div className="update-form" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setUpdateClick(false)}>X</button>
                        <h2>Update User</h2>
                        <form onSubmit={(e) => handleUpdateSubmit(e, selectedData["_id"])}>
                            {Object.keys(selectedData).map((key) =>
                                key !== '_id' && key !== "__v" && key !== "password" && (
                                    
                                    <div className="form-group" key={key}>
                                        <label>{key}</label>{key === "attendance"?
                                        ( <select 
                                            name="attendance" 
                                            value={formData[key] || ''} 
                                            onChange={handleUpdateChange}
                                        >
                                            <option value="" disabled>Select Attendance</option>
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                        </select> )
                                        :                                    
                                    (<input
                                            type="text"
                                            name={key}
                                            value={(key === "Date"? (new Date(formData[key]).toLocaleDateString()):formData[key] )|| ''}
                                            onChange={handleUpdateChange}
                                        />
                                    )}</div>
                                )
                            )}
                            <button type="submit" className="update-button">Update</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Create Form Modal */}
            {isCreateClick && (
                <div className="update-form-container">
                    <div className="update-form-overlay" onClick={() => setCreateClick(false)}></div>
                    <div className="update-form" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setCreateClick(false)}>X</button>
                        <h2>Create New User</h2>
                        <form onSubmit={handleCreateSubmit}>
                            {(window.location.href === "http://localhost:3000/usermanagement" || window.location.href === "http://localhost:3001/usermanagement")&&<>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="username" value={createFormData.username || ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={createFormData.email || ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>User ID</label>
                                <input type="text" name="userid" value={createFormData.userid || ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" value={createFormData.password|| ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>User Type</label>
                                <select name="usertype"  value={createFormData.usertype || ''} onChange={handleCreateChange}>
                                    <option value="">Select Type</option>
                                    <option value="admin">Admin</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="student">Student</option>
                                </select>
                            </div></>
                                }
                                {(window.location.href === "http://localhost:3000/event"||window.location.href === "http://localhost:3001/event" )&&<>
                            <div className="form-group">
                                <label>Club Name</label>
                                <input type="text" name="clubName" value={createFormData.clubName || ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Event Name</label>
                                <input type="text" name="eventName" value={createFormData.eventName|| ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" name="Date" value={ createFormData.Date || ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Activities</label>
                                <input type="text" name="activities" value={createFormData.activities|| ''} onChange={handleCreateChange} />
                            </div>
                           </>
                                }
                                {(window.location.href === "http://localhost:3000/resource" || window.location.href === "http://localhost:3001/resource") &&<>
                                    <div className="form-group">
                                <label>Club Name</label>
                                <input type="text" name="clubName" value={createFormData.clubName || ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Allocate Budgets</label>
                                <input type="text" name="totalFund" value={createFormData.totalFund || ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Used Fund</label>
                                <input type="text" name="usedFund" value={createFormData.usedFund|| ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Remaining Fund</label>
                                <input type="text" name="remainingFund" value={createFormData.remainingFund || ''} onChange={handleCreateChange} />
                            </div>
                           </>
                                }
                                {(window.location.href === "http://localhost:3000/report" ||  window.location.href === "http://localhost:3001/report")&&<>
                                    <div className="form-group">
                                <label>Club Name</label>
                                <input type="text" name="clubName" value={createFormData.clubName || ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Participations</label>
                                <input type="text" name="Participations" value={createFormData.Participations || ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>MonthlyEvents</label>
                                <input type="text" name="MonthlyEvents" value={createFormData.MonthlyEvents || ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Performance</label>
                                <input type="text" name="Performance" value={createFormData.Performance|| ''} onChange={handleCreateChange} />
                            </div>
                           </>
                                }
                                {(window.location.href === "http://localhost:3000/attendance" ||  window.location.href === "http://localhost:3001/attendance")&&<>
                                    <div className="form-group">
                                <label>Club Name</label>
                                <input type="text" name="clubName" value={createFormData.clubName || ''} onChange={handleCreateChange} />
                            </div> 
                            <div className="form-group">
                                <label>Event Name</label>
                                <input type="text" name="eventName" value={createFormData.eventName|| ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="Name" value={createFormData.Name|| ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Roll Number</label>
                                <input type="text" name="rollno" value={createFormData.rollno|| ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Attendance</label>
                                <select 
        name="attendance" 
        value={createFormData.attendance || 'Absent'} 
        onChange={handleCreateChange}
    >
        <option value="" disabled>Select Attendance</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
    </select> </div>
                                                    
                           </>
                                }
                                {(window.location.href === "http://localhost:3000/eventclander" ||  window.location.href === "http://localhost:3001/eventclander")&&<>
                                    <div className="form-group">
                                <label>Club Name</label>
                                <input type="text" name="clubName" value={createFormData.clubName || ''} onChange={handleCreateChange} />
                            </div> 
                            <div className="form-group">
                                <label>Event Name</label>
                                <input type="text" name="eventName" value={createFormData.eventName|| ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="Name" value={createFormData.Name|| ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Roll Number</label>
                                <input type="text" name="rollno" value={createFormData.rollno|| ''} onChange={handleCreateChange} />
                            </div>
                            <div className="form-group">
                                <label>Attendance</label>
                                <select 
        name="attendance" 
        value={createFormData.attendance || 'Absent'} 
        onChange={handleCreateChange}
    >
        <option value="Absent">Select Attendance</option>
        <option disabled value="Present">Present</option>
        <option value="Absent">Absent</option>
    </select>
                            </div>
                                                    
                           </>
                                }
                            <button type="submit" className="update-button">Create</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Table Section */}
            <table className="table" style={{ marginTop: "50px" }}>
                <thead>
                    <tr className='tableHeading'>
                        <th>SNO</th>
                        {tableHeading.map((h, i) => (
                            <th key={i}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {userData.map((d, i) => (
                        <tr key={i} className='tableElements'>
                            <td>{i + 1}</td>
                           {d.userid && <td>{d.userid}</td>}
                            {d.username && <td>{d.username}</td>}
                            {d.email && <td>{d.email}</td>}
                            {d.usertype && <td>{d.usertype}</td>}
                            {d.clubName && <td>{d.clubName}</td>}
                           {d.eventName && <td>{d.eventName}</td>}
                            {d.Date && <td>{new Date(d.Date).toLocaleDateString()}</td>}
                            {d.activities && <td>{d.activities}</td>}
                            {d.totalFund && <td>{d.totalFund}</td>}
                            {d.usedFund && <td>{d.usedFund}</td>}
                            {d.remainingFund && <td>{d.remainingFund}</td>}
                            {d.Participations && <td>{d.Participations}</td>}
                            {d.MonthlyEvents && <td>{d.MonthlyEvents}</td>}
                            {d.Performance && <td>{d.Performance}</td>} 
                            {d.Name && <td>{d.Name}</td>}
                            {d.rollno && <td>{d.rollno}</td>}
                            {d.attendance && <td>{d.attendance}</td>}
                            {d.feedback && <td>{d.feedback}</td>}
                            {!(window.location.href === "http://localhost:3000/feedback" || window.location.href === "http://localhost:3001/feedback") &&(userType.isAdmin || userType.isFaculty) && (
                                <td className='tableButton' onClick={() => buttonAction(d._id, "Update")}>
                                    <span className='btnflex'>{tableButton.b2}</span>
                                </td>
                            )}
                            {!(window.location.href === "http://localhost:3000/feedback" || window.location.href === "http://localhost:3001/feedback" ) &&(userType.isAdmin || userType.isFaculty) && (
                                <td className='tableButton' onClick={() => buttonAction(d._id, "Delete")}>
                                    <span className='btnflex'>{tableButton.b3}</span>
                                </td>
                            )}

{(window.location.href === "http://localhost:3000/feedback" || window.location.href === "http://localhost:3001/feedback") &&(userType.isStudent) && (
                                <td className='tableButton' onClick={() => buttonAction(d._id, "Update")}>
                                    <span className='btnflex'>{tableButton.b2}</span>
                                </td>
                            )}
                            {(window.location.href === "http://localhost:3000/feedback" || window.location.href === "http://localhost:3001/feedback" ) &&(userType.isStudent) && (
                                <td className='tableButton' onClick={() => buttonAction(d._id, "Delete")}>
                                    <span className='btnflex'>{tableButton.b3}</span>
                                </td>
                            )}

                            
                        </tr>
                    ))}
                </tbody>
            </table>
                    <div style={{display:'flex',gap:"10px"}} >
            {/* Create Button (Only for Admins) */}
            {!(window.location.href === "http://localhost:3000/feedback" || window.location.href === "http://localhost:3001/feedback" ) && (userType.isFaculty || userType.isAdmin)  && (
                <button className='btnflex' id='createBtn' onClick={() => buttonAction(null, "Create")}>Create</button>
            )}
           {(window.location.href === "http://localhost:3000/eventclander" || window.location.href === "http://localhost:3001/eventclander" ) && (userType.isStudent)  && (
                <button className='btnflex' id='createBtn' onClick={() => buttonAction(null, "Create")}>Create</button>
            )}
            {(window.location.href === "http://localhost:3000/resource" || window.location.href === "http://localhost:3001/resource") && <button onClick={exportToExcel} className="btnflex" id='createBtn' >Export to Excel</button>}</div>
        </div>
    );
};

export default Table;
