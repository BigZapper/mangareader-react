import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar/Sidebar';
import { useMangaByGenre } from '../hooks/useMangaByGenre';

export default function GenreList() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, isError } = useMangaByGenre(slug, page);

  const handlePageChange = (p) => {
    navigate(`/the-loai/${slug}?page=${p}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[#ddd] font-semibold text-lg flex items-center gap-2">
              <span className="w-1 h-5 bg-[#366ad3] rounded-full block" />
              {data?.titlePage ?? slug}
            </h1>
            {data && (
              <span className="text-[#555] text-sm">{data.totalItems.toLocaleString()} kết quả</span>
            )}
          </div>

          {isLoading && (
            <div className="text-center text-[#888] py-16">Đang tải...</div>
          )}

          {isError && (
            <div className="text-center text-red-400 py-16">Không thể tải dữ liệu. Vui lòng thử lại.</div>
          )}

          {data && data.mangas.length === 0 && (
            <div className="text-center py-16 text-[#555]">
              <p className="text-lg">Không có truyện nào</p>
            </div>
          )}

          {data && data.mangas.length > 0 && (
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
