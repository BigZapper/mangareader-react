import { Link } from 'react-router-dom';

const alphabet = ['#', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

export default function Footer() {
  return (
    <footer className="bg-th-surface border-t border-th-border mt-8">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* A-Z Quick Nav */}
        <div className="mb-6">
          <h4 className="text-th-muted text-xs uppercase tracking-wider mb-3">Browse A-Z</h4>
          <div className="flex flex-wrap gap-1">
            {alphabet.map(letter => (
              <Link
                key={letter}
                to={`/manga?order=az&letter=${letter}`}
                className="w-7 h-7 flex items-center justify-center text-xs text-th-muted bg-th-card hover:bg-[#366ad3] hover:text-white rounded transition-colors"
              >
                {letter}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-th-border pt-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#366ad3] rounded flex items-center justify-center font-bold text-white text-xs">MR</div>
            <span className="text-th-text font-semibold">MangaReader</span>
          </div>

          <nav className="flex gap-4">
            {['Home', 'Manga List', 'Bookmark', 'History'].map(item => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                className="text-xs text-th-dim hover:text-[#366ad3] transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-th-dim">
            © {new Date().getFullYear()} MangaReader. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
