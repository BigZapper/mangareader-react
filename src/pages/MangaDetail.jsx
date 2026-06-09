import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaBookmark, FaRegBookmark, FaBook, FaUser, FaTag } from 'react-icons/fa';
import { useBookmarks } from '../hooks/useBookmarks';
import { useHistory } from '../hooks/useHistory';
import { useMangaDetail } from '../hooks/useMangaDetail';

export default function MangaDetail() {
  const { slug } = useParams();
  const { isBookmarked, toggle } = useBookmarks();
  const { addToHistory } = useHistory();

  const { data: manga, isLoading, isError } = useMangaDetail(slug);

  useEffect(() => {
    if (manga) addToHistory(manga);
  }, [manga?.id]);

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 text-center text-[#888]">
        Đang tải...
      </div>
    );
  }

  if (isError || !manga) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 text-center text-[#555]">
        <p className="text-xl mb-4">Không tìm thấy truyện</p>
        <Link to="/manga" className="text-[#366ad3] hover:underline">Quay lại danh sách</Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(manga.id);
  const firstChapter = manga.chapters[0];
  const latestChapter = manga.chapters[manga.chapters.length - 1];

  const statusStyle = {
    Ongoing: 'border-green-500 text-green-400',
    Completed: 'border-blue-500 text-blue-400',
    'Coming Soon': 'border-yellow-500 text-yellow-400',
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-[#1d1b26] rounded-lg overflow-hidden mb-6">
        {/* Banner placeholder */}
        <div className="relative h-40 sm:h-56 bg-[#111]">
          <img
            src={manga.cover}
            alt=""
            className="w-full h-full object-cover opacity-20 blur-sm scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1b26] to-transparent" />
        </div>

        {/* Info */}
        <div className="px-4 sm:px-6 pb-6 -mt-16 relative flex flex-col sm:flex-row gap-4">
          <img
            src={manga.cover}
            alt={manga.title}
            className="w-44 sm:w-52 aspect-[2/3] object-cover rounded-lg shadow-2xl shrink-0 border-2 border-[#333] mx-auto sm:mx-0"
            loading="lazy"
          />

          <div className="flex-1 pt-2 sm:pt-16">
            <h1 className="text-[#ddd] font-bold text-xl sm:text-2xl mb-0.5">{manga.title}</h1>

            {manga.originName.length > 0 && (
              <p className="text-[#666] text-sm mb-2 italic">{manga.originName.join(' / ')}</p>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-3">
              {manga.type && (
                <span className="bg-[#366ad3] text-white text-xs px-2 py-0.5 rounded">{manga.type}</span>
              )}
              {manga.status && (
                <span className={`text-xs px-2 py-0.5 rounded border ${statusStyle[manga.status] ?? 'border-[#555] text-[#888]'}`}>
                  {manga.status}
                </span>
              )}
            </div>

            {manga.author?.length > 0 && (
              <div className="flex items-center gap-1.5 text-[#888] text-sm mb-2">
                <FaUser size={11} />
                <span>{manga.author.join(', ')}</span>
              </div>
            )}

            {manga.genreCategories?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                <FaTag size={11} className="text-[#555] mt-1 shrink-0" />
                {manga.genreCategories.map((g) => (
                  <Link
                    key={g.slug}
                    to={`/the-loai/${g.slug}`}
                    className="text-xs text-[#888] bg-[#222] hover:bg-[#366ad3] hover:text-white px-2 py-0.5 rounded border border-[#333] hover:border-[#366ad3] transition-colors"
                  >
                    {g.name}
                  </Link>
                ))}
              </div>
            )}

            {manga.description && (
              <div
                className="text-[#888] text-sm leading-relaxed mb-4 line-clamp-4 sm:line-clamp-none prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: manga.description }}
              />
            )}

            <div className="flex gap-2 flex-wrap">
              {firstChapter && (
                <Link
                  to={`/manga/${slug}/chapter/${firstChapter.chapterId}`}
                  className="flex items-center gap-2 bg-[#366ad3] hover:bg-[#2856b8] text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  <FaBook size={12} /> Đọc từ đầu
                </Link>
              )}
              {latestChapter && latestChapter.chapterId !== firstChapter?.chapterId && (
                <Link
                  to={`/manga/${slug}/chapter/${latestChapter.chapterId}`}
                  className="flex items-center gap-2 bg-[#222] hover:bg-[#333] text-[#ddd] px-4 py-2 rounded text-sm font-medium border border-[#333] transition-colors"
                >
                  <FaBook size={12} /> Đọc mới nhất
                </Link>
              )}
              <button
                onClick={() => toggle(manga)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border transition-colors ${
                  bookmarked
                    ? 'bg-[#366ad3] border-[#366ad3] text-white'
                    : 'bg-transparent border-[#333] text-[#888] hover:border-[#366ad3] hover:text-[#366ad3]'
                }`}
              >
                {bookmarked ? <FaBookmark size={12} /> : <FaRegBookmark size={12} />}
                {bookmarked ? 'Đã lưu' : 'Lưu truyện'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter list */}
      <div className="bg-[#1d1b26] rounded-lg p-4 sm:p-6">
        <h2 className="text-[#ddd] font-semibold text-base mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#366ad3] rounded-full block" />
          Danh sách chapter ({manga.chapters.length})
        </h2>

        <div className="divide-y divide-[#222] max-h-[500px] overflow-y-auto">
          {manga.chapters.map((ch, i) => (
            <Link
              key={i}
              to={`/manga/${slug}/chapter/${ch.chapterId}`}
              className="flex items-center justify-between py-2.5 text-sm text-[#888] hover:text-[#366ad3] transition-colors group"
            >
              <span className="group-hover:text-[#366ad3] transition-colors">{ch.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
