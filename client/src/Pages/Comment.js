import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import Post from '../Component/Post'
import '../css/Comment.css'
import { useParams } from 'react-router-dom'
import {toast} from 'react-toastify'

const Comment = () => {
    const [userData, setUserData] = useState({})
    const postId = useParams().userId
    const [userComments, setUserComments] = useState([{}])

    const userDatas = localStorage.getItem('user-data')
    const userId = JSON.parse(userDatas).userId
    console.log(userId)

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

    const successToast = () => {
        toast.success('Comment added successfully', {
            position: "top-center",
            autoClose: 3000,
        })
    }

    const errorToast = () => {
        toast.error('Error adding comment', {
            position: "top-center",
            autoClose: 3000,
        })
    }

    const successDltToast = () => {
        toast.success('Comment added successfully', {
            position: "top-center",
            autoClose: 3000,
        })
    }

    const errorTDltoast = () => {
        toast.error('Error adding comment', {
            position: "top-center",
            autoClose: 3000,
        })
    }

    const showPostComments = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/get-comment-user-data`, {
                method: 'GET',
            })
            const data = await response.json()
            if(data.success){
                console.log('Comment data loaded')
                setUserComments(data.getCommentUser)
            }else{
                console.log('Error loading comment data')

            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        showPostComments()
    }, [postId])

    //for adding comment
    const addComment = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/add-comment/${userId}/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({comment})
            })
            const data = await response.json()
            if(data.success){
                console.log('Comment added')
                setComment('')
                successToast()
            }else{
                console.log('Error adding comment')
                errorToast()
            }
        } catch (error) {
            console.log(error)
            errorToast()
        }
    }

    //for deleting comment

    const deleteComment = async (commentId) => {
        console.log(commentId)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-users-comment/${commentId}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            if(data.success){
                console.log('Comment deleted')
                showPostComments()
                successDltToast()
            }else{
                console.log('Error deleting comment')
                errorTDltoast()
            }
        } catch (error) {
            console.log(error)
            errorTDltoast()
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
                image={userData?.image}
                visible={false}

             />

        </div>
        <div className='comment-container'>
            <div className='comment-box'>
                <div className='comment-input'>
                    <input type='text' placeholder='Add a comment...' onChange={(e)=>setComment(e.target.value)} />
                </div>
                <div className='comment-post'>
                    <button onClick={addComment}>Post</button>
                </div>
            </div>
            <div className='comments-list'>
                {userComments && userComments.map((comment, index) => (
                    <div className='comment' key={index}>
                        <div className='comment-profile'>
                            <img src='https://fifpro.org/media/fhmfhvkx/messi-world-cup.jpg?rxy=0.48356841796117644,0.31512414378031967&width=1600&height=1024&rnd=133210253587130000' alt='Profile' />
                            
                        </div>
                        <div className='comment-content'>
                            <p>{comment.user?.firstName} {comment.user?.lastName}</p>
                            <div className='comment-text'>
                                <p>{comment.comment}</p>
                                <div className='comment-action'>
                                    ({comment.likesCount}) <i className="far fa-heart"></i>
                                    <button >Edit</button>
                                    <button onClick={()=>deleteComment(comment._id)}>Delete</button>
                                </div>
                            </div>
                                
                        </div>
                    </div>
                ))}
                
            </div>

        </div>
        </div>
        }
    </div>
    </>
  )
}

export default Comment