import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateBook = () => {

    const [post, setPost] = useState({
        book_id: '',
        title: '',
        author: '',
        sub: '',
        isbn: '',
        publisher: '',
        publication_date: '',
        quantity: '',
        available_quantity: ''

    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    

    useEffect(() => {
        const checkLoginStatus = () => {
          const isLoggedInUser = localStorage.getItem('isLoggedIn2') === 'true';
          setIsLoggedIn(isLoggedInUser);
        };
        checkLoginStatus();
      }, []);

    
        const handleClick = () => {
           navigate('/adminhomepage');    
        };
    

    const navigatepage = () => {
        navigate('/adminloginpage');
      };

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function isBookIdValid(BookId) {
        const numberRegex = /^[1-9]\d*$/;
        return numberRegex.test(BookId);
      };

    async function handleSubmit(event) {

        event.preventDefault();

        const { book_id} = post;
    
    if (!book_id ) {
      alert('Book Id is Mandatory to update any of the fields.');
      return;
    }

        try{

            if(isBookIdValid(post.book_id)){
        await axios.put('http://localhost:9001/api/v2/updatebook', JSON.stringify(post), 
        {headers: {'Content-Type': 'application/json'}});
        alert("Updation Successfull!");
        
            }
            else {
                alert("Book Id is not Integer!");
              }        
       
        } catch(error){
            console.error(error);
            alert("Login Failed!")
        }
    }

    return (
        <div className='App2'>
        
        
        {isLoggedIn ? (
                
                
                <div className="auth-form-container">
            <h3 className='link-btn'>Update Book</h3><hr/>
            <h5>Book Id will not change!</h5>
            <form className="register-form">                
            
            <input onChange={handleInput} type="number" placeholder="book id" id="book_id" name="book_id" /><hr/>
           
            <input onChange={handleInput} type="text" placeholder="title" id="title" name="title"/>
           
            <input onChange={handleInput} type="text" placeholder="author" id="author" name="author" />
           
            <input onChange={handleInput} type="text" placeholder="Subject" id="sub" name="sub" />
           
            <input onChange={handleInput} type="text" placeholder="ISBN" id="isbn" name="isbn" />
           
            <input onChange={handleInput} type="text" placeholder="publisher" id="publisher" name="publisher" />
           
            <input onChange={handleInput} type="date" placeholder="Publication Date" id="publication_date" name="publication_date" />
          
            <input onChange={handleInput} type="number" placeholder="quantity" id="quantity" name="quantity" />
          
            <input onChange={handleInput} type="number" placeholder="available_quantity" id="available_quantity" name="available_quantity" />
            <button onClick={handleSubmit}>Update</button><hr/>
            
        </form>
        <button className="link-btn" onClick={handleClick}>Back to previous page</button>
            </div>             

        ) : (
            <div> 
                <h1> {location.state.role} logged out!<br/> Please Login again to access this page!.</h1>
                <button onClick={navigatepage}>LogIn</button>
            </div>
            )}
    
    </div>
    )
    

};
export default UpdateBook;