import FilterPanel from './FilterPanel';
import PopularWidget from './PopularWidget';
import GenreWidget from './GenreWidget';
import HistoryWidget from './HistoryWidget';
import BookmarkWidget from './BookmarkWidget';

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-4 w-full">
      <FilterPanel />
      <PopularWidget />
      <GenreWidget />
      <HistoryWidget />
      <BookmarkWidget />
    </aside>
  );
}
