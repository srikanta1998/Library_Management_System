import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddBook = () => {

    const [post, setPost] = useState({
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

    async function handleSubmit(event) {

        event.preventDefault();

        

        const { title, author, sub, isbn, publisher, publication_date, quantity, available_quantity } = post;
    
    if ( !title || !author || !sub || !isbn || !publisher || !publication_date || !quantity || !available_quantity) {
      alert('Please fill in all the required fields.');
      return;
    }

        try{

            const response= await axios.post('http://localhost:9001/api/v2/addbook', JSON.stringify(post), 
        {headers: {'Content-Type': 'application/json'}})
        const error_data = response.data;
        alert(error_data);
                
       
        } catch(error){
            console.error(error);
            alert(error);
        }
    }

    return (
        <div className='App2'>
        
        
        {isLoggedIn ? (
                
                <div className="auth-form-container">
            <h3 className='link-btn'>Add Book</h3><hr/>
            <form className="register-form">
           
            <input onChange={handleInput} type="text" placeholder="title" id="title" name="title"/>
           
            <input onChange={handleInput} type="text" placeholder="author" id="author" name="author" />
           
            <input onChange={handleInput} type="text" placeholder="Subject" id="sub" name="sub" />
           
            <input onChange={handleInput} type="text" placeholder="ISBN" id="isbn" name="isbn" />
           
            <input onChange={handleInput} type="text" placeholder="publisher" id="publisher" name="publisher" />
           
            <input onChange={handleInput} type="date" placeholder="Publication Date" id="publication_date" name="publication_date" />
          
            <input onChange={handleInput} type="number" placeholder="quantity" id="quantity" name="quantity" />
          
            <input onChange={handleInput} type="number" placeholder="available_quantity" id="available_quantity" name="available_quantity" />
            <button onClick={handleSubmit}>Add Book</button><hr/>
            
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
export default AddBook;