import { useState } from 'react';
import './TopNav.scss';

function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`top-nav ${isOpen ? 'is-open' : ''}`}>

      {/* Logo — always visible */}
      <div className="top-nav-logo">
        <span className="bracket">[</span>
        INSTVNCE
        <span className="bracket">]</span>
      </div>

      {/* Links — slide into view on expand */}
      <div className="top-nav-links">
        <a href="#" className="top-nav-link top-nav-link--active">
          <span className="link-label">FEED</span>
          <span className="link-glow-line" />
        </a>
        <a href="#" className="top-nav-link">
          <span className="link-label">ARCHIVE</span>
          <span className="link-glow-line" />
        </a>
        <a href="#" className="top-nav-link">
          <span className="link-label">ABOUT</span>
          <span className="link-glow-line" />
        </a>
      </div>

      {/* Status pip — always visible, right side */}
      <div className="top-nav-status">
        <span className="status-pip" />
        <span className="status-label">ONLINE</span>
      </div>

      {/* Mobile hamburger */}
      <button
        className={`top-nav-hamburger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <span className="hline" />
        <span className="hline" />
        <span className="hline" />
      </button>

      {/* Bottom glow edge — pistola style */}
      <div className="top-nav-glow" />

    </nav>
  );
}

export default TopNav;
