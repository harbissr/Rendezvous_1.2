import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; //imports bootstrap css
import { useNavigate } from "react-router-dom";

const AuthForm = ({setIsAuthenticated}) => {
  //toggles between login and signup
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //disables the submit button when processing api requests
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
//   let token = ""

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => { // Handles form submission
    e.preventDefault();
    setLoading(true); // Start loading
    // Handle submit logic
    try {
        const endpoint = isLogin ? "login" : "signup"; // Set endpoint
        const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/${endpoint}/`, {
            "email":email,
            "password":password
          });
        if (response.status === 200 || response.status === 201){
            const token = response.data.token;
            localStorage.setItem("token", token); //Store the token in local storage
            setIsAuthenticated(true);
            navigate("/homepage");
         }
    } catch (error) {
        setErrorMessage(error.response?.data?.message); // Set error message
    } finally {
        setLoading(false); // Stop loading
    }
  };


return (
    <>
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" disabled={loading}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>} 
      <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Switch to Sign Up" : "Switch to Login"}     
        </button> 
    </div>
    </>
  );
};

export default AuthForm;