import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const BookSearchbySub = () => {
  const [subject, setSubject] = useState('');
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
    setSubject(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:9001/api/v2/books/${subject}`,book,  
        {headers: {'Content-Type': 'application/json'}});
        setBook(response.data);
      
    } catch (error) {
      console.error(error);
      setBook([]);
    }
  };

  return (
    <div className='App2'>
        {isLoggedIn ? (
      <div>
        <div className='auth-form-container'>
          <h2>Book Search by Subject</h2>
          <input
            type='text' placeholder='Enter Subject' value={subject} onChange={handleInputChange}/>
          <button onClick={handleSearch}>Search</button>
        </div>

        {book && book.length > 0 ? (
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
            {book.map((book1) =>(
              <tr>
                <th>{book1.book_id}</th>
                <th>{book1.title}</th>
                <th>{book1.author}</th>
                <th>{book1.sub}</th>
                <th>{book1.isbn}</th>
                <th>{book1.publisher}</th>
                <th>{book1.publication_date}</th>
                <th>{book1.quantity}</th>
                <th>{book1.available_quantity}</th>
              </tr>
              ))}  
            </tbody>
          </table>
          ) : (
            <h2><p>No books found for the given subject.</p></h2>
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

export default BookSearchbySub;
