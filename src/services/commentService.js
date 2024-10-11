const API_URL = 'https://jsonplaceholder.typicode.com/comments';

export const fetchComments = async () => {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error('Failed to get comments');
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
};