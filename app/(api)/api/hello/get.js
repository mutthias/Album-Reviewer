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

export default async function handler(req, res) {
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

    if (!fetchRes.ok) {
      throw new Error(`HTTP error! Status: ${fetchRes.status}`);
    }

    const reviews = await fetchRes.json();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
