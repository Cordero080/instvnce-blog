import './SyntaxModal.scss';

const SYNTAX_ROWS = [
  { input: '# Heading 1',        desc: 'Large heading'         },
  { input: '## Heading 2',       desc: 'Sub-heading'           },
  { input: '**bold**',           desc: 'Bold text'             },
  { input: '*italic*',           desc: 'Italic text'           },
  { input: '`inline code`',      desc: 'Inline code'           },
  { input: '```js\\n...\\n```',  desc: 'Syntax-highlighted block' },
  { input: '- item',             desc: 'Bullet list'           },
  { input: '1. item',            desc: 'Numbered list'         },
  { input: '> quote',            desc: 'Blockquote'            },
  { input: '---',                desc: 'Horizontal divider'    },
  { input: '[text](url)',        desc: 'Hyperlink'             },
  { input: '~~strikethrough~~',  desc: 'Strikethrough'         },
];

export default function SyntaxModal({ isOpen, onClose }) {
  return (
    <div className={`syntax-backdrop ${isOpen ? 'is-open' : ''}`} onClick={onClose}>
      <div
        className={`syntax-modal ${isOpen ? 'is-open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="syntax-modal-header">
          <span className="syntax-modal-title">// MARKDOWN SYNTAX</span>
          <button className="syntax-modal-close" onClick={onClose}>[×]</button>
        </div>

        <div className="syntax-modal-grid">
          {SYNTAX_ROWS.map(({ input, desc }) => (
            <div className="syntax-row" key={input}>
              <code className="syntax-input">{input}</code>
              <span className="syntax-desc">{desc}</span>
            </div>
          ))}
        </div>

        <div className="syntax-modal-footer">
          <span>_ all standard CommonMark syntax is supported</span>
        </div>
      </div>
    </div>
  );
}
