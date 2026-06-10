import PropTypes from 'prop-types';
import FilterPanel from './FilterPanel';
import PopularWidget from './PopularWidget';
import GenreWidget from './GenreWidget';
import HistoryWidget from './HistoryWidget';
import BookmarkWidget from './BookmarkWidget';

export default function Sidebar({ filters, onFiltersChange }) {
  return (
    <aside className="flex flex-col gap-4 w-full">
      {onFiltersChange && (
        <div className="hidden lg:block">
          <FilterPanel filters={filters} onFiltersChange={onFiltersChange} />
        </div>
      )}
      <PopularWidget />
      <GenreWidget />
      <HistoryWidget />
      <BookmarkWidget />
    </aside>
  );
}

Sidebar.propTypes = {
  filters: PropTypes.object,
  onFiltersChange: PropTypes.func,
};
