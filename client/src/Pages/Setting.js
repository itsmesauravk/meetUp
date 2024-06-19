import React, { useState } from 'react';
import Navbar from '../Component/Navbar';
import '../css/Setting.css';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate()

    const successNotify = () => {
        toast.success("Logout Successfully.", {
            position: "top-right",
            autoClose: 2000,
          });
    }
    const errorNotify = () => {
        toast.error("Failed Logout.", {
            position: "top-right",
            autoClose: 2000,
          });
    }

  const handleLogout = () => {
      try {
        localStorage.removeItem('user-data');
        successNotify()
        navigate('/login')
        
        
    } catch (error) {
        console.log(error);
        errorNotify()
        setShowLogoutConfirm(false);
    }

  };

  return (
    <>
      <Navbar />
      <div className="settings-container">
        <h1>Settings</h1>
        <div className="settings-options">
          <div className="settings-option">Account Settings</div>
          <div className="settings-option">Privacy Settings</div>
          <div className="settings-option">Security Settings</div>
          <div className="settings-option">Notifications</div>
          <div className="settings-option">Language</div>
          <div className="settings-option">Connected Apps</div>
          <div className="settings-option">Ads Settings</div>
          <div className="settings-option">Support</div>
          <div className="settings-option">About</div>
        </div>
        <div className="logout-section">
          <button onClick={() => setShowLogoutConfirm(true)}>Logout</button>
          {showLogoutConfirm && (
            <div className="logout-confirm">
              <p>Are you sure you want to logout?</p>
              <button onClick={handleLogout}>Yes</button>
              <button onClick={() => setShowLogoutConfirm(false)}>No</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Setting;
