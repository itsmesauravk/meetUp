import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-main">
        <div className="navbar">
        <div className="navbar-logo">
            <img src="https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=yqoos7g9jmufJhfkbQsk-mdhKEsih6Di4WZ66t_ib7I="
            alt="Profile" className="profile-photo" />
        </div>
        <div className="navbar-links">
            <a href="#home" className="navbar-link"><i className="fas fa-home"></i> Home</a>
            <a href="#add" className="navbar-link"><i className="fas fa-plus"></i> Add</a>
            <a href="#users" className="navbar-link"><i className="fas fa-users"></i> Users</a>
            <a href="#notifications" className="navbar-link"><i className="fas fa-bell"></i> Notifications</a>
            <a href="#settings" className="navbar-link"><i className="fas fa-cog"></i> Settings</a>
        </div>
        </div>

    </div>
  );
}

export default Navbar;
