import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const User_UpdateUser = () => {

  const userId = parseInt(localStorage.getItem('user_id'));
  const [post, setPost] = useState({
    user_id: JSON.stringify(userId),
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
      const isLoggedInUser = localStorage.getItem('isLoggedIn1') === 'true';
      setIsLoggedIn(isLoggedInUser);
    };
    checkLoginStatus();
  }, []);


  const handleClick = () => {
    navigate('/userhomepage');
  };


  const navigatepage = () => {
    localStorage.removeItem('isLoggedIn1');
    setIsLoggedIn(false);
    navigate('/userloginpage');
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
    setPost({ ...post, [event.target.name]: event.target.value })
  }

  const handleInput1 = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value })
    if (isEmailValid(post.email)) {
      return;
    } else {
      alert("Email format is invalid!");
    }
  }

  async function handleSubmit(event) {

    event.preventDefault();

    try {
      if (isPasswordValid(post.passwords)) {

        await axios.put('http://localhost:9001/api/v1/updateuser', JSON.stringify(post), {
          headers: { 'Content-Type': 'application/json' }
        });
        alert("Updation Successful!");

      } else {
        alert("Password format is invalid!");
      }
    } catch (error) {
      console.error(error);
      alert("Update Failed!");
    }

  }

  return (
    <div className='App2'>


      {isLoggedIn ? (

        <div className="auth-form-container">
          <h2 className='link-btn'>Update User</h2><hr />
          <div className='label'><h3>User ID : {userId}</h3></div><hr />
          <form className="register-form">



            <input onChange={handleInput} type="text" placeholder="First_Name" id="first_name" name="first_name" />

            <input onChange={handleInput} type="text" placeholder="Last_Name" id="last_name" name="last_name" />

            <input onClick={handleInput1} type="email" placeholder="Email" id="email" name="email" />

            <input onChange={handleInput} type="password" placeholder="********" id="passwords" name="passwords" />
            <button onChange={handleSubmit}>Update User</button><hr />

          </form>
          <h4><button className="link-btn" onClick={handleClick}>Back to previous page</button></h4>
        </div>

      ) : (
        <div>
          <h1> {location.state.role} logged out!<br /> Please Login again to access this page!.</h1>
          <button onClick={navigatepage}>LogIn</button>
        </div>
      )}

    </div>
  )


};
export default User_UpdateUser;