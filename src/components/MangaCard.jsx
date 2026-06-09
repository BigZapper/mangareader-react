import { Link } from 'react-router-dom';
import { FaStar, FaFire } from 'react-icons/fa';
import { useBookmarks } from '../hooks/useBookmarks';

export default function MangaCard({ manga }) {
  const { isBookmarked, toggle } = useBookmarks();
  const bookmarked = isBookmarked(manga.id);

  const typeColor = {
    Manga: 'bg-blue-600',
    Manhwa: 'bg-green-600',
    Manhua: 'bg-orange-600',
    Comic: 'bg-purple-600',
    Novel: 'bg-yellow-600',
  };

  return (
    <div className="group relative">
      <Link to={`/manga/${manga.slug}`} className="block">
        {/* Cover image */}
        <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-[#222]">
          <img
            src={manga.cover}
            alt={manga.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlay on hover */}
          {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#366ad3] text-white rounded-full w-10 h-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            </div>
          </div> */}

          {/* Badges */}
          <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
            <span className={`text-white text-[10px] font-medium px-1.5 py-0.5 rounded ${typeColor[manga.type] || 'bg-gray-600'}`}>
              {manga.type}
            </span>
            {manga.isHot && (
              <span className="bg-[#f90] text-black text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <FaFire size={8} /> HOT
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-2">
          <h3 className="text-[#ddd] font-medium text-sm leading-tight line-clamp-2 group-hover:text-[#366ad3] transition-colors">
            {manga.title}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[#888] text-xs">{manga.latestChapter}</span>
            {manga.rating && (
              <span className="flex items-center gap-0.5 text-[#f90] text-xs font-medium">
                <FaStar size={10} /> {manga.rating}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Bookmark button */}
      <button
        onClick={(e) => { e.preventDefault(); toggle(manga); }}
        className={`absolute top-1.5 right-1.5 w-7 h-7 rounded flex items-center justify-center transition-colors ${
          bookmarked ? 'bg-[#366ad3] text-white' : 'bg-black/50 text-[#fff] hover:bg-[#366ad3] hover:text-white'
        }`}
        title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill={bookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
        </svg>
      </button>
    </div>
  );
}
