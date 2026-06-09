import { Link } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import { useBookmarks } from '../hooks/useBookmarks';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <h1 className="text-[#ddd] font-semibold text-lg flex items-center gap-2 mb-6">
        <span className="w-1 h-5 bg-[#366ad3] rounded-full block" />
        My Bookmarks
      </h1>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20 text-[#555]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 opacity-30">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
          <p className="text-lg mb-2">No bookmarks yet</p>
          <p className="text-sm mb-4">Click the bookmark icon on any manga to save it here</p>
          <Link to="/manga" className="bg-[#366ad3] hover:bg-[#2856b8] text-white px-4 py-2 rounded text-sm transition-colors">
            Browse Manga
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
          {bookmarks.map(manga => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      )}
    </div>
  );
}
