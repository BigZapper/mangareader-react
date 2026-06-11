import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  FaArrowLeft, FaArrowRight, FaHome, FaChevronDown, FaTimes,
  FaSpinner, FaExpand, FaCompress, FaCog,
} from 'react-icons/fa';
import { useChapterImages } from '../hooks/useChapterImages';
import { useMangaDetail } from '../hooks/useMangaDetail';
import { useHistory } from '../hooks/useHistory';
import { useReadingProgress } from '../hooks/useReadingProgress';


// Build pairs for two-page mode; wide pages (landscape) are shown solo
function makePairs(images, japanese, widePages) {
  const pairs = [];
  let i = 0;
  while (i < images.length) {
    const cur = images[i];
    if (widePages.has(cur.page)) {
      pairs.push([cur]);
      i++;
    } else {
      const next = images[i + 1];
      if (next && !widePages.has(next.page)) {
        pairs.push(japanese ? [next, cur] : [cur, next]);
        i += 2;
      } else {
        pairs.push([cur]);
        i++;
      }
    }
  }
  return pairs;
}

export default function ChapterReader() {
  const { slug, chapterId } = useParams();
  const navigate = useNavigate();
  const { addToHistory } = useHistory();
  const { setProgress } = useReadingProgress();

  const { data: manga } = useMangaDetail(slug);
  const { data: chapter, isLoading, isError } = useChapterImages(chapterId);

  const [currentPage, setCurrentPage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [barsVisible, setBarsVisible] = useState(true);
  const [chapterDropOpen, setChapterDropOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [twoPage, setTwoPage] = useState(false);
  const [japaneseRead, setJapaneseRead] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [widePages, setWidePages] = useState(new Set());

  const lastScrollY = useRef(0);
  const imgRefs = useRef([]);
  const dropRef = useRef(null);
  const activeChapterRef = useRef(null);

  const chapters = manga?.chapters ?? [];
  const currentIdx = chapters.findIndex((ch) => ch.chapterId === chapterId);
  const prevChapter = currentIdx > 0 ? chapters[currentIdx - 1] : null;
  const nextChapter = currentIdx < chapters.length - 1 ? chapters[currentIdx + 1] : null;
  const currentChapterInfo = chapters[currentIdx];

  // Save to history
  useEffect(() => {
    if (manga) addToHistory(manga);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manga?.id]);

  // Save reading progress
  useEffect(() => {
    if (!chapter) return;
    const title = currentChapterInfo?.title ?? `Chapter ${chapter.chapterName}`;
    setProgress(slug, { chapterId, chapterTitle: title });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, chapter?.chapterName]);

  // Reset on chapter change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentPage(1);
    setScrollProgress(0);
    setBarsVisible(true);
    setWidePages(new Set());
  }, [chapterId]);

  const handleImgLoad = (e, page) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth > naturalHeight) {
      setWidePages((prev) => {
        if (prev.has(page)) return prev;
        const next = new Set(prev);
        next.add(page);
        return next;
      });
    }
  };

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min(100, (y / docH) * 100) : 0);

      if (y > lastScrollY.current + 8) setBarsVisible(false);
      else if (y < lastScrollY.current - 8 || y < 80) setBarsVisible(true);
      lastScrollY.current = y;

      const center = y + window.innerHeight / 2;
      const imgs = imgRefs.current.filter(Boolean);
      if (!imgs.length) return;
      let minDist = Infinity, closestPage = 1;
      imgs.forEach((img) => {
        const dist = Math.abs(img.offsetTop + img.offsetHeight / 2 - center);
        if (dist < minDist) { minDist = dist; closestPage = Number(img.dataset.page ?? 1); }
      });
      setCurrentPage(closestPage);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft' && prevChapter) {
        navigate(`/manga/${slug}/chapter/${prevChapter.chapterId}`);
      } else if (e.key === 'ArrowRight' && nextChapter) {
        navigate(`/manga/${slug}/chapter/${nextChapter.chapterId}`);
      } else if (e.key === 'Escape') {
        setChapterDropOpen(false);
        setSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prevChapter, nextChapter, slug, navigate]);

  // Close chapter dropdown on outside click
  useEffect(() => {
    if (!chapterDropOpen) return;
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setChapterDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [chapterDropOpen]);

  // Scroll active chapter into view when dropdown opens
  useEffect(() => {
    if (chapterDropOpen && activeChapterRef.current) {
      activeChapterRef.current.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }, [chapterDropOpen]);

  // Track fullscreen state
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const toggleTwoPage = () => {
    setTwoPage((v) => {
      if (v) setJapaneseRead(false);
      return !v;
    });
  };

  const totalPages = chapter?.images?.length ?? 0;
  const chapterTitle = currentChapterInfo?.title ?? (chapter ? `Chapter ${chapter.chapterName}` : '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <div className="text-center text-[#888]">
          <FaSpinner className="animate-spin mx-auto mb-3" size={24} />
          <p className="text-sm">Đang tải chapter...</p>
        </div>
      </div>
    );
  }

  if (isError || !chapter) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center text-center px-4">
        <div>
          <p className="text-[#888] text-lg mb-4">Không thể tải chapter</p>
          <Link to={`/manga/${slug}`} className="text-[#366ad3] hover:underline text-sm">
            ← Quay lại trang truyện
          </Link>
        </div>
      </div>
    );
  }

  const imagePairs = twoPage ? makePairs(chapter.images, japaneseRead, widePages) : null;

  return (
    <div className="min-h-screen bg-[#111]">
      {/* ── Top bar ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-[#1d1b26]/95 backdrop-blur-sm border-b border-[#2a2a3a] transition-transform duration-200 ${
          barsVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Reading progress bar */}
        <div className="h-0.5 bg-[#2a2a3a]">
          <div className="h-full bg-[#366ad3] transition-[width] duration-100" style={{ width: `${scrollProgress}%` }} />
        </div>

        {/* Main bar row */}
        <div className="max-w-3xl mx-auto px-3 h-11 flex items-center gap-3">
          <Link
            to={`/manga/${slug}`}
            className="text-[#666] hover:text-[#ddd] transition-colors shrink-0 p-1"
            title="Về trang truyện"
          >
            <FaHome size={15} />
          </Link>

          <div className="flex-1 min-w-0 text-center">
            <p className="text-[#555] text-[11px] truncate leading-none mb-0.5">{manga?.title}</p>
            <p className="text-[#ccc] text-xs font-medium truncate leading-none">{chapterTitle}</p>
          </div>

          <span className="text-[#555] text-[11px] shrink-0 tabular-nums font-mono">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setSettingsOpen((o) => !o)}
            className={`shrink-0 p-1 transition-colors ${settingsOpen ? 'text-[#366ad3]' : 'text-[#666] hover:text-[#ddd]'}`}
            title="Tùy chọn đọc"
          >
            <FaCog size={14} />
          </button>
        </div>

        {/* Settings panel */}
        {settingsOpen && (
          <div className="border-t border-[#2a2a3a] px-4 py-2.5">
            <div className="max-w-3xl mx-auto flex flex-wrap items-center gap-x-4 gap-y-2">


              {/* Two page */}
              <button
                onClick={toggleTwoPage}
                className={`text-[10px] px-2.5 py-0.5 rounded transition-colors ${
                  twoPage ? 'bg-[#366ad3] text-white' : 'bg-[#2a2a3a] text-[#777] hover:text-[#ddd]'
                }`}
              >
                2 trang
              </button>

              {/* Japanese reading */}
              <button
                disabled={!twoPage}
                onClick={() => setJapaneseRead((v) => !v)}
                title={!twoPage ? 'Bật 2 trang trước' : ''}
                className={`text-[10px] px-2.5 py-0.5 rounded transition-colors ${
                  !twoPage
                    ? 'opacity-30 cursor-not-allowed bg-[#2a2a3a] text-[#777]'
                    : japaneseRead
                    ? 'bg-[#366ad3] text-white'
                    : 'bg-[#2a2a3a] text-[#777] hover:text-[#ddd]'
                }`}
              >
                Japanese
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className={`flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded transition-colors ${
                  isFullscreen ? 'bg-[#366ad3] text-white' : 'bg-[#2a2a3a] text-[#777] hover:text-[#ddd]'
                }`}
              >
                {isFullscreen ? <FaCompress size={9} /> : <FaExpand size={9} />}
                Fullscreen
              </button>

            </div>
          </div>
        )}
      </div>

      {/* ── Reading area ── */}
      <div
        className="pt-12 pb-16 cursor-pointer select-none"
        onClick={() => setBarsVisible((v) => !v)}
      >
        <div className={twoPage ? 'max-w-6xl mx-auto' : 'max-w-3xl mx-auto'}>
          {twoPage ? (
            imagePairs.map((pair, pairIdx) => (
              <div key={pairIdx} className="flex mb-3">
                {pair.map((img, imgIdx) => {
                  const paired = pair.length === 2;
                  const isLeft  = paired && imgIdx === 0;
                  const isRight = paired && imgIdx === 1;
                  return (
                    <div
                      key={img.page}
                      className="relative"
                      style={{ width: paired ? '50%' : '100%' }}
                    >
                      <img
                        ref={(el) => { imgRefs.current[img.page - 1] = el; }}
                        data-page={img.page}
                        src={img.url}
                        alt={`Trang ${img.page}`}
                        style={{ width: '100%', display: 'block' }}
                        loading={pairIdx < 2 ? 'eager' : 'lazy'}
                        draggable={false}
                        onLoad={(e) => handleImgLoad(e, img.page)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {/* Spine shadow */}
                      {isLeft && (
                        <div
                          className="absolute inset-y-0 right-0 w-6 pointer-events-none"
                          style={{ background: 'linear-gradient(to right, transparent, rgba(0, 0, 0, 0.62))' }}
                        />
                      )}
                      {isRight && (
                        <div
                          className="absolute inset-y-0 left-0 w-6 pointer-events-none"
                          style={{ background: 'linear-gradient(to left, transparent, rgba(0, 0, 0, 0.65))' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            chapter.images.map((img, idx) => (
              <img
                key={idx}
                ref={(el) => { imgRefs.current[img.page - 1] = el; }}
                data-page={img.page}
                src={img.url}
                alt={`Trang ${img.page}`}
                style={{ width: '100%', display: 'block' }}
                loading={idx < 3 ? 'eager' : 'lazy'}
                draggable={false}
                onClick={(e) => e.stopPropagation()}
              />
            ))
          )}
        </div>

        {/* End-of-chapter nav */}
        <div className="max-w-3xl mx-auto text-center py-12">
          <p className="text-[#444] text-sm mb-6">— Hết chapter —</p>
          <div className="flex items-center justify-center gap-3">
            {prevChapter && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/manga/${slug}/chapter/${prevChapter.chapterId}`); }}
                className="flex items-center gap-2 bg-[#1d1b26] hover:bg-[#2a2a3a] text-[#888] hover:text-[#ddd] px-4 py-2 rounded text-sm border border-[#333] transition-colors"
              >
                <FaArrowLeft size={11} /> Chapter trước
              </button>
            )}
            {nextChapter && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/manga/${slug}/chapter/${nextChapter.chapterId}`); }}
                className="flex items-center gap-2 bg-[#366ad3] hover:bg-[#2856b8] text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Chapter tiếp <FaArrowRight size={11} />
              </button>
            )}
            {!prevChapter && !nextChapter && (
              <Link
                to={`/manga/${slug}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 bg-[#1d1b26] hover:bg-[#2a2a3a] text-[#888] hover:text-[#ddd] px-4 py-2 rounded text-sm border border-[#333] transition-colors"
              >
                <FaHome size={11} /> Về trang truyện
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom navigation bar ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#1d1b26]/95 backdrop-blur-sm border-t border-[#2a2a3a] transition-transform duration-200 ${
          barsVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-3xl mx-auto px-3 h-12 flex items-center justify-between gap-2">
          {/* Prev chapter */}
          <button
            onClick={() => prevChapter && navigate(`/manga/${slug}/chapter/${prevChapter.chapterId}`)}
            disabled={!prevChapter}
            className="flex items-center gap-1.5 text-xs text-[#777] hover:text-[#ddd] disabled:opacity-25 disabled:cursor-not-allowed transition-colors px-2 py-1 shrink-0"
            title="Chapter trước (←)"
          >
            <FaArrowLeft size={11} /> Trước
          </button>

          {/* Chapter selector */}
          <div className="relative flex-1 flex justify-center" ref={dropRef}>
            <button
              onClick={() => setChapterDropOpen((o) => !o)}
              className="flex items-center gap-1.5 text-xs text-[#ccc] bg-[#2a2a3a] hover:bg-[#363648] px-3 py-1.5 rounded border border-[#333] transition-colors max-w-[200px] w-full justify-between"
            >
              <span className="truncate">{chapterTitle}</span>
              <FaChevronDown size={9} className={`shrink-0 transition-transform ${chapterDropOpen ? 'rotate-180' : ''}`} />
            </button>

            {chapterDropOpen && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-60 bg-[#1d1b26] border border-[#333] rounded-lg shadow-2xl max-h-72 flex flex-col">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2a3a] shrink-0">
                  <span className="text-[#666] text-xs">Chọn chapter</span>
                  <button onClick={() => setChapterDropOpen(false)} className="text-[#555] hover:text-[#888] transition-colors">
                    <FaTimes size={11} />
                  </button>
                </div>
                <div className="overflow-y-auto">
                  {chapters.map((ch) => (
                    <button
                      key={ch.chapterId}
                      ref={ch.chapterId === chapterId ? activeChapterRef : null}
                      onClick={() => { navigate(`/manga/${slug}/chapter/${ch.chapterId}`); setChapterDropOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs border-b border-[#222] last:border-0 transition-colors ${
                        ch.chapterId === chapterId
                          ? 'text-[#366ad3] bg-[#366ad3]/10 font-medium'
                          : 'text-[#777] hover:text-[#ddd] hover:bg-[#2a2a3a]'
                      }`}
                    >
                      {ch.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Next chapter */}
          <button
            onClick={() => nextChapter && navigate(`/manga/${slug}/chapter/${nextChapter.chapterId}`)}
            disabled={!nextChapter}
            className="flex items-center gap-1.5 text-xs text-[#777] hover:text-[#ddd] disabled:opacity-25 disabled:cursor-not-allowed transition-colors px-2 py-1 shrink-0"
            title="Chapter tiếp (→)"
          >
            Tiếp <FaArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}
