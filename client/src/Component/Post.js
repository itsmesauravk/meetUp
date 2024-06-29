import React, { useState, useEffect } from 'react';
import '../css/Post.css'; 
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const Post = ({ username, profilePic, postId, content, image, likes = [], visible }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  const userData = localStorage.getItem("user-data");
  const userId = JSON.parse(userData).id;

  useEffect(() => {
    // Check if the current user has liked the post
    if (likes.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, userId]);

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

  const handleLike = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/like-post/${postId}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      if (data.success) {
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnlike = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/unlike-posts/${postId}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      if (data.success) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = () => {
    console.log('Edit clicked');
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-post/${postId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        successNotifyD();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      errorNotifyD();
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
                <button id='dlt-btn' onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
        <div className="post-content">
          <img src={image} alt="Post" className="post-image" />
          <div className="post-interact">
            <div className="post-interact-icons">
              <span>({likeCount})</span>
              {liked ?
                <i className="fas fa-heart" style={{ color: "red" }} onClick={handleUnlike}></i>
                :
                <i className="far fa-heart" onClick={handleLike}></i>
              }
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
