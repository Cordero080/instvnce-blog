import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'highlight.js/styles/github-dark.css';
import './App.scss';
import TopNav from './components/TopNav/TopNav';
import SyntaxModal from './components/SyntaxModal/SyntaxModal';
import Feed from './pages/Feed';
import PostDetail from './pages/PostDetail';
import About from './pages/About';

function App() {
  const [isSyntaxOpen, setIsSyntaxOpen] = useState(false);

  return (
    <>
      <TopNav onOpenSyntax={() => setIsSyntaxOpen(true)} />
      <SyntaxModal isOpen={isSyntaxOpen} onClose={() => setIsSyntaxOpen(false)} />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer className="architect-signature">
        INSTVNCE_BL0G // ARCHITECT: PVBLO // "The map is not the territory."
      </footer>
    </>
  );
}

export default App;
