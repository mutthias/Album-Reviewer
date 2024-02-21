import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ title, content, score, createdAt }) => {
  return (
    <div className="review-card">
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Score: {score}</p>
      <p>Created At: {createdAt}</p>
    </div>
  );
};

export default ReviewCard;
