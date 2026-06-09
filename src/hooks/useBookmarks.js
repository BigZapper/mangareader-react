import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mr_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mr_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggle = (manga) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === manga.id);
      return exists ? prev.filter(b => b.id !== manga.id) : [...prev, manga];
    });
  };

  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  return { bookmarks, toggle, isBookmarked };
}
