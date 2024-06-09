import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import '../css/Profile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState({});

    const userData = localStorage.getItem('user-data');
    const id = JSON.parse(userData).userId;

    const getUser = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user-data/${id}`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.success) {
                setProfileData(data.showDetail);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">
                    <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" alt="Profile" className="profile-pic" />
                    <div className="profile-info">
                        <h2>{profileData.firstName} {profileData.lastName}</h2>
                        <p>Email: {profileData.email}</p>
                        <p>Phone: {profileData.phoneNumber}</p>
                        <p>Gender: {profileData.gender}</p>
                        <p>Date of Birth: {new Date(profileData.DOB).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
