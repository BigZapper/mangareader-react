import { useRef, useEffect } from 'react';

export function useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage) {
  const sentinelRef = useRef(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    isFetchingRef.current = isFetchingNextPage;
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (!hasNextPage) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current) fetchNextPage();
      },
      { rootMargin: '400px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return sentinelRef;
}
