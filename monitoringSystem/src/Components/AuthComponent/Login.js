import React, { useState } from 'react';
import { AuthData } from './AuthContext';
import './form.css';
import { useNavigate } from 'react-router-dom';
import bitlogo from "../../assets/bit-logo.png";

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate()
  const { login , userType }  = AuthData();

  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value }); 
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      await login(formData)
      if( userType.isAdmin || userType.isStudent || userType.isFaculty ){
        navigate('/')
      }
      
    }
    catch(e){
      console.log(e)
    }
    
  };


  return (
    <div>
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <div style={{display:"flex",gap:"10px",justifyContent:"center",alignItems:"center"}}>
        <img src={bitlogo} height={"70px"}/>
        <h2>Login</h2>
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username} 
            onChange={handleChange}
            placeholder='Username'
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password} 
            onChange={handleChange}
            placeholder='Password'
            required
          />
        </div>
        <button type="submit" className="login-button" >Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
