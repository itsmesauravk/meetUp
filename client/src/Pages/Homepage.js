import React from 'react';
import '../css/Homepage.css';
import Navbar from '../Component/Navbar';
import Post from '../Component/Post'; // Import the Post component

const Homepage = () => {
  return (
    <div className='home-container'>
      <Navbar />
      <div className='home-posts'>

        <Post
          username="John Doe"
          profilePic="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSOQFlVPVM6PMD6_oQA7JY_EKGrAbjWr-MYuXg9NFILoP5H7c2J"
          timestamp="Just now"
          content="This is a sample post content for movie MAHAJATRA."
          image="https://i.ytimg.com/vi/IaJN-pV7cHg/maxresdefault.jpg"
        />

        <Post
                  username="John Doe"
                  profilePic="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSOQFlVPVM6PMD6_oQA7JY_EKGrAbjWr-MYuXg9NFILoP5H7c2J"
                  timestamp="Just now"
                  content="This is a sample post content for movie MAHAJATRA."
                  image="https://i.ytimg.com/vi/IaJN-pV7cHg/maxresdefault.jpg"
                />

                

      </div>
    </div>
  );
};

export default Homepage;
