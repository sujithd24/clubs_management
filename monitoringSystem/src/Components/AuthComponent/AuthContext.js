import React, { useContext, createContext, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();  
export const AuthData = () => useContext(AuthContext);


export const AuthProvider = ({children}) => {
  const [userType, setUserType] = useState({ isAdmin: false, isStudent: false, isFaculty: false });
  const [ userData, setUserData ] = useState({ name: '' , status:"", email:'', phone:'' , role:'' })



  const login = async (formData) => {
    try {
       const res = await axios.post('http://localhost:5000/api/user/login', formData);
       setUserData({name:res.data.username , status: res.data.status , email:res.data.email , phone:res.data.number , role:res.data.usertype})
       if (res.data.usertype === 'admin') {
         setUserType({ ...userType, isAdmin: true });
        
       } else if (res.data.usertype === 'faculty') {
         setUserType({ ...userType, isFaculty: true });
        
       } else if (res.data.usertype === 'student') {
         setUserType({ ...userType, isStudent: true });
        
       }
      
    } catch (e) {
      console.log(e);
      if(e.status === 404) {
        alert("User not found singin again")
      } else if (e.status === 401) {
        alert('Paaword worng')
      }
    }
  };

  const logout = () => {
    setUserType({ isAdmin: false, isFaculty: false, isStudent: false });
  };

  return (
    <AuthContext.Provider value={{userType, userData ,login ,logout} }>
      {children}
    </AuthContext.Provider>
  );
};
