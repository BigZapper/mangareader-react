export default function SectionBox({ title, viewAllLink, children, className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-th-text font-semibold text-base flex items-center gap-2">
          <span className="w-1 h-5 bg-[#366ad3] rounded-full block" />
          {title}
        </h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-xs text-[#366ad3] hover:underline">
            View All
          </a>
        )}
      </div>
      {children}
    </div>
  );
}
