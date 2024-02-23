import React, { useState, useEffect } from 'react';
import './CreateReview.css';
import axios from 'axios';

const CreateReview = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [score, setScore] = useState(0);
  const [review, setReview] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [artist, setArtist] = useState('');

  useEffect(() => {
    let token = window.localStorage.getItem('token');
    if (token) {
      console.log('token found! through create review:', token);
      setToken(token);
    }
  }, []);

  const handleSearch = async (query) => {
    try {
      if (query.trim() !== '') {
        const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            query
          )}&type=album&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(response.data.albums.items);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching albums:', error);
    }
  };

  const handleClick = (album) => {
    // Extract album name and image URL
    const albumName = album.name;
    const imageUrl = album.images.length > 0 ? album.images[0].url : '';
    const artistName = album.artists[0].name;
    console.log(artistName);
    // Set the title for the review and image URL
    setTitle(albumName);
    setImageUrl(imageUrl);
    setArtist(artistName);

    // Clear search results
    setSearchResults([]);
  };

  const handleSubmit = async () => {
    const userId = window.localStorage.getItem('id');
    try {
      // Make sure imageUrl is not empty
      if (!imageUrl) {
        throw new Error('Image URL is required');
      }
  
      // Make an API call to create a review
      const fetchRes = await fetch(`http://localhost:9001/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: ReviewMutation,
          variables: {
            input: {
              title: title,
              score: score,
              content: review,
              userId: userId,
              image: imageUrl,
              artist: artist,
            },
          },
        }),
      });
  
      if (!fetchRes.ok) {
        throw new Error(`HTTP error! Status: ${fetchRes.status}`);
      }
  
      // Clear the form after successful submission
      setTitle('');
      setScore(0);
      setReview('');
      const responseData = await fetchRes.json();
      console.log(responseData); // Log the response data
      return fetchRes;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
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

const ReviewMutation = `
  mutation Mutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      content
      createdAt
      id
      image
      artist
      score
      title
      updatedAt
      user {
        name
      }
    }
  }
`;

export default CreateReview;
