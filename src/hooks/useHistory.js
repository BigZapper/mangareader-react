import { useState, useEffect } from 'react';

export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mr_history') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mr_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (manga) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.id !== manga.id);
      return [manga, ...filtered].slice(0, 20);
    });
  };

  const clearHistory = () => setHistory([]);

  return { history, addToHistory, clearHistory };
}
