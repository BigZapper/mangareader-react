import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaCircle } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useMangaList } from '../hooks/useMangaList';

const STATUS_COLOR = {
  Ongoing: 'text-green-400',
  Completed: 'text-blue-400',
  'Coming Soon': 'text-yellow-400',
};

export default function HeroSlider() {
  const { data } = useMangaList('truyen-moi', 1);
  const mangas = data?.mangas?.slice(0, 8) ?? [];

  if (mangas.length === 0) {
    return <div className="h-[420px] md:h-[520px] bg-th-bg" />;
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 50000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="hero-swiper"
        style={{ '--swiper-navigation-color': '#366ad3', '--swiper-pagination-color': '#366ad3' }}
      >
        {mangas.map((manga) => (
          <SwiperSlide key={manga.id}>
            <div className="relative h-[220px] md:h-[340px] overflow-hidden">
              {/* Background — cover image blurred */}
              <div className="absolute inset-0">
                <img
                  src={manga.cover}
                  alt=""
                  className="w-full h-full object-cover scale-110 blur-sm opacity-40"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#16151d] via-[#16151dee] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16151d] via-transparent to-transparent" />

              {/* Content */}
              <div className="relative h-full max-w-[1200px] mx-auto px-5 flex items-center gap-6">
                {/* Cover */}
                <div className="shrink-0">
                  <img
                    src={manga.cover}
                    alt={manga.title}
                    className="w-[80px] sm:w-[120px] md:w-[160px] aspect-[2/3] rounded-lg shadow-2xl object-cover border border-[#ffffff15]"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 max-w-lg min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-3">
                    {manga.type && (
                      <span className="bg-[#366ad3] text-white text-xs px-2 py-0.5 rounded font-medium">
                        {manga.type}
                      </span>
                    )}
                    {manga.status && (
                      <span className={`flex items-center gap-1 text-xs font-medium ${STATUS_COLOR[manga.status] ?? 'text-th-muted'}`}>
                        <FaCircle size={6} />
                        {manga.status}
                      </span>
                    )}
                  </div>

                  <h2 className="text-base sm:text-2xl md:text-4xl font-bold text-white mb-1.5 sm:mb-3 leading-tight line-clamp-2">
                    {manga.title}
                  </h2>

                  {manga.genreCategories?.length > 0 && (
                    <div className="hidden sm:flex flex-wrap gap-2 mb-4">
                      {manga.genreCategories.slice(0, 4).map((g) => (
                        <Link
                          key={g.slug}
                          to={`/the-loai/${g.slug}`}
                          className="text-xs text-[#b8b8b8] bg-[#ffffff15] border border-[#ffffff20] px-2 py-0.5 rounded hover:bg-[#366ad3] hover:text-white hover:border-[#366ad3] transition-colors"
                        >
                          {g.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {manga.latestChapter && (
                    <p className="hidden sm:block text-th-muted text-sm mb-4">
                      Mới nhất: {manga.latestChapter}
                    </p>
                  )}

                  <div className="flex gap-2 sm:gap-3">
                    <Link
                      to={`/manga/${manga.slug}`}
                      className="flex items-center gap-1.5 sm:gap-2 bg-[#366ad3] hover:bg-[#2856b8] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors"
                    >
                      <FaBookOpen size={12} />
                      Đọc ngay
                    </Link>
                    <Link
                      to={`/manga/${manga.slug}`}
                      className="flex items-center gap-1.5 sm:gap-2 bg-[#ffffff15] hover:bg-[#ffffff25] text-[#ddd] px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors border border-[#ffffff20]"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
