import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Register from './Pages/Register';
import Homepage from './Pages/Homepage';
import NewPost from './Pages/NewPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/new-post' element={<NewPost />} />
      </Routes>
    </Router>
  );
}

export default App;
