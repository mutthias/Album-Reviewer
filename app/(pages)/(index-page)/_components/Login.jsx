import { useState } from 'react';
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

  const handleLogin = () => {
    setLoggedIn(true);
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
        </div>
      ) : (
        <div className='Login'>
          <h1>Login to create and view your reviews!</h1>
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </main>
  );
}
