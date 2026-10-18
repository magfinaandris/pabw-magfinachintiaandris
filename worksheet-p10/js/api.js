const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=6';
async function load() {
  const response = await fetch(API_URL);
  console.log('status', response.status, 'ok', response.ok);
  if (!response.ok) {
    throw new Error('status ' + response.status);
  }
  return response.json();
}
