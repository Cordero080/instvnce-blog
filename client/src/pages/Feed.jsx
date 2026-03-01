import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import logoOne from '../assets/logo-one.svg';
import Braces3D from '../components/Braces3D/Braces3D';

export default function Feed({ isSyntaxOpen }) {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [isTyping, setIsTyping] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [formData.content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/posts/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/posts', formData);
      }
      setFormData({ title: '', content: '' });
      setEditingId(null);
      setIsTyping(false);
      fetchPosts();
    } catch (err) {
      console.error("Transmission error:", err);
    }
  };

  const startEdit = (e, post) => {
    e.stopPropagation();
    setEditingId(post._id);
    setFormData({ title: post.title, content: post.content });
    setIsTyping(true);
  };

  const deletePost = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Termination error:", err);
    }
  };

  return (
    <>
      <div className={`crt-overlay ${isTyping ? 'fade' : ''}`} />

      <div className="app-container">
        <div className="system-diagnostics">
          <span>STATUS: ONLINE</span>
          <span>INSTANCES_DEPLOYED: {posts.length}</span>
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

        <div className="title-divider" />

        <div className="input-frame">
          <Braces3D />
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              ref={textareaRef}
              style={{ filter: `hue-rotate(${formData.content.length * 1}deg)` }}
              placeholder="DATA..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <button type="submit">AIM</button>
          </form>
        </div>

        <div className="feed-separator">
          <span>// DEPLOYED INSTANCES</span>
        </div>

        {posts.length === 0 ? (
          <div className="feed-empty">
            <span>// NO INSTANCES DEPLOYED</span>
            <span className="feed-empty-sub">_ waiting for transmission...</span>
          </div>
        ) : posts.map(post => (
          <div
            key={post._id}
            className="instance-node"
            onClick={() => navigate(`/post/${post._id}`)}
          >
            <div className="node-meta">
              <span className="status-tag">ACTIVE_LOG</span>
              <button className="edit-btn" onClick={(e) => startEdit(e, post)}>[EDIT]</button>
              <button className="terminate-btn" onClick={(e) => deletePost(e, post._id)}>[TERMINATE]</button>
              <span className="timestamp">
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {new Date(post.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </span>
            </div>
            <h3>{post.title}</h3>
            <div className="markdown-body">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
