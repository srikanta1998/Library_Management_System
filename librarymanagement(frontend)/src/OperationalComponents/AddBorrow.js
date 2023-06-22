import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddBorrow = () => {
  const userId = parseInt(localStorage.getItem('user_id'));

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const calculateDueDate = (borrowDate) => {
    const startDate = new Date(borrowDate);
    const dueDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    const year = dueDate.getFullYear();
    const month = String(dueDate.getMonth() + 1).padStart(2, '0');
    const day = String(dueDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const [post, setPost] = useState({
    book_id: '',
    user_id: userId,
    borrow_date: getCurrentDate(),
    due_date: calculateDueDate(getCurrentDate()),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedInUser = localStorage.getItem('isLoggedIn1') === 'true';
      setIsLoggedIn(isLoggedInUser);
    };
    checkLoginStatus();
  }, []);

  const handleClick = () => {
    navigate('/userhomepage');
  };

  const navigatepage = () => {
    navigate('/userloginpage');
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    const updatedPost = { ...post, [name]: value };

    if (name === 'borrow_date') {
      const dueDate = calculateDueDate(value);
      updatedPost.due_date = dueDate;
    }

    setPost(updatedPost);
  };

  async function handleSubmit(event) {
    console.log(post);
    event.preventDefault();

    const { book_id } = post;

    if (!book_id) {
      alert('Please add borrow date.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:9001/api/v4/addborrow',
        JSON.stringify(post),
        { headers: { 'Content-Type': 'application/json' } }
      );
      const error_data = response.data;
      alert("Book borrowed successfully!");
    } catch (error) {
      console.error(error);
      alert("check book is valid!");
    }
  }

  return (
    <div className='App2'>
      {isLoggedIn ? (
        <div className='auth-form-container'>
          <h3 className='link-btn'>Borrow Book</h3>
          <hr />

          <form className='register-form'>
            <label htmlFor='user_id'>User ID</label>
            <input
              onChange={handleInput}
              type='number'
              placeholder='User ID'
              id='user_id'
              name='user_id'
              value={post.user_id}
            />

            <label htmlFor='book_id'>Book ID</label>
            <input
              onChange={handleInput}
              type='number'
              placeholder='Book ID'
              id='book_id'
              name='book_id'
              required
            />

            <label htmlFor='borrow_date'>Borrow Date</label>
            <input
              onChange={handleInput}
              type='date'
              placeholder='Borrow Date'
              id='borrow_date'
              name='borrow_date'
              value={post.borrow_date}
            />

            <label htmlFor='due_date'>Due Date</label>
            <input
              onChange={handleInput}
              type='date'
              placeholder='Due Date'
              id='due_date'
              name='due_date'
              value={post.due_date}
            />

            <button onClick={handleSubmit}>Confirm</button>
            <hr />
          </form>

          <button className='link-btn' onClick={handleClick}>
            Back to previous page
          </button>
        </div>
      ) : (
        <div>
          <h1>
            {location.state.role} logged out!
            <br /> Please Login again to access this page!.
          </h1>
          <button onClick={navigatepage}>Log In</button>
        </div>
      )}
    </div>
  );
};

export default AddBorrow;
