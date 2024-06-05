import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import Post from '../Component/Post'
import '../css/Comment.css'

const Comment = () => {
    const [userData, setUserData] = useState({})

    const userDatas = localStorage.getItem('user-data')
    const uId = JSON.parse(userDatas).userId

    const getUserData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/get-specific-post/${uId}`, {
                method: 'GET',
            })
            const data = await response.json()
            if(data.success){   
                setUserData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(userData)

    useEffect(() => {
        getUserData()
    }, [])

  return (
    <>
    <Navbar />
    <div>
        {userData && 
        <div>
            <div className='post-container'>
            <Post
                // username={userData.}
                profilePic='https://fifpro.org/media/fhmfhvkx/messi-world-cup.jpg?rxy=0.48356841796117644,0.31512414378031967&width=1600&height=1024&rnd=133210253587130000'
                content='This is a post content'
                image='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRQCofu0UtuyxSzTgozeorI-HO_EKt2LXJYUBIPr4dvj9oEMOR'
                visible={false}

             />

        </div>
        <div className='comment-container'>
            <div className='comment-box'>
                <div className='comment-input'>
                    <input type='text' placeholder='Add a comment...' />
                </div>
                <div className='comment-post'>
                    <button>Post</button>
                </div>
            </div>
            <div className='comments-list'>
                <div className='comment'>
                    <div className='comment-profile'>
                        <img src='https://fifpro.org/media/fhmfhvkx/messi-world-cup.jpg?rxy=0.48356841796117644,0.31512414378031967&width=1600&height=1024&rnd=133210253587130000' alt='Profile' />
                        
                    </div>
                    <div className='comment-content'>
                        <p>John Doe</p>
                        <div className='comment-text'>
                            <p>This is a comment</p>
                            <div className='comment-action'>
                                (4) <i className="far fa-heart"></i>
                                <button >Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                            
                    </div>
                </div>

            </div>

        </div>
        </div>
        }
    </div>
    </>
  )
}

export default Comment