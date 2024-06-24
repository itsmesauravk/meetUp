import React from 'react';
import '../css/User.css';
import Navbar from '../Component/Navbar';

const User = () => {
  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      image: 'https://via.placeholder.com/150',
      friend: true,
    },
    {
      id: 2,
      name: 'Bob Brown',
      image: 'https://via.placeholder.com/150',
      friend: true,
    },
    {
      id: 3,
      name: 'Charlie Davis',
      image: 'https://via.placeholder.com/150',
      friend: false,
    },
    {
      id: 4,
      name: 'Diana Evans',
      image: 'https://via.placeholder.com/150',
      friend: false,
    },
    {
      id: 5,
      name: 'Edward Franklin',
      image: 'https://via.placeholder.com/150',
      friend: false,
    },
    {
      id: 6,
      name: 'Fiona Green',
      image: 'https://via.placeholder.com/150',
      friend: true,
    },
  ];

  const friends = users.filter(user => user.friend);
  const nonFriends = users.filter(user => !user.friend);

  return (
    <>
      <Navbar />
      <div className="user-container">
        <h2>Your Friends</h2>
        {friends.map((user) => (
          <div className="user" key={user.id}>
            <div className="user-left">
              <img src={user.image} alt="Profile" className="user-photo" />
              <p className="user-name">{user.name}</p>
            </div>
            <div className="user-right">
              <button className="message-btn">Message</button>
            </div>
          </div>
        ))}

        <h2 className="section-title">Add More Friends</h2>
        {nonFriends.map((user) => (
          <div className="user" key={user.id}>
            <div className="user-left">
              <img src={user.image} alt="Profile" className="user-photo" />
              <p className="user-name">{user.name}</p>
            </div>
            <div className="user-right">
              <button className="add-friend-btn">Add Friend</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default User;
