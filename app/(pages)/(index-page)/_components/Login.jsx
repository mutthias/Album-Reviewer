import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';
import CreateReview from './CreateReview';
import './Login.css';

function LoginForm({ onLogin, loginError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      onLogin(username, password);
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loginError && <p className="error-message">{loginError}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default function Login() {
  const [loggedin, setLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [token, setToken] = useState('');
  const [loginError, setLoginError] = useState('');
  const [id, setID] = useState('');
  const [showCreateReview, setShowCreateReview] = useState(false); // State to control CreateReview visibility

  const client_id = '630ad8f7543b4b4990ef2056f872020b';
  const client_secret = '1d45d3faf2c845329f213118230a8090';

  const getToken = async () => {
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const basicAuth = btoa(`${client_id}:${client_secret}`);
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');
    try {
      const response = await axios.post(tokenEndpoint, requestBody, {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const accessToken = response.data.access_token;
      window.localStorage.setItem('token', accessToken);
      setToken(accessToken, () => {
        console.log(accessToken);
      });
      return accessToken;
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const fetchReviews = async (id) => {
    try {
      const fetchRes = await fetchReviewsFromServer(id);
      if (!fetchRes.ok) {
        throw new Error(`HTTP error! Status: ${fetchRes.status}`);
      }
      const reviewsData = await fetchRes.json();
      if (reviewsData && reviewsData.data && reviewsData.data.user.reviews) {
        setReviews(reviewsData.data.user.reviews);
        console.log('hi', reviewsData);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    let login = window.localStorage.getItem('loggedIn');
    let userID = window.localStorage.getItem('id');
    if (login && userID) {
      console.log('Logged in!');
      setLoggedIn(true);
      fetchReviews(userID);
    } else {
      console.log('need to login!');
    }
  }, []);

  const fetchReviewsFromServer = async (id) => {
    try {
      const fetchRes = await fetch(`http://localhost:9001/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: ReviewQuery,
          variables: {
            userId: `${id}`,
          },
        }),
      });
      return fetchRes;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const fetchRes = await fetch(`http://localhost:9001/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: LoginQuery,
          variables: {
            name: `${username}`,
          },
        }),
      });

      if (!fetchRes.ok) {
        throw new Error(`HTTP error! Status: ${fetchRes.status}`);
      }

      console.log(password);
      const data = await fetchRes.json(); // Parse response data

      if (!data.data.userByName) {
        setLoginError('No user found!');
        return;
      }

      if (data.data.userByName.password !== password) {
        setLoginError('Incorrect password!');
        return;
      }

      setLoginError('');
      setLoggedIn(true);
      window.localStorage.setItem('loggedIn', true);
      const userID = data.data.userByName.id;
      window.localStorage.setItem('id', userID);
      setID(userID);
      fetchReviews(userID);
      console.log(userID); // Use the variable instead of state
      return data; // Return fetched data
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setReviews([]);
    setID('');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loggedIn');
    window.localStorage.removeItem('id');
  };

  return (
    <main>
      {loggedin ? (
        <div className="reviews-wrapper">
          {reviews.length === 0 && (
            <h1 className="no-reviews-message">
              Start by creating your first review!
            </h1>
          )}
          <div className="button-container">
            <button
              className="create-review-button"
              onClick={() => setShowCreateReview(!showCreateReview)}
            >
              Create Review
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          {showCreateReview && <CreateReview />}
          <div className="reviews">
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                title={review.title}
                content={review.content}
                score={review.score}
                createdAt={review.createdAt}
                image={review.image}
                artist={review.artist}
                id={review.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="Login">
          <h1>Login to create and view your reviews!</h1>
          <LoginForm
            onLogin={(username, password) => {
              handleLogin(username, password);
              getToken();
            }}
            loginError={loginError}
          />
        </div>
      )}
    </main>
  );
}

const ReviewQuery = `
  query Query($userId: ID!) {
    user(id: $userId) {
      reviews {
        content
        id
        createdAt
        score
        title
        updatedAt
        image
        artist
      }
    }
}
`;

const LoginQuery = `
  query Query($name: String!) {
    userByName(name: $name) {
      id
      name
      password
    }
  }
`;

