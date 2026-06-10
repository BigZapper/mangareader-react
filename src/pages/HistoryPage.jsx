import { useState } from 'react';
import { Link } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import Sidebar from '../components/Sidebar/Sidebar';
import { useHistory } from '../hooks/useHistory';
import { applyFilters, EMPTY_FILTERS } from '../utils/filterMangas';
import FilterPanel from '../components/Sidebar/FilterPanel';

export default function HistoryPage() {
  const { history, clearHistory } = useHistory();
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const filtered = applyFilters(history, filters);

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
              Reading History
            </h1>
            <div className="flex items-center gap-3">
              {history.length > 0 && (
                <span className="text-th-dim text-sm">
                  {filtered.length !== history.length
                    ? `${filtered.length} / ${history.length}`
                    : history.length}{' '}
                  truyện
                </span>
              )}
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-sm text-th-muted hover:text-red-400 border border-th-border hover:border-red-400 px-3 py-1 rounded transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-20 text-th-dim">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 opacity-30">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className="text-lg mb-2">No reading history</p>
              <p className="text-sm mb-4">Manga you read will appear here</p>
              <Link to="/manga" className="bg-[#366ad3] hover:bg-[#2856b8] text-white px-4 py-2 rounded text-sm transition-colors">
                Start Reading
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
