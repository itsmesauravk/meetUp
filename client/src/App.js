// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NewPost from './Pages/NewPost';

const App = () => {
  const user = localStorage.getItem('user-data');

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/new-post" element={user ? <NewPost /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
