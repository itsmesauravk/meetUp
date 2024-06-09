import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import Post from '../Component/Post'
import '../css/Comment.css'
import { useParams } from 'react-router-dom'

const Comment = () => {
    const [userData, setUserData] = useState({})
    const postId = useParams().userId

    const [comment, setComment] = useState('')
    // console.log(postId)

    // const userDatas = localStorage.getItem('user-data')
    // const uId = JSON.parse(userDatas).userId

    const getUserData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/get-specific-post/${postId}`, {
                method: 'GET',
            })
            const data = await response.json()
            if(data.success){   
                setUserData(data.showPostDetail)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(userData)

    //for adding comment
    const addComment = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/add-comment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({comment})
            })
            const data = await response.json()
            if(data.success){
                console.log('Comment added')
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                username={`${userData.user?.firstName} ${userData.user?.lastName}`}
                profilePic="https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=yqoos7g9jmufJhfkbQsk-mdhKEsih6Di4WZ66t_ib7I="
                content={userData.caption}
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