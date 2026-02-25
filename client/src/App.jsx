import { useEffect, useState } from 'react'; // Import React hooks
import axios from 'axios';  // Import axios to talk to the backend
import './App.scss'; // Ensure this matches the filename

function App() { 
  const [posts, setPosts] = useState([]); 
  const [formData, setFormData] = useState({ title: '', content: '' });
  // This state tracks if the user is currently typing
  const [isTyping, setIsTyping] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/posts', formData);
      setFormData({ title: '', content: '' });
      setIsTyping(false); // Reset typing state after submission
      fetchPosts(); 
    } catch (err) {
      console.error("Error posting data:", err);
    }
  };
const instanceCount = posts.length;
  return (
    <>
      {/* The overlay now uses a dynamic class that checks the 'isTyping' state */}
      <div className={`crt-overlay ${isTyping ? 'fade' : ''}`} /> 

      <div className="app-container">
        <div className="system-diagnostics">
  <span>STATUS: ONLINE</span>
  <span>INSTANCES_DEPLOYED: {instanceCount}</span>
  <span>LOG_LEVEL: ARCHITECT</span>
</div>
        <h1>INSTVNCE_BLOG</h1>

        <form 
          className={`architect-input ${isTyping ? 'focused-mode' : ''}`}
          onSubmit={handleSubmit}
          // When the form is clicked, scanlines will fade
          onFocus={() => setIsTyping(true)} 
          // When the user clicks away, scanlines return
          onBlur={() => setIsTyping(false)} 
        >
          <input 
          style={{ filter: `hue-rotate(${formData.title.length * 4}deg)` }}
            placeholder="INSTANCE_TITLE" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <textarea 
            style={{ filter: `hue-rotate(${formData.content.length * 1}deg)` }}
            placeholder="DATA_INPUT..." 
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
          />
          <button type="submit">AIM</button>
        </form>

        {posts.map(post => ( 
          <div key={post._id} className="instance-node">
            <div className="node-meta">
              <span className="status-tag">ACTIVE_LOG</span>
              <span className="timestamp">{new Date(post.createdAt).toLocaleTimeString()}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      <footer className="architect-signature">
        INSTVNCE_BLOG // ARCHITECT: PVBLO // "The map is not the territory."
      </footer>
    </>
  );
}

export default App;