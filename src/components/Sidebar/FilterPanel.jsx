import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGenres } from '../../hooks/useGenres';
import { FaSearch, FaAngleDown } from 'react-icons/fa';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'coming_soon', label: 'Coming Soon' },
];

const TYPE_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'manga', label: 'Manga' },
  { value: 'manhwa', label: 'Manhwa' },
  { value: 'manhua', label: 'Manhua' }
];

const ORDER_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'az', label: 'A-Z' },
  { value: 'za', label: 'Z-A' },
  { value: 'update', label: 'Mới cập nhật' },
  { value: 'popular', label: 'Phổ biến' },
];

function DropdownFilter({ label, currentLabel, isOpen, onToggle, children }) {
  return (
    <div className="w-1/2 px-[5px] py-[6px] relative">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-1 bg-[#333] border border-[#444] text-[#ccc] text-xs py-1 px-2 rounded whitespace-nowrap"
      >
        <span className="font-medium">{label}</span>
        <span className="flex items-center gap-1 text-[#aaa] min-w-0">
          <span className="truncate max-w-[50px]">{currentLabel}</span>
          <FaAngleDown size={10} className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>
      {isOpen && children}
    </div>
  );
}

DropdownFilter.propTypes = {
  label: PropTypes.string.isRequired,
  currentLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default function FilterPanel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: genres } = useGenres();

  const [keyword, setKeyword] = useState(searchParams.get('s') || '');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [order, setOrder] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const panelRef = useRef(null);

  // Sync keyword input when URL changes (e.g. user searches from Navbar)
  useEffect(() => {
    setKeyword(searchParams.get('s') || '');
  }, [searchParams]);

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleDropdown = (name) =>
    setActiveDropdown((prev) => (prev === name ? null : name));

  const toggleGenre = (slug) =>
    setSelectedGenres((prev) =>
      prev.includes(slug) ? prev.filter((g) => g !== slug) : [...prev, slug]
    );

  const handleFilter = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('s', keyword.trim());
    if (status) params.set('status', status);
    if (type) params.set('type', type);
    if (order) params.set('order', order);
    selectedGenres.forEach((g) => params.append('genre', g));
    navigate(`/search?${params.toString()}`);
    setActiveDropdown(null);
  };

  const genreLabel = selectedGenres.length > 0 ? `${selectedGenres.length} selected` : 'All';
  const statusLabel = STATUS_OPTIONS.find((o) => o.value === status)?.label ?? 'All';
  const typeLabel = TYPE_OPTIONS.find((o) => o.value === type)?.label ?? 'All';
  const orderLabel = ORDER_OPTIONS.find((o) => o.value === order)?.label ?? 'Default';

  return (
    <div className="bg-[#222] rounded mb-4" ref={panelRef}>
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-[#312f40] px-4 py-2">
        <h3 className="text-sm font-semibold text-white">Filter Search</h3>
      </div>

      {/* Body */}
      <div className="p-2.5">
        <form onSubmit={handleFilter}>
          <div className="flex flex-wrap">

            {/* Keyword input */}
            <div className="w-full px-[5px] py-[6px]">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Từ khóa tìm kiếm..."
                className="w-full bg-[#2a2a2a] border border-[#444] text-[#ccc] text-xs py-1.5 px-2 rounded placeholder-[#555] outline-none focus:border-[#366ad3] transition-colors"
              />
            </div>

            {/* Genre */}
            <DropdownFilter
              label="Genre"
              currentLabel={genreLabel}
              isOpen={activeDropdown === 'genre'}
              onToggle={() => toggleDropdown('genre')}
            >
              <ul className="absolute top-full right-0 z-30 w-[280px] bg-[#333] border border-black/20 rounded shadow-lg p-2 max-h-[240px] overflow-y-auto flex flex-wrap">
                {genres?.map((genre) => (
                  <li key={genre._id} className="w-1/3 p-0">
                    <label
                      className={`block px-1.5 py-1 text-xs cursor-pointer truncate rounded transition-colors ${
                        selectedGenres.includes(genre.slug)
                          ? 'text-[#366ad3] font-medium'
                          : 'text-[#ccc] hover:text-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedGenres.includes(genre.slug)}
                        onChange={() => toggleGenre(genre.slug)}
                      />
                      {selectedGenres.includes(genre.slug) && '✓ '}
                      {genre.name}
                    </label>
                  </li>
                ))}
              </ul>
            </DropdownFilter>

            {/* Status */}
            <DropdownFilter
              label="Status"
              currentLabel={statusLabel}
              isOpen={activeDropdown === 'status'}
              onToggle={() => toggleDropdown('status')}
            >
              <ul className="absolute top-full right-0 z-30 w-36 bg-[#333] border border-black/20 rounded shadow-lg py-1">
                {STATUS_OPTIONS.map((o) => (
                  <li key={o.value} className="p-0">
                    <label
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer transition-colors ${
                        status === o.value ? 'text-[#366ad3] font-medium' : 'text-[#ccc] hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        className="hidden"
                        name="status"
                        value={o.value}
                        checked={status === o.value}
                        onChange={() => { setStatus(o.value); setActiveDropdown(null); }}
                      />
                      {status === o.value ? '✓ ' : '  '}
                      {o.label}
                    </label>
                  </li>
                ))}
              </ul>
            </DropdownFilter>

            {/* Type */}
            <DropdownFilter
              label="Type"
              currentLabel={typeLabel}
              isOpen={activeDropdown === 'type'}
              onToggle={() => toggleDropdown('type')}
            >
              <ul className="absolute top-full right-0 z-30 w-36 bg-[#333] border border-black/20 rounded shadow-lg py-1">
                {TYPE_OPTIONS.map((o) => (
                  <li key={o.value} className="p-0">
                    <label
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer transition-colors ${
                        type === o.value ? 'text-[#366ad3] font-medium' : 'text-[#ccc] hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        className="hidden"
                        name="type"
                        value={o.value}
                        checked={type === o.value}
                        onChange={() => { setType(o.value); setActiveDropdown(null); }}
                      />
                      {type === o.value ? '✓ ' : '  '}
                      {o.label}
                    </label>
                  </li>
                ))}
              </ul>
            </DropdownFilter>

            {/* Order By */}
            <DropdownFilter
              label="Order by"
              currentLabel={orderLabel}
              isOpen={activeDropdown === 'order'}
              onToggle={() => toggleDropdown('order')}
            >
              <ul className="absolute top-full right-0 z-30 w-36 bg-[#333] border border-black/20 rounded shadow-lg py-1">
                {ORDER_OPTIONS.map((o) => (
                  <li key={o.value} className="p-0">
                    <label
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer transition-colors ${
                        order === o.value ? 'text-[#366ad3] font-medium' : 'text-[#ccc] hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        className="hidden"
                        name="order"
                        value={o.value}
                        checked={order === o.value}
                        onChange={() => { setOrder(o.value); setActiveDropdown(null); }}
                      />
                      {order === o.value ? '✓ ' : '  '}
                      {o.label}
                    </label>
                  </li>
                ))}
              </ul>
            </DropdownFilter>

            {/* Submit */}
            <div className="w-full px-[5px] py-[6px]">
              <button
                type="submit"
                className="w-full bg-[#366ad3] hover:bg-[#2856b8] text-white text-xs font-medium py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors"
              >
                <FaSearch size={11} />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
