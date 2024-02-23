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
    <form className="create-review-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Album Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => handleSearch(title)}
        placeholder="Search for an album..."
        required
      />

      {/* Display search results */}
      <ul className="search-results">
        {searchResults.map((album) => (
          <li className="search-result" key={album.id} onClick={() => handleClick(album)}>
            <img className="album-image" src={album.images[0].url} alt={album.name} />
            <div className="album-info">
              <span className="album-name">{album.name}</span>
            </div>
          </li>
        ))}
      </ul>

      <label htmlFor="score">Score (0-100):</label>
      <input
        type="number"
        id="score"
        value={score}
        onChange={(e) => setScore(parseInt(e.target.value))}
        min="0"
        max="100"
        required
      />

      <label htmlFor="review">Review:</label>
      <textarea
        id="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      ></textarea>

      <button type="submit">Submit Review</button>
    </form>
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
