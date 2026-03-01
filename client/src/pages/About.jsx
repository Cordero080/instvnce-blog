import './About.scss';
import logoOne from '../assets/logo-one.svg';

export default function About() {
  return (
    <>
      <div className="crt-overlay" />
      <div className="app-container about-container">

        <div className="title-container">
          <img src={logoOne} alt="INSTVNCE logo" className="brand-logo" />
          <h1 className="architect-title">
            <span className="bracket">[</span>
            AB<span className="title-v">O</span>UT
            <span className="bracket">]</span>
          </h1>
        </div>

        <div className="title-divider" />

        <div className="about-card">
          <div className="about-grid">

            <div className="about-section">
              <span className="about-label">// WHAT IS INSTVNCE?</span>
              <p className="about-body">
                Every post here is an instance — a deployed unit of thought. Not a draft,
                not a content piece optimized for reach. Something you named, loaded with data,
                and fired into existence. The interface reflects that: you <em>AIM</em> to publish,
                you <em>TERMINATE</em> to delete. Language shapes how you think about what you're doing.
              </p>
            </div>

            <div className="about-section">
              <span className="about-label">// THE PHILOSOPHY</span>
              <p className="about-body">
                The medium should feel like the work. A developer's log shouldn't look like a lifestyle
                blog. The CRT scanlines, the monospace, the holographic cards — these aren't decoration.
                They reflect how this kind of thinking actually feels: structured, deliberate, running
                on something real underneath.
              </p>
              <p className="about-body">
                Most dev blogs look like Medium. This one looks like a monitoring dashboard.
                That difference is intentional.
              </p>
            </div>

            <div className="about-section">
              <span className="about-label">// WRITE WITH STRUCTURE</span>
              <p className="about-body">
                INSTVNCE supports full Markdown — headings, bullet lists, blockquotes, inline code,
                and syntax-highlighted code blocks. The <code className="about-inline-code">[?]</code> in
                the nav gives you the full reference. Structured writing is clearer thinking. The tool
                nudges you toward it without forcing it.
              </p>
            </div>

            <div className="about-section">
              <span className="about-label">// FULL CONTROL</span>
              <p className="about-body">
                Self-hosted. No algorithm. No platform risk. No recommendation engine deciding
                which instance surfaces and which gets buried. You own every entry. The map is
                not the territory — but at least this map is yours.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
