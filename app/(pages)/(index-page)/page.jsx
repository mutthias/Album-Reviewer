'use client';

import Hero from './_components/Hero/Hero';
import Login from './_components/Login';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [loggedin, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');

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

  const client_id = '630ad8f7543b4b4990ef2056f872020b';
  const client_secret = '1d45d3faf2c845329f213118230a8090';

  const getToken = async () => {
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const basicAuth = btoa(`${client_id}:${client_secret}`);
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: requestBody,
    };

    try {
      const response = await axios.post(tokenEndpoint, requestBody, {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const handleClick = async () => {
    const token = await getToken();
    console.log('heres the token:', token);
    // Do something with the token
  };

  return (
    <main>
      <Hero />
      <Login />
    </main>
  );
}
