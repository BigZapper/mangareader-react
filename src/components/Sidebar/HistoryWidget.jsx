import { Link } from 'react-router-dom';
import { useHistory } from '../../hooks/useHistory';

export default function HistoryWidget() {
  const { history, clearHistory } = useHistory();

  return (
    <div className="bg-th-surface rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-th-text font-semibold text-sm flex items-center gap-2">
          <span className="w-1 h-4 bg-[#366ad3] rounded-full block" />
          Reading History
        </h3>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-[10px] text-th-dim hover:text-red-400 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-th-dim text-xs text-center py-4">No history yet</p>
      ) : (
        <div className="space-y-2">
          {history.slice(0, 5).map(item => (
            <Link
              key={item.id}
              to={`/manga/${item.slug}`}
              className="flex items-center gap-2 group"
            >
              <img src={item.cover} alt={item.title} className="w-8 h-10 object-cover rounded shrink-0" loading="lazy" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-th-text group-hover:text-[#366ad3] transition-colors line-clamp-1">
                  {item.title}
                </p>
                <p className="text-[10px] text-th-dim">{item.latestChapter}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
