const URL = 'https://jsonplaceholder.typicode.com/posts?_limit=6';

export async function fetchNews() {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error('status ' + response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('failed to load', error.message);
    throw error;
  }
}