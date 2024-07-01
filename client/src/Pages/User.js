import React, { useEffect, useState } from 'react';
import '../css/User.css';
import Navbar from '../Component/Navbar';

const User = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  
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

  // get recived request
  const getFriendRequest = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-request/${userId}`);
      const data = await response.json();
      if(data.success){
        setRequests(data.getRequest);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //get profile friends
  const fetchFriends = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user-data/${userId}`);
      const data = await response.json();
      if(data.success){
        setMyFriends(data.showDetail.friends);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const acceptedFriends = myFriends.filter(friend => friend.status === "Accepted");


  useEffect(() => {
    fetchUsers();
    getFriendRequest();
    fetchFriends();
  }, []);

  return (
    <>
      <Navbar />
      <div className="user-container">
      <h2>Friends</h2>
        {acceptedFriends.length > 0 ? (
            acceptedFriends.map((friend) => (
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


        <h2>Requests</h2>
        {requests.length > 0 ? (
          requests.map((friend) => (
            <div className="user" key={friend._id}>
              {friend.sender._id === userId ? (
                <>
                  <div className="user-left">
                    <img src={friend.user.picture} alt="Profile" className="user-photo" />
                    <p className="user-name">{friend.user.firstName} {friend.user.lastName}</p>
                    
                  </div>
                  <div className="user-right"> 
                    <p>Requested</p>
                    <button className="cancel-btn">Cancel</button>
                  </div>
                </>
                ) : (
                  <>
                  <div className="user-left">
                    <img src={friend.sender.picture} alt="Profile" className="user-photo" />
                    <p className="user-name">{friend.sender.firstName} {friend.sender.lastName}</p>
                  </div>
                  <div className="user-right"> 
                    <button className="accept-btn">Accept</button>
                    <button className="reject-btn">Reject</button>
                  </div>
                  </>
                )}
            </div>
          ))
        ) : (
          <p>No friend request found !!</p>
        )}

        <h2 className="section-title">Add More Friends</h2>
         {users && users.filter(user =>
          !user.friends.some(friend => friend.userId === userId && friend.status === "Requested")
          ).map((user) => (
            <div className="user" key={user._id}>
              <div className="user-left">
                <img src={user.picture} alt="Profile" className="user-photo" />
                <p className="user-name">{user.firstName} {user.lastName}</p>
              </div>
              <div className="user-right">
                <button className="add-friend-btn" onClick={() => sendFriendRequest(user._id)}>
                  Add Friend
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default User;
