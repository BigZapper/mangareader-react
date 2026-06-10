import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useGenres } from '../../hooks/useGenres';
import { EMPTY_FILTERS } from '../../utils/filterMangas';
import { FaAngleDown, FaTimes } from 'react-icons/fa';

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
  { value: 'manhua', label: 'Manhua' },
];

const ORDER_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'az', label: 'A-Z' },
  { value: 'za', label: 'Z-A' },
  { value: 'update', label: 'Mới cập nhật' },
];

function DropdownFilter({ label, currentLabel, isOpen, onToggle, children }) {
  return (
    <div className="w-1/2 px-[5px] py-[6px] relative">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-1 bg-th-input light:bg-gray-100 text-th-text light:text-gray-700 text-xs py-1.5 px-2 rounded whitespace-nowrap"
      >
        <span className="font-medium">{label}</span>
        <span className="flex items-center gap-1 text-th-muted light:text-gray-500 min-w-0">
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

export default function FilterPanel({ filters = EMPTY_FILTERS, onFiltersChange }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { data: genres } = useGenres();
  const panelRef = useRef(null);

  const { status, type, genres: selectedGenres, order } = filters;

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

  const update = (patch) => onFiltersChange({ ...filters, ...patch });

  const toggleGenre = (slug) => {
    update({
      genres: selectedGenres.includes(slug)
        ? selectedGenres.filter((g) => g !== slug)
        : [...selectedGenres, slug],
    });
  };

  const hasActiveFilters = status || type || selectedGenres.length > 0 || order;

  const statusLabel = STATUS_OPTIONS.find((o) => o.value === status)?.label ?? 'All';
  const typeLabel   = TYPE_OPTIONS.find((o) => o.value === type)?.label   ?? 'All';
  const orderLabel  = ORDER_OPTIONS.find((o) => o.value === order)?.label  ?? 'Default';
  const genreLabel  = selectedGenres.length > 0 ? `${selectedGenres.length} selected` : 'All';

  const dropdownListCls =
    'absolute z-30 bg-th-input light:bg-white border border-black/20 light:border-gray-200 rounded shadow-lg';

  const dropdownItemCls = (active) =>
    `flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer transition-colors ${
      active
        ? 'text-[#366ad3] font-medium'
        : 'text-th-text light:text-gray-600 hover:text-white light:hover:text-gray-900'
    }`;

  return (
    <div
      className="bg-th-surface light:bg-white rounded-lg border border-transparent light:border-gray-200"
      ref={panelRef}
    >
      <div className="flex items-center justify-between border-b border-th-border-s light:border-gray-200 px-4 py-2">
        <h3 className="text-sm font-semibold text-th-text light:text-gray-800">Bộ lọc</h3>
        {hasActiveFilters && (
          <button
            onClick={() => { onFiltersChange(EMPTY_FILTERS); setActiveDropdown(null); }}
            className="flex items-center gap-1 text-[10px] text-th-muted light:text-gray-500 hover:text-red-400 transition-colors"
          >
            <FaTimes size={9} /> Xóa lọc
          </button>
        )}
      </div>

      <div className="p-2.5">
        <div className="flex flex-wrap">

          {/* Genre */}
          <DropdownFilter
            label="Thể loại"
            currentLabel={genreLabel}
            isOpen={activeDropdown === 'genre'}
            onToggle={() => toggleDropdown('genre')}
          >
            <ul className={`${dropdownListCls} top-full left-0 w-[280px] p-2 max-h-[240px] overflow-y-auto flex flex-wrap`}>
              {genres?.map((genre) => (
                <li key={genre._id} className="w-1/3 p-0">
                  <label
                    className={`block px-1.5 py-1 text-xs cursor-pointer truncate rounded transition-colors ${
                      selectedGenres.includes(genre.slug)
                        ? 'text-[#366ad3] font-medium'
                        : 'text-th-text light:text-gray-600 hover:text-white light:hover:text-gray-900'
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
            label="Trạng thái"
            currentLabel={statusLabel}
            isOpen={activeDropdown === 'status'}
            onToggle={() => toggleDropdown('status')}
          >
            <ul className={`${dropdownListCls} top-full right-0 w-36 py-1`}>
              {STATUS_OPTIONS.map((o) => (
                <li key={o.value}>
                  <label className={dropdownItemCls(status === o.value)}>
                    <input
                      type="radio"
                      className="hidden"
                      name="status"
                      value={o.value}
                      checked={status === o.value}
                      onChange={() => { update({ status: o.value }); setActiveDropdown(null); }}
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
            label="Loại"
            currentLabel={typeLabel}
            isOpen={activeDropdown === 'type'}
            onToggle={() => toggleDropdown('type')}
          >
            <ul className={`${dropdownListCls} top-full right-0 w-36 py-1`}>
              {TYPE_OPTIONS.map((o) => (
                <li key={o.value}>
                  <label className={dropdownItemCls(type === o.value)}>
                    <input
                      type="radio"
                      className="hidden"
                      name="type"
                      value={o.value}
                      checked={type === o.value}
                      onChange={() => { update({ type: o.value }); setActiveDropdown(null); }}
                    />
                    {type === o.value ? '✓ ' : '  '}
                    {o.label}
                  </label>
                </li>
              ))}
            </ul>
          </DropdownFilter>

          {/* Order */}
          <DropdownFilter
            label="Sắp xếp"
            currentLabel={orderLabel}
            isOpen={activeDropdown === 'order'}
            onToggle={() => toggleDropdown('order')}
          >
            <ul className={`${dropdownListCls} top-full right-0 w-36 py-1`}>
              {ORDER_OPTIONS.map((o) => (
                <li key={o.value}>
                  <label className={dropdownItemCls(order === o.value)}>
                    <input
                      type="radio"
                      className="hidden"
                      name="order"
                      value={o.value}
                      checked={order === o.value}
                      onChange={() => { update({ order: o.value }); setActiveDropdown(null); }}
                    />
                    {order === o.value ? '✓ ' : '  '}
                    {o.label}
                  </label>
                </li>
              ))}
            </ul>
          </DropdownFilter>

        </div>
      </div>
    </div>
  );
}

FilterPanel.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.string,
    type: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    order: PropTypes.string,
  }),
  onFiltersChange: PropTypes.func.isRequired,
};
