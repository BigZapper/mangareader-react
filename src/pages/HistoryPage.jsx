import { Link } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import { useHistory } from '../hooks/useHistory';

export default function HistoryPage() {
  const { history, clearHistory } = useHistory();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#ddd] font-semibold text-lg flex items-center gap-2">
          <span className="w-1 h-5 bg-[#366ad3] rounded-full block" />
          Reading History
        </h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm text-[#888] hover:text-red-400 border border-[#333] hover:border-red-400 px-3 py-1 rounded transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 text-[#555]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 opacity-30">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <p className="text-lg mb-2">No reading history</p>
          <p className="text-sm mb-4">Manga you read will appear here</p>
          <Link to="/manga" className="bg-[#366ad3] hover:bg-[#2856b8] text-white px-4 py-2 rounded text-sm transition-colors">
            Start Reading
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
          {history.map(manga => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      )}
    </div>
  );
}
