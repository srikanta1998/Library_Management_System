import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ListReservationsComponent = () =>
{

    const [reservation, setReservation]= useState([]);

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
        const   fetchReservationDetails = async () => {
    
            try{
                const response = await axios.get(`http://localhost:9001/api/v3/allreservations`);
                const reserve = response.data;
                setReservation(reserve);
            } catch(error){
                console.error(error);
            }
        };    
        fetchReservationDetails();        
        }, []);
    
        useEffect(() => {}, [reservation]);

    return(
        <div className='App2'>
            <div>

            {isLoggedIn ? (
                <>

            <h1>Reservation List</h1><hr/>
            <>
            <table className='table table-striped table-bordered table-hover'>
            <thead>
                <tr style={{background:'orange'}}>
                <th>Reservation ID</th>
                <th>User ID</th>
                <th>Book ID</th>
                <th>Reserved Date</th>
                <th>Due Date</th>
                </tr>
            </thead>

            <tbody>

                        {reservation.map((res) =>(
                        <tr key={res.reservation_id}>
                            <th>{res.reservation_id}</th>
                                <th>{res.user_id}</th>
                                <th>{res.book_id}</th>
                                <th>{res.reserved_date}</th>
                                <th>{res.due_date}</th>
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
export default ListReservationsComponent;