import React, { useState } from 'react';
import './ReviewCard.css';
import Image from 'next/image';

const ReviewCard = ({ title, content, score, image, artist, id }) => {
  const [showPopup, setShowPopup] = useState(false);

  let normal_content = content;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleDelete = async () => {
    event.stopPropagation();
    try {
      const fetchRes = await fetch(`http://localhost:9001/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: DeleteReview, // Updated to use DeleteReview mutation
          variables: {
            deleteReviewId: id, // Pass the review ID
          },
        }),
      });
  
      if (!fetchRes.ok) {
        throw new Error(`HTTP error! Status: ${fetchRes.status}`);
      }
  
      // Assuming the review was deleted successfully, reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  

  return (
    <div className={`review-card ${showPopup ? 'active-popup' : ''}`} onClick={togglePopup}>
      <div className="review-details">
        <h1>{title}</h1>
        <h2 className="artist">{artist}</h2>
        <p>{content.length > 20 ? `${content.slice(0, 35)}...` : content}</p>
        <p>Score: {score}</p>
        <button className="remove-button" onClick={handleDelete}>Remove</button>
      </div>
      <div className="review-image">
        <Image fill src={image} alt="nada" />
      </div>
      {showPopup && (
        <div className="popup">
          <h2>{title}</h2>
          <p className="artist">{artist}</p>
          <div className="popup-image">
            <Image fill src={image} alt="nada" />
          </div>
          <p className="full-content">{content}</p>
        </div>
      )}
      {showPopup && <div className="dim-background" onClick={togglePopup}></div>}
    </div>
  );
};

export default ReviewCard;

const DeleteReview = `
  mutation Mutation($deleteReviewId: String!) {
    deleteReview(id: $deleteReviewId)
  }
`;
