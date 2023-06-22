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
      <div className='table-container'>
        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr key={userDetails.user_id}>
              <td>{userDetails.user_id}</td>
              <td>{userDetails.first_name}</td>
              <td>{userDetails.last_name}</td>
              <td>{userDetails.email}</td>
              <td>{userDetails.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className='App'>
      <div>
        {isLoggedIn1 ? (
          <>
            <header className='bg-dark text-white py-4'>
              <h1>Welcome to the Library Management System</h1>
            </header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
              <span className='navbar-text'>
                Hello, {userDetails.first_name} {userDetails.last_name}
              </span>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <button  onClick={handleClick1}>
                    My Profile
                  </button>
                </li>
                <li className='nav-item'>
                  <button  onClick={handleClick2}>
                    All Books
                  </button>
                </li>
                <li className='nav-item'>
                  <button  onClick={handleClick4}>
                    Search Books
                  </button>
                </li>
                <li className='nav-item'>
                  <button  onClick={handleClick5}>
                    Search by Subject
                  </button>
                </li>
              </ul>
            </nav>

            <div className='container py-4'>
              <div className='profile-section section'>
                <h3>Profile</h3>
                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <td>{renderTable()}</td>
                    </tr>
                  </tbody>
                </table>
                <button className='btn btn-primary' onClick={handleClick3}>
                  Update Profile
                </button>
              </div>
            </div>

            <div className='logout-button'>
              <button className='btn btn-primary' onClick={logout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <div>
            <h1>User Login!.</h1>
            <button className='btn btn-primary' onClick={handleClick0}>
              Login
            </button>
            <br />
            <button className='link-btn' onClick={handleClick01}>
              Go back to main page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHomePage;
