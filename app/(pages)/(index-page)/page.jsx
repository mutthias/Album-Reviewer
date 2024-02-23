'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './_components/Hero/Hero';
import Login from './_components/Login';

export default function Home() {
  const [loggedin, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let token = window.localStorage.getItem('token');
    if (token) {
      console.log('token found!');
      setToken(token);
      setLoggedIn(true);
    } else {
      console.log('no token yet!');
    }
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  return (
    <main>
      <Hero />
      <Login />
    </main>
  );
}
