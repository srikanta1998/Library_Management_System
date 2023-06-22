import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ListUsersComponent = () =>
{

    const [users, setUsers]= useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
          const isLoggedInUser1 = localStorage.getItem('isLoggedIn1') === 'true';
          const isLoggedInUser2 = localStorage.getItem('isLoggedIn2') === 'true';
          if(location.state.role === 'admin')
        {
            setIsLoggedIn(isLoggedInUser2);
        }else{
            setIsLoggedIn(isLoggedInUser1);
        }
          
        };
        checkLoginStatus();
      }, []);

     const handleClick = () => {

        if(location.state.role === 'admin')
        {
       navigate('/adminhomepage');
        }else{
            navigate('/userhomepage');
        }
    };

    const navigatepage = () => {
        if(location.state.role === 'admin')
        {
        navigate('/adminloginpage');
        }else{
            navigate('/userloginpage');
        }
      };

    useEffect( () => {
        const   fetchUserDetails = async () => {
    
            try{
                const response = await axios.get(`http://localhost:9001/api/v1/allusers`);
                const user = response.data;
                setUsers(user);
            } catch(error){
                console.error(error);
            }
        };    
        fetchUserDetails();        
        }, []);
    
        useEffect(() => {}, [users]);

    return(
        <div className='App2'>
            <div>

            {isLoggedIn ? (
                <>

            <h1>Users List</h1><hr/>
            <>
            <table className='table table-striped table-bordered table-hover'>
            <thead>
                <tr style={{background:'orange'}}>
                <th>User ID</th>
                <th>First_Name</th>
                <th>Last_Name</th>
                <th>Email</th>
                <th>Role</th>
                </tr>
            </thead>

            <tbody>

                        {users.map((demo) =>(
                        <tr key={demo.user_id}>
                        <th>{demo.user_id}</th>
                        <th>{demo.first_name}</th>
                        <th>{demo.last_name}</th>
                        <th>{demo.email}</th>
                        <th>{demo.role}</th>
                        </tr>
                        ))}         
            </tbody>
            </table>
            
            <button onClick={handleClick}>Back to previous page</button>
            </>

            </>

            ) : (
                 <div>
        
                  <h1> {location.state.role} logged out!<br/> Please Login again to access this page!.</h1>
                       <button onClick={navigatepage}>LogIn</button>

                </div>
                 )}

            </div>
        </div>

    );
    }
export default ListUsersComponent;