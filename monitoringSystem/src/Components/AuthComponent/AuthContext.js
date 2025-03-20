import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    const storedUserType = localStorage.getItem('userType');
    return storedUserType ? JSON.parse(storedUserType) : { isAdmin: false, isStudent: false, isFaculty: false };
  });

  const [user, setUser] = useState(() => localStorage.getItem('user') || '');

  useEffect(() => {
    localStorage.setItem('userType', JSON.stringify(userType));
    localStorage.setItem('user', user);
  }, [userType, user]);

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', formData, { withCredentials: true });

      if (res.data.usertype === 'admin') {
        setUserType({ isAdmin: true, isStudent: false, isFaculty: false });
        setUser('admin');
      } else if (res.data.usertype === 'faculty') {
        setUserType({ isAdmin: false, isStudent: false, isFaculty: true });
        setUser('faculty');
      } else if (res.data.usertype === 'student') {
        setUserType({ isAdmin: false, isStudent: true, isFaculty: false });
        setUser('student');
      }
    } catch (e) {
      console.log(e);
      if (e.response?.status === 404) {
        alert("User not found, sign in again");
      } else if (e.response?.status === 401) {
        alert("Incorrect password");
      }
    }
  };

  const logout = () => {
    setUserType({ isAdmin: false, isFaculty: false, isStudent: false });
    setUser('');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ userType,setUserType, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
