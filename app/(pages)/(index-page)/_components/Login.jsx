import { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard'
import './Login.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate username and password
    if (username && password) {
      // Perform login logic (e.g., validate credentials, obtain token)
      // For simplicity, let's assume login is successful and set loggedin to true
      onLogin();
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className='login-container'>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default function Login() {
  const [loggedin, setLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const fetchRes = await fetchReviewsFromServer();
      if (!fetchRes.ok) {
        throw new Error(`HTTP error! Status: ${fetchRes.status}`);
      }
      const reviewsData = await fetchRes.json();
      console.log('Reviews:', reviewsData);
      if (reviewsData && reviewsData.data && reviewsData.data.reviews) {
        setReviews(reviewsData.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    console.log('Updated reviews:', reviews);
  }, [reviews]);

  const fetchReviewsFromServer = async () => {
    try {
      const fetchRes = await fetch(`http://localhost:9001/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: ReviewQuery,
          variables: {
            ids: 'd99e2af2-11a1-4783-acf7-98d0542bb988',
          },
        }),
      });
      return fetchRes;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
    fetchReviews();
  };

  const handleLogout = () => {
    setLoggedIn(false);
    window.localStorage.removeItem('token');
  };

  return (
    <main>
      {loggedin ? (
        <div>
          <p>Logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <div>
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                title={review.title}
                content={review.content}
                score={review.score}
                createdAt={review.createdAt}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="Login">
          <h1>Login to create and view your reviews!</h1>
          <LoginForm
            onLogin={() => {
              handleLogin();
            }}
          />
        </div>
      )}
    </main>
  );
}

const ReviewQuery = `
  query Query($ids: ID!) {
    reviews(ids: $ids) {
      content
      createdAt
      score
      id
      title
      updatedAt
      user {
        name
      }
    }
  }
`;
