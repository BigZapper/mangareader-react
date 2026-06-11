import { useCallback } from 'react';

const KEY = 'readingProgress';

function getAll() {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}'); } catch { return {}; }
}

export function useReadingProgress() {
  const setProgress = useCallback((slug, { chapterId, chapterTitle }) => {
    const all = getAll();
    all[slug] = { chapterId, chapterTitle, readAt: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(all));
  }, []);

  const getProgress = useCallback((slug) => {
    return getAll()[slug] ?? null;
  }, []);

  return { setProgress, getProgress };
}
