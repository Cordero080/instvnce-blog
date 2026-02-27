import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import instanceLogo from './assets/instance.svg';
import logoOne from './assets/logo-one.svg';
import TopNav from './components/TopNav/TopNav';

function App() { 
  const [posts, setPosts] = useState([]); 
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [isTyping, setIsTyping] = useState(false);
  // FIX 1: Ensure the "d" is lowercase to match your code below
  const [editingId, setEditingId] = useState(null); 

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

  // FIX 2: Single, unified handleSubmit for both NEW and EDIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Logic for UPDATE
        await axios.put(`http://localhost:8000/api/posts/${editingId}`, formData);
      } else {
        // Logic for CREATE
        await axios.post('http://localhost:8000/api/posts', formData);
      }
      
      setFormData({ title: '', content: '' });
      setEditingId(null); // Exit edit mode
      setIsTyping(false); 
      fetchPosts(); 
    } catch (err) {
      console.error("Transmission error:", err);
    }
  };

  const startEdit = (post) => {
    setEditingId(post._id);
    setFormData({ title: post.title, content: post.content });
    setIsTyping(true);
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Termination error:", err)
    }
  };

  const instanceCount = posts.length;
  return (
    <>
      <TopNav />
      {/* The overlay now uses a dynamic class that checks the 'isTyping' state */}
      <div className={`crt-overlay ${isTyping ? 'fade' : ''}`} />

      <div className="app-container">
        <div className="system-diagnostics">
  <span>STATUS: ONLINE</span>
  <span>INSTANCES_DEPLOYED: {instanceCount}</span>
  <span>LOG_LEVEL: ARCHITECT</span>
</div>
        <div className="title-container">
          <img src={logoOne} alt="INSTVNCE logo" className="brand-logo" />
  <h1 className="architect-title">
    <span className="bracket">[</span>
    INST<span className="title-v">V</span>NCE<span className="title-underscore">_</span>BLOG
    <span className="bracket">]</span>
  </h1>
</div>
{/* NEW DIVIDER HERE */}
<div className="title-divider" />

        <div className="input-frame">
          <form
            className={`architect-input ${isTyping ? 'focused-mode' : ''}`}
            onSubmit={handleSubmit}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          >
            <input
              className={editingId ? 'heavy-load' : ''}
              style={{ filter: `hue-rotate(${formData.title.length * 4}deg)` }}
              placeholder="INSTANCE..."
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <textarea
              style={{ filter: `hue-rotate(${formData.content.length * 1}deg)` }}
              placeholder="DATA..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
            <button type="submit">AIM</button>
          </form>
        </div>

        <div className="feed-separator">
          <span>// DEPLOYED INSTANCES</span>
        </div>

        {posts.map(post => ( 
          <div key={post._id} className="instance-node">
            <div className="node-meta">
              <span className="status-tag">ACTIVE_LOG</span>
              <button className="edit-btn" onClick={() => startEdit(post)}>[EDIT]</button>
              {/* THE TERMINATE BUTTON */}
      <button 
        className="terminate-btn" 
        onClick={() => deletePost(post._id)}
      >
        [TERMINATE]
      </button>
              <span className="timestamp">{new Date(post.createdAt).toLocaleTimeString()}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      <footer className="architect-signature">
        INSTVNCE_BL0G // ARCHITECT: PVBLO // "The map is not the territory."
      </footer>
    </>
  );
}

export default App;