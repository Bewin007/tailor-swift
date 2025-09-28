import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ViewConcerts from './components/ViewConcerts';
import ViewTickets from './components/ViewTickets';
import Navbar from './components/Navbar';

import UserRegister from './components/auth/UserRegister';
import BookTickets from './components/BookTickets';
import UserLogin from './components/auth/UserLogin';
function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route index  element={<Home/>} /> 

        <Route path='/home'  element={<Home/>} /> 
        <Route path='/view-concert' element={<ViewConcerts/>}/>
        <Route path='/view-tickets' element={<ViewTickets/>}/>
        <Route path='/book-tickets/:concertid' element={<BookTickets/>} />
      

        <Route path='/registration' element={<UserRegister/>} />
        <Route path='/login' element={<UserLogin/>} />

        {/* <Route path='' */}
      </Routes>
    </div>
  );
}

export default App;
