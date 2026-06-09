import { Link } from 'react-router-dom';
import { useBookmarks } from '../../hooks/useBookmarks';

export default function BookmarkWidget() {
  const { bookmarks, toggle } = useBookmarks();

  return (
    <div className="bg-[#1d1b26] rounded-lg p-4">
      <h3 className="text-[#ddd] font-semibold text-sm mb-3 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#366ad3] rounded-full block" />
        Bookmarks
      </h3>

      {bookmarks.length === 0 ? (
        <p className="text-[#555] text-xs text-center py-4">No bookmarks yet</p>
      ) : (
        <div className="space-y-2">
          {bookmarks.slice(0, 5).map(item => (
            <div key={item.id} className="flex items-center gap-2 group">
              <Link to={`/manga/${item.slug}`}>
                <img src={item.cover} alt={item.title} className="w-8 h-10 object-cover rounded shrink-0" loading="lazy" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/manga/${item.slug}`} className="text-xs text-[#ddd] group-hover:text-[#366ad3] transition-colors line-clamp-1 block">
                  {item.title}
                </Link>
                <p className="text-[10px] text-[#555]">{item.latestChapter}</p>
              </div>
              <button
                onClick={() => toggle(item)}
                className="text-[#555] hover:text-red-400 transition-colors text-xs shrink-0"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
          {bookmarks.length > 5 && (
            <Link to="/bookmarks" className="text-xs text-[#366ad3] hover:underline block text-center mt-1">
              View all ({bookmarks.length})
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
