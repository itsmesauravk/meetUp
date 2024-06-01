import React, { useEffect, useState } from 'react';
import '../css/Homepage.css';
import Navbar from '../Component/Navbar';
import Post from '../Component/Post'; 

const Homepage = () => {
    const [posts, setPosts] = useState([]);


    const getPosts = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-posts`);
          const data = await response.json();
          if(data.success){
            setPosts(data.showUserData)
          }
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    console.log(posts)

  return (
    <div className='home-container'>
      <Navbar />
      <div className='home-posts'>
        {posts && posts.map((post) => (
          <Post
            key={post._id}
            username={`${post.user?.firstName} ${post.user?.lastName}`}
            profilePic={post.user?.profilePic || "https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=yqoos7g9jmufJhfkbQsk-mdhKEsih6Di4WZ66t_ib7I="}
            userId={post.user?._id}
            content={post?.caption}
            image={`${process.env.REACT_APP_API_URL}/${post?.image}`}
            visible={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
