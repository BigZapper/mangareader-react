import { Link } from 'react-router-dom';
import { useGenres } from '../hooks/useGenres';

export default function GenreBar() {
  const { data: genres } = useGenres();

  return (
    <div className="bg-[#f90] py-2 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-1 overflow-x-auto scrollbar-hide">
        <span className="text-black font-semibold text-sm shrink-0 mr-2">Genres:</span>
        <div className="flex gap-1 flex-nowrap">
          {genres?.map(genre => (
            <Link
              key={genre._id}
              to={`/the-loai/${genre.slug}`}
              className="text-black text-xs font-medium px-3 py-1 hover:bg-black/20 rounded whitespace-nowrap transition-colors"
            >
              {genre.name}
            </Link>
          ))}
        </div>
        <Link
          to="/manga"
          className="shrink-0 ml-2 bg-black text-white text-xs font-medium px-3 py-1 rounded hover:bg-[#222] transition-colors whitespace-nowrap"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
