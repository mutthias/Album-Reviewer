import Cors from 'cors';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

const cors = Cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
});

const LoginQuery = `
  query Query($userId: ID!) {
    user(id: $userId) {
      name
      password
    }
  }
`;

export default async function handler(req, res) {
  await cors(req, res); // Apply CORS middleware

  if (req.method === 'POST') {
    try {
      const fetchRes = await fetch(`http://localhost:9001/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: LoginQuery,
          variables: {
            userId: 'd99e2af2-11a1-4783-acf7-98d0542bb988',
          },
        }),
      });

      if (!fetchRes.ok) {
        throw new Error(`HTTP error! Status: ${fetchRes.status}`);
      }

      const reviews = await fetchRes.json();
      return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.error(new Error('Internal server error'), { status: 500 });
    }
  } else {
    return NextResponse.error(new Error('Method not allowed'), { status: 405 });
  }
}
