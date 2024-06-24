import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import Post from '../Component/Post';
import '../css/Comment.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Comment = () => {
  const [userData, setUserData] = useState({});
  const postId = useParams().userId; 
  const [userComments, setUserComments] = useState([]);


  const userDatas = localStorage.getItem('user-data');
  const userId = JSON.parse(userDatas).userId;

  const [comment, setComment] = useState('');

  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    getUserData();
    showPostComments();
  }, [postId]);

  const getUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-specific-post/${postId}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setUserData(data.showPostDetail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const successToast = () => {
    toast.success('Comment added successfully', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const errorToast = () => {
    toast.error('Error adding comment', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const successDltToast = () => {
    toast.success('Comment deleted successfully', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const errorDltToast = () => {
    toast.error('Error deleting comment', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const showPostComments = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-comment-user-data/${postId}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setUserComments(data.comments);
      } else {
        console.log('Error loading comment data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-comment/${userId}/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });
      const data = await response.json();
      if (data.success) {
        setComment('');
        successToast();
        showPostComments();
      } else {
        errorToast();
      }
    } catch (error) {
      errorToast();
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-users-comment/${commentId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        successDltToast();
        showPostComments();
      } else {
        errorDltToast();
      }
    } catch (error) {
      errorDltToast();
      console.log(error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/like-comment/${commentId}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setLikeCount(likeCount + 1);
        showPostComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (commentId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/unlike-comment/${commentId}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setLikeCount(likeCount - 1);
        showPostComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        {userData && (
          <div>
            <div className='post-container'>
              <Post
                key={userData._id}
                postId={userData._id}
                username={`${userData.user?.firstName} ${userData.user?.lastName}`}
                profilePic="https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=yqoos7g9jmufJhfkbQsk-mdhKEsih6Di4WZ66t_ib7I="
                content={userData?.caption}
                image={userData?.image}
                likes={userData?.likes || []}
                userId={userData.user?._id}
                visible={false}
              />
            </div>
            <div className='comment-container'>
              <div className='comment-box'>
                <div className='comment-input'>
                  <input
                    type='text'
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className='comment-post'>
                  <button onClick={addComment}>Post</button>
                </div>
              </div>
              <div className='comments-list'>
                {userComments.length > 0 &&
                  userComments.map((comment, index) => (
                    <div className='comment' key={index}>
                      <div className='comment-profile'>
                        <img
                          src='https://fifpro.org/media/fhmfhvkx/messi-world-cup.jpg?rxy=0.48356841796117644,0.31512414378031967&width=1600&height=1024&rnd=133210253587130000'
                          alt='Profile'
                        />
                      </div>
                      <div className='comment-content'>
                        <p>{comment.user?.firstName} {comment.user?.lastName}</p>
                        <div className='comment-text'>
                          <p>{comment?.comment}</p>
                          <div className='comment-action'>
                            ({comment?.commentLike?.length}) 
                            {comment.commentLike.includes(userId) ? (
                              <i
                                className="fas fa-heart"
                                style={{ color: 'red' }}
                                onClick={() => handleUnlike(comment._id)}
                              ></i>
                            ) : (
                              <i
                                className="far fa-heart"
                                onClick={() => handleLike(comment._id)}
                              ></i>
                            )}
                            <button>Edit</button>
                            <button onClick={() => deleteComment(comment._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
