import { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopNav.scss';

function TopNav({ onOpenSyntax, isDark, onToggleDark }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`top-nav ${isOpen ? 'is-open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >

      {/* Logo — always visible */}
      <div className="top-nav-logo">
        <span className="bracket">[</span>
        INSTVNCE
        <span className="bracket">]</span>
      </div>

      {/* Links — slide into view on expand */}
      <div className="top-nav-links">
        <Link to="/" className="top-nav-link top-nav-link--active">
          <span className="link-label">FEED</span>
          <span className="link-glow-line" />
        </Link>
        <a href="#" className="top-nav-link">
          <span className="link-label">ARCHIVE</span>
          <span className="link-glow-line" />
        </a>
        <Link to="/about" className="top-nav-link">
          <span className="link-label">ABOUT</span>
          <span className="link-glow-line" />
        </Link>
        <button className="top-nav-link top-nav-link--syntax" onClick={onOpenSyntax}>
          <span className="link-label">[?]</span>
          <span className="link-glow-line" />
        </button>
      </div>

      {/* Status pip + depth toggle — always visible, right side */}
      <div className="top-nav-status">
        <button
          className={`depth-switch ${isDark ? 'active' : ''}`}
          onClick={onToggleDark}
          aria-label="Toggle abyss mode"
          title={isDark ? 'ABYSS ON' : 'ABYSS OFF'}
        >
          <span className="depth-switch__track">
            <span className="depth-switch__thumb" />
          </span>
        </button>
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
