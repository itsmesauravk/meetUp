import React, { useState } from 'react';
import '../css/NewPost.css';
import Navbar from '../Component/Navbar';
import { toast } from "react-toastify";

const NewPost = () => {
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);

  const userData = localStorage.getItem("user-data");
  const id = JSON.parse(userData).userId;
  console.log(id)

  const successNotify = () => {
    toast.success("Post uploaded successfully.", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const errorNotify = () => {
    toast.error("Failed to upload post.", {
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/new-post/${id}`, {
        method: 'POST',
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
      <Navbar />
      <div className="new-post-container">
        <form className="new-post-form" onSubmit={handleSubmit}>
          <textarea
            className="new-post-caption"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Enter caption..."
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
          />
          {photo && <img src={URL.createObjectURL(photo)} alt="Selected" className="new-post-photo-preview" />}
          <button type="submit" className="new-post-submit">Post</button>
        </form>
      </div>
    </>
  );
};

export default NewPost;
