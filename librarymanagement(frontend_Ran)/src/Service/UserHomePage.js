import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListBookComponent from '../Components/ListBooksComponent';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const UserHomePage = () => {

  const [userDetails, setUserDetails] = useState({});
  const [isLoggedIn1, setIsLoggedIn1] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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

  const showParentModal = () => {
    setShowProfile((prevShowTable) => !prevShowTable);
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
    if (!showProfile) {
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
        <hr />
      </div>
    );
  };

  return (
    <div className='App'>
      <div>
        {isLoggedIn1 ? (
          <>
            <Navbar bg="light">
              <Container>
                <Navbar.Brand href="#home">Book Lib</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link >All Books</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text onClick={handleClick3}>
                    Signed in as: <a href="#login">{userDetails.first_name} {userDetails.last_name}</a>
                  </Navbar.Text>
                  <span style={{ paddingLeft: '20px' }}> </span>
                  <Button variant="outline-success" onClick={logout} >Logout</Button>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <div>

              <ListBookComponent />
            </div>
          </>
        ) : (
          <div>
            <h1>User Login!.</h1>
            <button onClick={handleClick0}><h1>LogIn</h1></button><br />
            <button className='link-btn' onClick={handleClick01}><h5>go back to main page</h5></button>

          </div>
        )}

      </div>
    </div >
  );
};

export default UserHomePage;
