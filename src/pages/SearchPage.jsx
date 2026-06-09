import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import MangaCard from '../components/MangaCard';
import Sidebar from '../components/Sidebar/Sidebar';
import { useInfiniteSearchMangas } from '../hooks/useInfiniteSearchMangas';

const STATUS_LABEL = {
  ongoing: 'Ongoing',
  completed: 'Completed',
  coming_soon: 'Coming Soon',
};

function applyFilters(mangas, status, type, genres, order) {
  let result = mangas;

  if (status && STATUS_LABEL[status]) {
    result = result.filter((m) => m.status === STATUS_LABEL[status]);
  }

  if (type) {
    result = result.filter((m) => m.type?.toLowerCase() === type);
  }

  if (genres.length > 0) {
    result = result.filter((m) =>
      genres.some((slug) => m.genreCategories?.some((g) => g.slug === slug))
    );
  }

  if (order === 'az') return [...result].sort((a, b) => a.title.localeCompare(b.title));
  if (order === 'za') return [...result].sort((a, b) => b.title.localeCompare(a.title));
  if (order === 'update') {
    return [...result].sort(
      (a, b) => (b.updatedAt ? new Date(b.updatedAt) : 0) - (a.updatedAt ? new Date(a.updatedAt) : 0)
    );
  }

  return result;
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const keyword = searchParams.get('s') || '';
  const status = searchParams.get('status') || '';
  const type = searchParams.get('type') || '';
  const order = searchParams.get('order') || '';
  const genres = searchParams.getAll('genre');

  const [inputValue, setInputValue] = useState(keyword);
  useEffect(() => { setInputValue(keyword); }, [keyword]);

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
  const filtered = applyFilters(allMangas, status, type, genres, order);

  const sentinelRef = useRef(null);

  // IntersectionObserver — recreated when hasNextPage/isFetchingNextPage changes
  useEffect(() => {
    if (!hasNextPage) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) fetchNextPage();
      },
      { rootMargin: '400px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // After a page loads: if sentinel is already in view (sparse filtered results),
  // trigger the next page immediately without waiting for a scroll event.
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const rect = sentinel.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 400) fetchNextPage();
  }, [data?.pages.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const trimmed = inputValue.trim();
    if (trimmed) params.set('s', trimmed);
    else params.delete('s');
    navigate(`/search?${params.toString()}`);
  };

  const filterChips = [
    status && (STATUS_LABEL[status] ?? status),
    type && (type.charAt(0).toUpperCase() + type.slice(1)),
    genres.length > 0 && `${genres.length} thể loại`,
    order === 'az' && 'A→Z',
    order === 'za' && 'Z→A',
    order === 'update' && 'Mới cập nhật',
    order === 'popular' && 'Phổ biến',
  ].filter(Boolean);

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
              className="flex-1 bg-[#1d1b26] border border-[#333] text-[#ddd] placeholder-[#555] px-4 py-2.5 rounded text-sm outline-none focus:border-[#366ad3] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#366ad3] hover:bg-[#2856b8] text-white px-4 py-2.5 rounded flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <FaSearch size={13} />
              Tìm
            </button>
          </form>

          {/* Active filter chips */}
          {filterChips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {filterChips.map((chip) => (
                <span
                  key={chip}
                  className="text-xs bg-[#366ad3]/20 text-[#6ea0ff] border border-[#366ad3]/40 px-2 py-0.5 rounded"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          {/* Result header */}
          {!isLoading && (
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-[#ddd] font-semibold text-lg flex items-center gap-2">
                <span className="w-1 h-5 bg-[#366ad3] rounded-full block" />
                {keyword ? `Kết quả: "${keyword}"` : 'Tất cả truyện'}
              </h1>
              {totalItems > 0 && (
                <span className="text-[#555] text-sm">
                  {filtered.length !== allMangas.length
                    ? `${filtered.length} / ${totalItems}`
                    : totalItems}{' '}
                  kết quả
                </span>
              )}
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-[#888] py-16">
              <FaSpinner className="animate-spin" />
              Đang tải...
            </div>
          )}

          {/* Full-page error only when there's no data at all */}
          {isError && !isLoading && allMangas.length === 0 && (
            <div className="text-center text-red-400 py-16">
              Không thể tải kết quả. Vui lòng thử lại.
            </div>
          )}

          {!isLoading && !isError && allMangas.length === 0 && (
            <div className="text-center py-16 text-[#555]">
              <p className="text-lg mb-1">Không tìm thấy kết quả</p>
              <p className="text-sm">Thử tìm với từ khóa khác</p>
            </div>
          )}

          {/* Grid shows whenever there's data — even if a subsequent page errored */}
          {allMangas.length > 0 && (
            <>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-[#555]">
                  <p className="text-lg mb-1">Không có kết quả khớp bộ lọc</p>
                  <p className="text-sm">Thử thay đổi hoặc bỏ bộ lọc</p>
                </div>
              )}

              {filtered.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
                  {filtered.map((manga) => (
                    <MangaCard key={manga.id} manga={manga} />
                  ))}
                </div>
              )}

              {/* Inline error when load-more fails but we still have partial data */}
              {isError && (
                <div className="text-center text-red-400 text-sm py-4">
                  Không thể tải thêm. Thử lại sau.
                </div>
              )}
            </>
          )}

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="h-4 mt-4" />

          {isFetchingNextPage && (
            <div className="flex items-center justify-center gap-2 text-[#888] py-6 text-sm">
              <FaSpinner className="animate-spin" size={14} />
              Đang tải thêm...
            </div>
          )}

          {!isLoading && !isFetchingNextPage && !hasNextPage && allMangas.length > 0 && (
            <div className="text-center py-4 text-[#444] text-xs">
              — Đã hiển thị tất cả kết quả —
            </div>
          )}
        </main>

        <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
