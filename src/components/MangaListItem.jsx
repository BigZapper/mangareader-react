import { Link } from 'react-router-dom';
import { FaFire, FaCircle } from 'react-icons/fa';

export default function MangaListItem({ manga }) {
  const typeColor = {
    Manga: 'bg-blue-600',
    Manhwa: 'bg-green-600',
    Manhua: 'bg-orange-600',
  };

  const statusColor = {
    Ongoing: 'text-green-400',
    Completed: 'text-blue-400',
    Hiatus: 'text-yellow-400',
  };

  return (
    <div className="flex gap-3 py-3 border-b border-th-border-s last:border-0">
      {/* Cover */}
      <div className="relative shrink-0">
        <Link to={`/manga/${manga.slug}`}>
          <img
            src={manga.cover}
            alt={manga.title}
            className="w-[60px] h-[80px] object-cover rounded"
            loading="lazy"
          />
          <div className="absolute top-1 left-1 flex flex-col gap-0.5">
            <span className={`text-white text-[9px] font-medium px-1 py-0.5 rounded ${typeColor[manga.type] || 'bg-gray-600'}`}>
              {manga.type}
            </span>
            {manga.isHot && (
              <span className="bg-[#f90] text-black text-[9px] font-bold px-1 py-0.5 rounded flex items-center gap-0.5">
                <FaFire size={7} />
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/manga/${manga.slug}`} className="font-medium text-th-text hover:text-[#366ad3] text-sm leading-tight block mb-1.5 line-clamp-2">
          {manga.title}
        </Link>

        <ul className="space-y-0.5">
          {manga.chapters.map((ch, i) => (
            <li key={i} className="flex items-center justify-between gap-2">
              <Link
                to={`/manga/${manga.slug}/${ch.slug}`}
                className="text-xs text-th-muted hover:text-[#366ad3] transition-colors truncate"
              >
                {ch.title}
              </Link>
              <span className="text-xs text-th-dim shrink-0">{ch.timeAgo}</span>
            </li>
          ))}
        </ul>

        <div className={`flex items-center gap-1 mt-1.5 text-xs ${statusColor[manga.status] || 'text-th-muted'}`}>
          <FaCircle size={6} />
          {manga.status}
        </div>
      </div>
    </div>
  );
}
