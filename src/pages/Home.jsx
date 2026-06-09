import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import GenreBar from '../components/GenreBar';
import SectionBox from '../components/SectionBox';
import MangaCard from '../components/MangaCard';
import MangaListItem from '../components/MangaListItem';
import PopularSlider from '../components/PopularSlider';
import Sidebar from '../components/Sidebar/Sidebar';
import { useHomeMangas } from '../hooks/useHomeMangas';
import { useMangaList } from '../hooks/useMangaList';

const TYPES = [
  { slug: 'truyen-moi', label: 'Truyện Mới' },
  { slug: 'dang-phat-hanh', label: 'Đang Phát Hành' },
  { slug: 'sap-ra-mat', label: 'Sắp Ra Mắt' },
  { slug: 'hoan-thanh', label: 'Hoàn Thành' },
];

export default function Home() {
  const [activeType, setActiveType] = useState('truyen-moi');

  const { data: homeMangas } = useHomeMangas();
  const { data: listData, isLoading: listLoading, isError: listError } = useMangaList(activeType, 1);

  return (
    <>
      <HeroSlider />
      <GenreBar />

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <main className="flex-1 min-w-0">

            {/* Popular — dùng data từ /home */}
            {homeMangas && (
              <SectionBox title="Nổi Bật Hôm Nay" viewAllLink="/manga?type=truyen-moi">
                <PopularSlider mangas={homeMangas.slice(0, 8)} />
              </SectionBox>
            )}

            {/* Tabbed list — dùng data từ /danh-sach */}
            <div>
              <div className="flex items-center justify-between mb-0">
                <div className="flex gap-1 border-b border-[#333] overflow-x-auto overflow-y-hidden">
                  {TYPES.map((t) => (
                    <button
                      key={t.slug}
                      onClick={() => setActiveType(t.slug)}
                      className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors -mb-px ${
                        activeType === t.slug
                          ? 'border-[#366ad3] text-[#366ad3]'
                          : 'border-transparent text-[#888] hover:text-[#ddd]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <Link
                  to={`/manga?type=${activeType}`}
                  className="text-xs text-[#366ad3] hover:underline shrink-0 ml-4 pb-1"
                >
                  Xem tất cả
                </Link>
              </div>

              <div className="mt-4">
                {listLoading && (
                  <div className="text-center text-[#888] py-12">Đang tải...</div>
                )}

                {listError && (
                  <div className="text-center text-red-400 py-12">Không thể tải dữ liệu.</div>
                )}

                {listData && (
                  <>
                    {/* List view — 8 items đầu */}
                    <div className="bg-[#1d1b26] rounded-lg px-4 divide-y divide-[#222] mb-6">
                      {listData.mangas.slice(0, 8).map((manga) => (
                        <MangaListItem key={manga.id} manga={manga} />
                      ))}
                    </div>

                    {/* Card grid — 16 items còn lại */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
                      {listData.mangas.slice(8).map((manga) => (
                        <MangaCard key={manga.id} manga={manga} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

          </main>

          <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
