import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import MangaCard from '../components/MangaCard';
import Sidebar from '../components/Sidebar/Sidebar';
import { useInfiniteSearchMangas } from '../hooks/useInfiniteSearchMangas';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { applyFilters, EMPTY_FILTERS } from '../utils/filterMangas';
import FilterPanel from '../components/Sidebar/FilterPanel';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const keyword = searchParams.get('s') || '';
  const [inputValue, setInputValue] = useState(keyword);
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  // Sync input when URL keyword changes (e.g. from Navbar)
  useEffect(() => { setInputValue(keyword); }, [keyword]);
  // Reset filters when keyword changes
  useEffect(() => { setFilters(EMPTY_FILTERS); }, [keyword]);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteSearchMangas(keyword);

  const allMangas = data?.pages.flatMap((p) => p.mangas) ?? [];
  const totalItems = data?.pages[0]?.totalItems ?? 0;
  const filtered = applyFilters(allMangas, filters);

  const sentinelRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    const params = new URLSearchParams();
    if (trimmed) params.set('s', trimmed);
    navigate(`/search?${params.toString()}`);
  };

  const activeFilterCount =
    [filters.status, filters.type, filters.order].filter(Boolean).length +
    filters.genres.length;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 min-w-0">
          {/* Search input */}
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tìm kiếm truyện..."
              className="flex-1 bg-th-surface border border-th-border text-th-text placeholder-th-dim px-4 py-2.5 rounded text-sm outline-none focus:border-[#366ad3] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#366ad3] hover:bg-[#2856b8] text-white px-4 py-2.5 rounded flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <FaSearch size={13} />
              Tìm
            </button>
          </form>

          {/* FilterPanel — mobile only */}
          <div className="lg:hidden mb-4">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Result header */}
          {!isLoading && (
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-th-text font-semibold text-lg flex items-center gap-2">
                <span className="w-1 h-5 bg-[#366ad3] rounded-full block" />
                {keyword ? `Kết quả: "${keyword}"` : 'Tất cả truyện'}
              </h1>
              <span className="text-th-dim text-sm flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <span className="text-xs bg-[#366ad3]/20 text-[#6ea0ff] border border-[#366ad3]/40 px-2 py-0.5 rounded">
                    {activeFilterCount} bộ lọc
                  </span>
                )}
                {totalItems > 0 && (
                  <span>
                    {filtered.length !== allMangas.length
                      ? `${filtered.length} / ${totalItems}`
                      : totalItems}{' '}
                    kết quả
                  </span>
                )}
              </span>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-th-muted py-16">
              <FaSpinner className="animate-spin" />
              Đang tải...
            </div>
          )}

          {isError && !isLoading && allMangas.length === 0 && (
            <div className="text-center text-red-400 py-16">
              Không thể tải kết quả. Vui lòng thử lại.
            </div>
          )}

          {!isLoading && !isError && allMangas.length === 0 && (
            <div className="text-center py-16 text-th-dim">
              <p className="text-lg mb-1">Không tìm thấy kết quả</p>
              <p className="text-sm">Thử tìm với từ khóa khác</p>
            </div>
          )}

          {allMangas.length > 0 && (
            <>
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-th-dim">
                  <p className="text-lg mb-1">Không có kết quả khớp bộ lọc</p>
                  <p className="text-sm">Thử thay đổi hoặc bỏ bộ lọc</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
                  {filtered.map((manga) => (
                    <MangaCard key={manga.id} manga={manga} />
                  ))}
                </div>
              )}

              {isError && (
                <div className="text-center text-red-400 text-sm py-4">
                  Không thể tải thêm. Thử lại sau.
                </div>
              )}
            </>
          )}

          <div ref={sentinelRef} className="h-4 mt-4" />

          {isFetchingNextPage && (
            <div className="flex items-center justify-center gap-2 text-th-muted py-6 text-sm">
              <FaSpinner className="animate-spin" size={14} />
              Đang tải thêm...
            </div>
          )}

          {!isLoading && !isFetchingNextPage && !hasNextPage && allMangas.length > 0 && (
            <div className="text-center py-4 text-th-dim text-xs">
              — Đã hiển thị tất cả kết quả —
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
