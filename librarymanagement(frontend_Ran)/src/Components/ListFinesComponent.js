import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ListFinesComponent = () =>
{

    const [fines, setFines]= useState([]);

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
        const   fetchFineDetails = async () => {
    
            try{
                const response = await axios.get(`http://localhost:9001/api/v5/allfines`);
                const fine = response.data;
                setFines(fine);
            } catch(error){
                console.error(error);
            }
        };    
        fetchFineDetails();        
        }, []);
    
        useEffect(() => {}, [fines]);

    return(
        <div className='App2'>
            <div>

            {isLoggedIn ? (
                <>

            <h1>Books List</h1><hr/>
            <>
            <table className='table table-striped table-bordered table-hover'>
            <thead>
                <tr style={{background:'orange'}}>
                <th>Fine ID</th>
                <th>User ID</th>
                <th>Book ID</th>
                <th>Due Date</th>
                <th>Returned Date</th>
                <th>Fine Amount</th>
                </tr>
            </thead>

            <tbody>

                        {fines.map((demo) =>(
                        <tr key={demo.fine_id}>
                            <th>{demo.fine_id}</th>
                                <th>{demo.user_id}</th>
                                <th>{demo.book_id}</th>
                                <th>{demo.due_date}</th>
                                <th>{demo.returned_date}</th>
                                <th>{demo.fine}</th>
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
export default ListFinesComponent;