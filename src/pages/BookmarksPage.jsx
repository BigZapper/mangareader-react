import { useState } from 'react';
import { Link } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import Sidebar from '../components/Sidebar/Sidebar';
import { useBookmarks } from '../hooks/useBookmarks';
import { applyFilters, EMPTY_FILTERS } from '../utils/filterMangas';
import FilterPanel from '../components/Sidebar/FilterPanel';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const filtered = applyFilters(bookmarks, filters);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 min-w-0">
          {/* FilterPanel — mobile only */}
          <div className="lg:hidden mb-4">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-th-text font-semibold text-lg flex items-center gap-2">
              <span className="w-1 h-5 bg-[#366ad3] rounded-full block" />
              My Bookmarks
            </h1>
            {bookmarks.length > 0 && (
              <span className="text-th-dim text-sm">
                {filtered.length !== bookmarks.length
                  ? `${filtered.length} / ${bookmarks.length}`
                  : bookmarks.length}{' '}
                truyện
              </span>
            )}
          </div>

          {bookmarks.length === 0 ? (
            <div className="text-center py-20 text-th-dim">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 opacity-30">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              <p className="text-lg mb-2">No bookmarks yet</p>
              <p className="text-sm mb-4">Click the bookmark icon on any manga to save it here</p>
              <Link to="/manga" className="bg-[#366ad3] hover:bg-[#2856b8] text-white px-4 py-2 rounded text-sm transition-colors">
                Browse Manga
              </Link>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-th-dim">
              <p className="text-lg mb-1">Không có kết quả khớp bộ lọc</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
              {filtered.map((manga) => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          )}
        </main>

        <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0">
          <Sidebar filters={filters} onFiltersChange={setFilters} />
        </div>
      </div>
    </div>
  );
}
