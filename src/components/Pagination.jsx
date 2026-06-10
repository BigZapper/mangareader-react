export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) pages.push(i);

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded bg-th-card text-th-muted hover:bg-[#366ad3] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-1.5 text-sm rounded bg-th-card text-th-muted hover:bg-[#366ad3] hover:text-white transition-colors">1</button>
          {start > 2 && <span className="text-th-dim px-1">...</span>}
        </>
      )}

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1.5 text-sm rounded transition-colors ${
            p === currentPage
              ? 'bg-[#366ad3] text-white'
              : 'bg-th-card text-th-muted hover:bg-[#366ad3] hover:text-white'
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-th-dim px-1">...</span>}
          <button onClick={() => onPageChange(totalPages)} className="px-3 py-1.5 text-sm rounded bg-th-card text-th-muted hover:bg-[#366ad3] hover:text-white transition-colors">{totalPages}</button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded bg-th-card text-th-muted hover:bg-[#366ad3] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}
