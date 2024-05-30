import React, { useState } from 'react';
import '../css/NewPost.css';
import Navbar from '../Component/Navbar';

const NewPost = () => {
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log({ caption, photo });
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
        {photo && <img src={photo} alt="Selected" className="new-post-photo-preview" />}
        <button type="submit" className="new-post-submit">Post</button>
      </form>
    </div>
    </>
  );
};

export default NewPost;
