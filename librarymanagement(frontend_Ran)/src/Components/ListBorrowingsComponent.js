import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ListBorrowingsComponent = () =>
{

    const [borrowing, setBorrowing]= useState([]);

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
        const   fetchBorrowingDetails = async () => {
    
            try{
                const response = await axios.get(`http://localhost:9001/api/v4/allborrowings`);
                const borrow = response.data;
                setBorrowing(borrow);
            } catch(error){
                console.error(error);
            }
        };    
        fetchBorrowingDetails();        
        }, []);
    
        useEffect(() => {}, [borrowing]);

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
                <th>Borrowing ID</th>
                <th>User ID</th>
                <th>Book ID</th>
                <th>Borrow Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
                </tr>
            </thead>

            <tbody>

                        {borrowing.map((borrow) =>(
                        <tr key={borrow.borrowing_id}>
                        <th>{borrow.borrowing_id}</th>
                        <th>{borrow.user_id}</th>
                        <th>{borrow.book_id}</th>
                        <th>{borrow.borrow_date}</th>
                        <th>{borrow.due_date}</th>
                        <th>{borrow.return_date}</th>
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
export default ListBorrowingsComponent;