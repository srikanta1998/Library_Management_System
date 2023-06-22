import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Admin_UpdateUser = () => {

    const [post, setPost] = useState({
        user_id: '',
        first_name: '',
        last_name: '',
        email: '',
        passwords: '',
        role: ''

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
        navigate('/mainhomepage');
      };

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const { user_id} = post;
    
        if (!user_id) {
          alert('User Id is Mandatory to update any of the fields.');
          return;
        }

        try{
        
            
        await axios.put('http://localhost:9001/api/v1/updateuser', JSON.stringify(post), 
        {headers: {'Content-Type': 'application/json'}});
        alert("Updation Successfull!");
    }catch(error){
        console.error(error);
        alert("Login Failed!")
    }
    }

    return (
        <div className='App2'>
        
        
        {isLoggedIn ? (
                
                <div className="auth-form-container">
            <h2 className='link-btn'>Update User</h2><hr/>
            <h5>User Id will not change!</h5>
            <form className="register-form">

            <input onChange={handleInput} type="number" placeholder="User id" id="user_id" name="user_id" /><hr/>
           
            <input onChange={handleInput} type="text" placeholder="First_Name" id="first_name" name="first_name" />
           
            <input onChange={handleInput} type="text" placeholder="Last_Name" id="last_name" name="last_name" />
           
            <input onChange={handleInput} type="text" placeholder="role" id="role" name="role" />
            <button onClick={handleSubmit}>Update User</button><hr/>
            
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
export default Admin_UpdateUser;