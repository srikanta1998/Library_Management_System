import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserHomePage = () => {

  const [userDetails, setUserDetails] = useState({});
  const [isLoggedIn1, setIsLoggedIn1] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus1 = () => {
      const isLoggedInUser1 = localStorage.getItem('isLoggedIn1') === 'true';
      setIsLoggedIn1(isLoggedInUser1);
    };
    checkLoginStatus1();
  }, []);

  const logout = () => {
    localStorage.removeItem('isLoggedIn1');
    setIsLoggedIn1(false);
    alert('Successfully Logged out!');
  };

  const handleClick01 = () => {
    navigate('/mainhomepage');
  };


  const handleClick0 = () => {
    navigate('/userloginpage');
  };

  const handleClick1 = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };

  const handleClick2 = () => {
    navigate('/listbooks', { state: { role: 'user' } });
  };

  const handleClick3 = () => {
    navigate('/user_updateuser', { state: { role: 'user' } });
  };

  const handleClick4 = () => {
    navigate('/searchbook', { state: { role: 'user' } });
  };

  const handleClick5 = () => {
    navigate('/searchbooksub', { state: { role: 'user' } });
  };

  const handleClick6 = () => {
    navigate('/addborrow', { state: { role: 'user' } });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = parseInt(localStorage.getItem('user_id'));
        const response = await axios.get(
          `http://localhost:9001/api/v1/user/${userId}`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        const userdetails = response.data;
        setUserDetails(userdetails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, []);

  const renderTable = () => {
    if (!showTable) {
      return null;
    }

    return (
      
      <div className='container'>
        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr style={{ background: 'orange' }}>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr key={userDetails.user_id}>
              <th>{userDetails.user_id}</th>
              <th>{userDetails.first_name}</th>
              <th>{userDetails.last_name}</th>
              <th>{userDetails.email}</th>
              <th>{userDetails.role}</th>
            </tr>
          </tbody>
        </table>
        <hr/>
      </div>
    );
  };

  return (
    <div className='App'>
      <div>
      {isLoggedIn1 ? (
        <>
          <h1>Welcome</h1><br/>
          <h4>{userDetails.first_name} {userDetails.last_name}</h4>
          <hr />

          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                  {renderTable()}
                  <button onClick={handleClick1}><h6>{showTable ? 'Hide' : 'My Profile'}</h6></button>
                <span>   </span>
                <button onClick={handleClick3}><h6>Update Profile</h6></button>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table table-bordered">
            <tbody>
              <tr>
              
                <td>
                <button onClick={handleClick2}><h6>All Books</h6></button>
                </td>
                <td>
                <button onClick={handleClick4}><h6>Search by ID</h6></button>
                </td>
                <td>
                
                <button onClick={handleClick5}><h6>Search by Subject</h6></button>
                
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table table-bordered">
            <tbody>
          <tr>
                <td>
                <div className="button-box">
                <button onClick={handleClick6}><h6>Borrow Book</h6></button>
                </div>
                </td>
              </tr>
              </tbody>
              </table>       

          
          <hr />
          <button onClick={logout}><h6>Logout</h6></button>
        </>
      ) : (
        <div>
          <h1>User Login!.</h1>
          <button onClick={handleClick0}><h1>LogIn</h1></button><br/>
          <button className='link-btn' onClick={handleClick01}><h5>go back to main page</h5></button>
          
        </div>
      )}
      
      </div>
    </div>
  );
};

export default UserHomePage;
