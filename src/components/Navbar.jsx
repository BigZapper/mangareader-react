import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaTimes, FaBookmark, FaHistory, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Manga List', to: '/manga' },
  { label: 'Bookmark', to: '/bookmarks' },
  { label: 'History', to: '/history' },
  { label: 'AZ Lists', to: '/az' },
];

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?s=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-th-surface border-b border-th-border shadow-lg">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-4 h-14">
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-th-muted hover:text-[#366ad3] md:hidden transition-colors"
          aria-label="Menu"
        >
          <FaBars size={20} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#366ad3] rounded flex items-center justify-center font-bold text-white text-sm">MR</div>
          <span className="font-semibold text-th-text hidden sm:block text-base">MangaReader</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 text-th-muted hover:text-[#366ad3] text-sm font-medium transition-colors rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search bar desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-th-input border border-th-border rounded overflow-hidden">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search manga..."
            className="bg-transparent text-th-text placeholder-th-dim px-3 py-1.5 text-sm outline-none w-48 focus:w-64 transition-all"
          />
          <button type="submit" className="px-3 py-2 text-th-muted hover:text-[#366ad3] transition-colors">
            <FaSearch size={14} />
          </button>
        </form>

        {/* Mobile search icon */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="md:hidden text-th-muted hover:text-[#366ad3] transition-colors"
          aria-label="Search"
        >
          <FaSearch size={16} />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="text-th-muted hover:text-[#366ad3] transition-colors shrink-0 ml-auto md:ml-0"
          aria-label="Toggle theme"
        >
          {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
        </button>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden border-t border-th-border px-4 py-2">
          <form onSubmit={handleSearch} className="flex items-center bg-th-input border border-th-border rounded overflow-hidden">
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search manga..."
              className="bg-transparent text-th-text placeholder-th-dim px-3 py-2 text-sm outline-none flex-1"
            />
            <button type="submit" className="px-3 py-2 text-th-muted hover:text-[#366ad3]">
              <FaSearch size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-th-border bg-th-surface">
          <nav className="flex flex-col py-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 text-th-muted hover:text-[#366ad3] hover:bg-th-card text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
