import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import MangaCard from '../components/MangaCard';
import Sidebar from '../components/Sidebar/Sidebar';
import { useInfiniteMangaByGenre } from '../hooks/useInfiniteMangaByGenre';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { applyFilters, EMPTY_FILTERS } from '../utils/filterMangas';
import FilterPanel from '../components/Sidebar/FilterPanel';

export default function GenreList() {
  const { slug } = useParams();
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  // Reset filters when navigating to a different genre
  useEffect(() => { setFilters(EMPTY_FILTERS); }, [slug]);

  const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteMangaByGenre(slug);

  const allMangas = data?.pages.flatMap((p) => p.mangas) ?? [];
  const totalItems = data?.pages[0]?.totalItems ?? 0;
  const filtered = applyFilters(allMangas, filters);

  const sentinelRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 min-w-0">
          {/* FilterPanel — mobile only */}
          <div className="lg:hidden mb-4">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-th-text font-semibold text-lg flex items-center gap-2">
              <span className="w-1 h-5 bg-[#366ad3] rounded-full block" />
              {data?.pages[0]?.titlePage ?? slug}
            </h1>
            {totalItems > 0 && (
              <span className="text-th-dim text-sm">
                {filtered.length !== allMangas.length
                  ? `${filtered.length} / ${totalItems.toLocaleString()}`
                  : totalItems.toLocaleString()}{' '}
                kết quả
              </span>
            )}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-th-muted py-16">
              <FaSpinner className="animate-spin" /> Đang tải...
            </div>
          )}

          {isError && allMangas.length === 0 && (
            <div className="text-center text-red-400 py-16">
              Không thể tải dữ liệu. Vui lòng thử lại.
            </div>
          )}

          {allMangas.length > 0 && (
            <>
              {filtered.length === 0 ? (
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
            </>
          )}

          <div ref={sentinelRef} className="h-4 mt-4" />

          {isFetchingNextPage && (
            <div className="flex items-center justify-center gap-2 text-th-muted py-6 text-sm">
              <FaSpinner className="animate-spin" size={14} /> Đang tải thêm...
            </div>
          )}

          {!isLoading && !isFetchingNextPage && !hasNextPage && allMangas.length > 0 && (
            <div className="text-center py-4 text-th-dim text-xs">
              — Đã hiển thị tất cả —
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
