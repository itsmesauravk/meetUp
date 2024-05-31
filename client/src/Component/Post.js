import React from 'react';
import '../css/Post.css'; 
import { Link } from 'react-router-dom';

const Post = ({ username, profilePic, content, image }) => {
  return (
    <div className="post">
      <div className="post-first-part">
        <div className="post-first-header">
          <div className="post-profile">
            <img src={profilePic} alt="Profile" className="profile-photo" />
            <p>{username}</p>
          </div>
          <div className='post-more'>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
        <div className="post-content">
          <img src={image} alt="Post" className="post-image" />
          <div className="post-interact">
            <div className="post-interact-icons">
              <i className="far fa-heart"></i>
              <i className="far fa-comment"></i>
              <i className="far fa-paper-plane"></i>
            </div>
            <div className="post-interact-save">
              <i className="far fa-bookmark"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="post-second-part">
        <div className='caption'>
          <p>{content}</p>
        </div>
        <div className='comments'>
          <Link to={'#'}>View all comments</Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
