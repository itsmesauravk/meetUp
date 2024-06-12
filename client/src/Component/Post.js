import React, { useState } from 'react';
import '../css/Post.css'; 
import { Link } from 'react-router-dom';

import { toast } from "react-toastify";


const Post = ({ username, profilePic, postId, content, image, visible }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const successNotifyD = () => {
      toast.success("Post Deleted Successfully.", {
          position: "top-right",
          autoClose: 2000,
        });
  }

  const errorNotifyD = () => {
      toast.error("Failed Post Delete.", {
          position: "top-right",
          autoClose: 2000,
        });
  }

  const handleEdit = () => {
    // Add your edit logic here
    console.log('Edit clicked');
  };

  const handleDelete = async(postId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-post/${postId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if(data.success){
        // console.log('Post deleted');
        successNotifyD()
        window.location.reload()
      }

    } catch (error) {
      console.log(error);
      errorNotifyD()
    }
  };

  return (
    <div className="post">
      <div className="post-first-part">
        <div className="post-first-header">
          <div className="post-profile">
            <img src={profilePic} alt="Profile" className="profile-photo" />
            <p>{username}</p>
          </div>
          <div className='post-more'>
            <i className="fas fa-ellipsis-h" onClick={toggleDropdown}></i>
            {dropdownVisible && (
              <div className="dropdown">
                <Link to={`/edit-post/${postId}`} >
                <button id='edit-btn'>Edit</button>
                </Link>
                <button id='dlt-btn' onClick={()=>handleDelete(postId)}>Delete</button>
              </div>
            )}
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
          {visible && <Link to={`/comment/${postId}`} className='comment-link'>View all comments</Link>}
        </div>
      </div>
    </div>
  );
};

export default Post;
