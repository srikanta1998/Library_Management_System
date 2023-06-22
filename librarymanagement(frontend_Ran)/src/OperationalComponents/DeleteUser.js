import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const DeleteUser = () => {

    const [post, setPost] = useState({
        
        user_id: ''

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

      const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const { user_id} = post;
    
        if (!user_id) {
          alert('Please fill in all the required fields.');
          return;
        }

        try{
            await axios.delete(`http://localhost:9001/api/v1/deleteuser/${user_id}`,JSON.stringify(post),  
            {headers: {'Content-Type': 'application/json'}});
            alert("User Deleted Successfully!");
            
        }catch(error){
            console.error(error);
            alert("Login Failed!")
        }
    }

    return (
        <div className='App2'>
        
        
        {isLoggedIn ? (
                
                <div className="auth-form-container">
            <h2 className='link-btn'>Delete User</h2><hr/>
            <form className="register-form">
           
           <label htmlFor="Enter User ID">User ID</label>
            <input onChange={handleInput} type="number" placeholder="User ID" id="user_id" name="user_id" />
            <button onClick={handleSubmit}>Delete User</button><hr/>
            
        </form>
        <h4><button className="link-btn" onClick={handleClick}>Back to previous page</button></h4>
            </div>             

        ) : (
            <div> 
                <h1>{location.state.role}  logged out!<br/> Please Login again to access this page!.</h1>
                <button onClick={navigatepage}>LogIn</button>
            </div>
            )}
    
    </div>
    )
    

};
export default DeleteUser;