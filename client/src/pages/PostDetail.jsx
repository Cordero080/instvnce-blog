import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import './PostDetail.scss';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to load instance:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <>
      <div className="crt-overlay" />
      <div className="app-container post-detail-container">

        <button className="post-detail-back" onClick={() => navigate('/')}>
          ← FEED
        </button>

        {loading && (
          <div className="feed-empty">
            <span>// LOADING INSTANCE...</span>
          </div>
        )}

        {!loading && !post && (
          <div className="feed-empty">
            <span>// INSTANCE NOT FOUND</span>
            <span className="feed-empty-sub">_ transmission lost</span>
          </div>
        )}

        {!loading && post && (
          <article className="post-detail-node">
            <div className="post-detail-meta">
              <span className="status-tag">ACTIVE_LOG</span>
              <span className="timestamp">
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {new Date(post.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </span>
            </div>

            <h2 className="post-detail-title">{post.title}</h2>

            <div className="markdown-body post-detail-body">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        )}
      </div>
    </>
  );
}
