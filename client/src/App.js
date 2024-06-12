import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NewPost from './Pages/NewPost';
import Comment from './Pages/Comment';
import Profile from './Pages/Profile';
import EditPost from './Pages/EditPost';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path='/comment/:userId' element={<Comment />} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path="/edit-post/:postId" element={<EditPost/>} />
      </Routes>
    </Router>
  );
};

export default App;
