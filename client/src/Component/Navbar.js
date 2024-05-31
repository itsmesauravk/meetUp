import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState({});

  const userData = localStorage.getItem('user-data');
  const id = JSON.parse(userData).userId;

  const getUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user-data/${id}`, {
        method: 'GET'
      });
      const data = await response.json();
      if(data.success){
        setUser(data.showDetail);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="navbar-main">
      <div className="navbar">
        <div className="navbar-logo">
          <img 
            src="https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=yqoos7g9jmufJhfkbQsk-mdhKEsih6Di4WZ66t_ib7I="
            alt="Profile" 
            className="profile-photo" 
          />
          <p><b>{user.firstName} {user.lastName}</b></p>
        </div>
        <div className="navbar-links">
          <Link to="/" className="navbar-link"><i className="fas fa-home"></i> Home</Link>
          <Link to="/new-post" className="navbar-link"><i className="fas fa-plus"></i> Add</Link>
          <Link to="/users" className="navbar-link"><i className="fas fa-users"></i> Users</Link>
          <Link to="/notifications" className="navbar-link"><i className="fas fa-bell"></i> Notifications</Link>
          <Link to="/settings" className="navbar-link"><i className="fas fa-cog"></i> Settings</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
