import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const BookSearch = () => {
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState(null);

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
  

  const handleInputChange = (event) => {
    setBookId(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:9001/api/v2/onebook/${bookId}`,JSON.stringify(book),  
        {headers: {'Content-Type': 'application/json'}});
      setBook(response.data);
      
    } catch (error) {
      console.error(error);
      setBook(null);
      
    }
  };

  return (
    <div className='App2'>
        {isLoggedIn ? (
      <div>
        <div className='auth-form-container'>
          <h2>Book Search</h2>
          <input
            type='number' placeholder='Enter book ID' value={bookId} onChange={handleInputChange}/>
          <button onClick={handleSearch}>Search</button>
        </div>

        {book && Object.keys(book).length > 0 ? (
          <table className='table table-striped table-bordered table-hover'>
            <thead>
              <tr style={{ background: 'orange' }}>
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
              <tr>
                <th>{book.book_id}</th>
                <th>{book.title}</th>
                <th>{book.author}</th>
                <th>{book.sub}</th>
                <th>{book.isbn}</th>
                <th>{book.publisher}</th>
                <th>{book.publication_date}</th>
                <th>{book.quantity}</th>
                <th>{book.available_quantity}</th>
              </tr>
            </tbody>
          </table>
        ) : (
          
          <h2><p>No book found for the Book Id.</p></h2>
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

export default BookSearch;
