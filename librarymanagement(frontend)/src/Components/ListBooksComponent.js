import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ListBookComponent = () =>
{

    const [books, setBooks]= useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

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
        const   fetchBookDetails = async () => {
    
            try{
                const response = await axios.get(`http://localhost:9001/api/v2/allbooks`);
                const book = response.data;
                setBooks(book);
            } catch(error){
                console.error(error);
            }
        };    
        fetchBookDetails();        
        }, []);
    
        useEffect(() => {}, [books]);

    return(
        <div className='App2'>
            <div>

            {isLoggedIn ? (
                <>
                
            <h1>Books List</h1><hr/>
            
            <table className='table table-striped table-bordered table-hover'>
            <thead>
                <tr style={{background:'orange'}}>
                    <th>Book ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Sub</th>
                    <th>Isbn</th>
                    <th>Publisher</th>
                    <th>Publication Date</th>
                    <th>Quantity</th>
                    <th>Available Quantity</th>
                </tr>
            </thead>

            <tbody>
                        {books.map((demo) =>(
                        <tr key={demo.book_id}>
                            <th>{demo.book_id}</th>
                            <th>{demo.title}</th>
                            <th>{demo.author}</th>
                            <th>{demo.sub}</th>
                            <th>{demo.isbn}</th>
                            <th>{demo.publisher}</th>
                            <th>{demo.publication_date}</th>
                            <th>{demo.quantity}</th>
                            <th>{demo.available_quantity}</th>
                        </tr>
                        ))}         
            </tbody>
            </table>
            <button onClick={handleClick}>Back to previous page</button>
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
export default ListBookComponent;