import React, { useState } from 'react';
import '../css/NewPost.css';

import { toast } from "react-toastify";
import { Link, useParams } from 'react-router-dom';

const EditPost = () => {
    const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);

  const postId = useParams().postId

  const successNotify = () => {
    toast.success("Post edited successfully.", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const errorNotify = () => {
    toast.error("Failed to edit post.", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('photo', photo); 

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/edit-post/${postId}`, {
        method: 'PATCH',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        console.log(data);
        setCaption('');
        setPhoto(null);
        successNotify();
      } else {
        console.log(data.message);
        errorNotify();
      }
    } catch (error) {
      console.log('Error while uploading post:', error);
      errorNotify();
    }
  };
  return (
    <>
        <div className="new-post-container">
        <form className="new-post-form" onSubmit={handleSubmit}>
            <Link to="/" className="back-link">Back</Link>
            <h1 className="new-post-heading">Edit Post</h1>
          <textarea
            className="new-post-caption"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Enter caption..."
            required
          />
          <label htmlFor="photo-input" className="new-post-photo-label">
            Upload Photo
          </label>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            className="new-post-photo-input"
            onChange={handlePhotoChange}
            required
          />
          {photo && <img src={URL.createObjectURL(photo)} alt="Selected" className="new-post-photo-preview" />}
          <button type="submit" className="new-post-submit">Post</button>
        </form>
      </div>
    </>
  )
}

export default EditPost