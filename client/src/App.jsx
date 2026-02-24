import { useEffect, useState } from 'react'; // Import React hooks
import axios from 'axios';  // Import axios to talk to the backend

function App() { // Define main component
  const [posts, setPosts] = useState([]); // Create state to store blog posts

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://localhost:8000/api/posts'); // Call your express server
      setPosts(res.data); // Save the data into our state
    }; // End async function
    fetchPosts(); // Execute the function
  }, []); // Empty array means "only run ONCE"

return ( // What displays on screen
<div>
  <h1>My Blog</h1>
  {posts.map(post => ( // Loop through every post in the state
  <div key={post._id}>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
  </div>

  ))}
</div>

);

}
export default App; // Export for use in main.jsx

