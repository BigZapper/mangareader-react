import { useSearchParams, useNavigate } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar/Sidebar';
import { useMangaList } from '../hooks/useMangaList';

const TYPES = [
  { slug: 'truyen-moi', label: 'Truyện Mới' },
  { slug: 'dang-phat-hanh', label: 'Đang Phát Hành' },
  { slug: 'sap-ra-mat', label: 'Sắp Ra Mắt' },
  { slug: 'hoan-thanh', label: 'Hoàn Thành' },
];

export default function MangaList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = searchParams.get('type') || 'truyen-moi';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, isError } = useMangaList(type, page);

  const handleTabChange = (slug) => {
    navigate(`/manga?type=${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (p) => {
    navigate(`/manga?type=${type}&page=${p}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 mb-5 border-b border-[#333] overflow-x-auto overflow-y-hidden">
            {TYPES.map((t) => (
              <button
                key={t.slug}
                onClick={() => handleTabChange(t.slug)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors -mb-px ${
                  type === t.slug
                    ? 'border-[#366ad3] text-[#366ad3]'
                    : 'border-transparent text-[#888] hover:text-[#ddd]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[#ddd] font-semibold text-lg flex items-center gap-2">
              <span className="w-1 h-5 bg-[#366ad3] rounded-full block" />
              {data?.titlePage ?? TYPES.find((t) => t.slug === type)?.label}
            </h1>
            {data && (
              <span className="text-[#555] text-sm">
                {data.totalItems.toLocaleString()} truyện
              </span>
            )}
          </div>

          {isLoading && (
            <div className="text-center text-[#888] py-16">Đang tải...</div>
          )}

          {isError && (
            <div className="text-center text-red-400 py-16">Không thể tải dữ liệu. Vui lòng thử lại.</div>
          )}

          {data && (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
                {data.mangas.map((manga) => (
                  <MangaCard key={manga.id} manga={manga} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>

        <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
