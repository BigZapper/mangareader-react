import { Link } from 'react-router-dom';
import { genres } from '../../data/mockData';

export default function GenreWidget() {
  return (
    <div className="bg-th-surface rounded-lg p-4">
      <h3 className="text-th-text font-semibold text-sm mb-3 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#366ad3] rounded-full block" />
        Genres
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {genres.map(genre => (
          <Link
            key={genre}
            to={`/the-loai/${encodeURIComponent(genre.toLocaleLowerCase())}`}
            className="text-xs text-th-muted bg-th-card hover:bg-[#366ad3] hover:text-white px-2.5 py-1 rounded border border-th-border hover:border-[#366ad3] transition-colors"
          >
            {genre}
          </Link>
        ))}
      </div>
    </div>
  );
}
