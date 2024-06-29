import React, { useEffect, useState } from 'react';
import '../css/User.css';
import Navbar from '../Component/Navbar';

const User = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  
  const userData = localStorage.getItem('user-data');
  const userId = JSON.parse(userData).userId;

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/all-users`);
      const data = await response.json();
      setUsers(data.allUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/friends/${userId}`);
      const data = await response.json();
      setFriends(data.friends);
    } catch (error) {
      console.error(error);
    }
  };

  const sendFriendRequest = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-friend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: userId,
          receiverId: id,
        }),
      });
      const data = await response.json();
      if (data.success) {
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchFriends();
  }, []);

  return (
    <>
      <Navbar />
      <div className="user-container">
        <h2>Your Friends</h2>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div className="user" key={friend._id}>
              <div className="user-left">
                <img src={friend.picture} alt="Profile" className="user-photo" />
                <p className="user-name">{friend.firstName} {friend.lastName}</p>
              </div>
              <div className="user-right">
                <button className="message-btn">Message</button>
              </div>
            </div>
          ))
        ) : (
          <p>No friends found</p>
        )}

        <h2 className="section-title">Add More Friends</h2>
        {users.map((user) => (
          <div className="user" key={user._id}>
            <div className="user-left">
              <img src={user.picture} alt="Profile" className="user-photo" />
              <p className="user-name">{user.firstName} {user.lastName}</p>
            </div>
            <div className="user-right">
              <button className="add-friend-btn" onClick={() => sendFriendRequest(user._id)}>
                {user?.friends?.some(friend => friend.userId === userId && friend.status === 'Requested') ? 'Requested' : 'Add Friend'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default User;
