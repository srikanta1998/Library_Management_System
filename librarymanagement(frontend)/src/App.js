import './App.css';

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import React from 'react';

import { MainHomePage } from './Service/MainHomePage';
import { Register } from './Service/UserRegistrationPage';
import AdminHomePage from './Service/AdminHomePage';
import { AdminLogin } from './Service/AdminLogin';
import UserHomePage from './Service/UserHomePage';
import { UserLogin } from './Service/UserLogin';

import ListBookComponent from './Components/ListBooksComponent';
import ListUsersComponent from './Components/ListUsersComponent';
import ListReservationsComponent from './Components/ListReservationsComponent';
import ListBorrowingsComponent from './Components/ListBorrowingsComponent';
import ListFinesComponent from './Components/ListFinesComponent';

import AddUser from './OperationalComponents/AddUser';
import AddBook from './OperationalComponents/AddBook';
import DeleteUser from './OperationalComponents/DeleteUser';
import DeleteBook from './OperationalComponents/DeleteBook';
import DeleteReservation from './OperationalComponents/DeleteReservation';
import DeleteBorrowings from './OperationalComponents/DeleteBorrowings';
import DeleteFines from './OperationalComponents/DeleteFines';
import UpdateBook from './OperationalComponents/UpdateBook';
import User_UpdateUser from './OperationalComponents/User_UpdateUser';
import Admin_UpdateUser from './OperationalComponents/Admin_UpdateUser';
import SearchBookByID from './OperationalComponents/SearchBookByID';
import BookSearch from './OperationalComponents/SearchBookByID';
import UserSearch from './OperationalComponents/SearchUserByID';
import BookSearchbySub from './OperationalComponents/SearchBookBySubject';
import AddBorrow from './OperationalComponents/AddBorrow';

function App() {
  

  return (
    <Router>
    <div>
      <Routes>

      <Route path='/' element={<MainHomePage />} />
      <Route path='/listbooks' element={<ListBookComponent/>}/>
      <Route path='/listusers' element={<ListUsersComponent/>}/>
      <Route path='/listreservation' element={<ListReservationsComponent/>}/>
      <Route path='/listborrowings' element={<ListBorrowingsComponent/>}/>
      <Route path='/listfines' element={<ListFinesComponent/>}/>

      <Route path='/mainhomepage' element={<MainHomePage/>}/>
      <Route path='/registration' element={<Register/>}/>
      <Route path='/userhomepage' element={<UserHomePage/>}/>
      <Route path='/adminhomepage' element={<AdminHomePage/>}/>
      <Route path='/userloginpage' element={<UserLogin/>}/>
      <Route path='/adminloginpage' element={<AdminLogin/>}/>

      <Route path='/adduser' element={<AddUser/>}/>
      <Route path='/addbook' element={<AddBook/>}/>
      <Route path='/deleteuser' element={<DeleteUser/>}/>     
      <Route path='/deletebook' element={<DeleteBook/>}/>
      <Route path='/deletereservation' element={<DeleteReservation/>}/>
      <Route path='/deleteborrow' element={<DeleteBorrowings/>}/>
      <Route path='/deletefine' element={<DeleteFines/>}/>
      <Route path='/updatebook' element={<UpdateBook/>}/>
      <Route path='/user_updateuser' element={<User_UpdateUser/>}/>
      <Route path='/admin_updateuser' element={<Admin_UpdateUser/>}/>
      <Route path='/searchbook' element={<BookSearch/>}/>
      <Route path='/searchbooksub' element={<BookSearchbySub/>}/>
      <Route path='/searchuser' element={<UserSearch/>}/>
      <Route path='/addborrow' element={<AddBorrow/>}/>

      </Routes>
    </div> 
    </Router>  
  );
  }
export default App;
