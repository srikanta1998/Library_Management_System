import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UserSearch = () => {
  const [userId, setuserId] = useState('');
  const [users, setUsers] = useState(null);

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
  

  const handleInputChange = (event) => {
    setuserId(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:9001/api/v1/user/${userId}`,JSON.stringify(users),  
        {headers: {'Content-Type': 'application/json'}});
      setUsers(response.data);
      
    } catch (error) {
      console.error(error);
      alert('User Id dosent have any match!');
    }
  };

  return (
    <div className='App2'>
        {isLoggedIn ? (
      <div>
        <div className='auth-form-container'>
          <h2>User Search</h2>
          <input
            type='number' placeholder='Enter User ID' value={userId} onChange={handleInputChange}/>
          <button onClick={handleSearch}>Search</button>
        </div>

        {users && (
          <table className='table table-striped table-bordered table-hover'>
            <thead>
              <tr style={{ background: 'orange' }}>
                <th>User ID</th>
                <th>First_Name</th>
                <th>Last_Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th>{users.user_id}</th>
                <th>{users.first_name}</th>
                <th>{users.last_name}</th>
                <th>{users.email}</th>
                <th>{users.role}</th>
              </tr>
            </tbody>
          </table>
        )}

        <h4><button className="link-btn" onClick={handleClick}>Back to previous page</button></h4>
      </div>
      ) : (
        <div> 
            <h1>{location.state.role}  logged out!<br/> Please Login again to access this page!.</h1>
            <button onClick={navigatepage}>LogIn</button>
        </div>
        )}
    </div>
  );
};

export default UserSearch;
