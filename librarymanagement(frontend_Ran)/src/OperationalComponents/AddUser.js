import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddUser = () => {

    const [post, setPost] = useState({
        first_name: '',
        last_name: '',
        email: '',
        passwords: ''

    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    

    useEffect(() => {
        const checkLoginStatus = () => {
          const isLoggedInUser = localStorage.getItem('isLoggedIn2') === 'true';
          setIsLoggedIn(isLoggedInUser);
        };
        checkLoginStatus();
      }, []);

    
        const handleClick = () => {
           navigate('/adminhomepage');    
        };
    

    const navigatepage = () => {
        navigate('/adminloginpage');
      };

      function isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

    function isPasswordValid(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
      };

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const { first_name, last_name, email, passwords} = post;
    
        if (!first_name || !last_name || !email || !passwords) {
          alert('Please fill in all the required fields.');
          return;
        }

        try{
        if (isEmailValid(post.email)) {
            if(isPasswordValid(post.passwords)){
        await axios.post('http://localhost:9001/api/v1/adduser', JSON.stringify(post), 
        {headers: {'Content-Type': 'application/json'}});
        alert("User Added Successfully!");
        
            }       
    else {
        alert("Password format is invalid!");
      }
    }
    else {
        alert("Email format is invalid!");
      }
    }catch(error){
        console.error(error);
        alert("Login Failed!")
    }
    }

    return (
        <div className='App2'>
        
        
        {isLoggedIn ? (
                
                <div className="auth-form-container">
            <h2 className='link-btn'>Add User</h2><hr/>
            <form className="register-form">
           
            <input onChange={handleInput} type="text" placeholder="First_Name" id="first_name" name="first_name" />
           
            <input onChange={handleInput} type="text" placeholder="Last_Name" id="last_name" name="last_name" />
           
            <input onChange={handleInput} type="email" placeholder="Email" id="email" name="email" />
           
            <input onChange={handleInput} type="password" placeholder="********" id="passwords" name="passwords" />
            <button onClick={handleSubmit}>Add User</button><hr/>
            
        </form>
        <h4><button className="link-btn" onClick={handleClick}>Back to previous page</button></h4>
            </div>             

        ) : (
            <div> 
                <h1> {location.state.role} logged out!<br/> Please Login again to access this page!.</h1>
                <button onClick={navigatepage}>LogIn</button>
            </div>
            )}
    
    </div>
    )
    

};
export default AddUser;