import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSearchResults } from '../services/mangaApi';

export function useInfiniteSearchMangas(keyword) {
  return useInfiniteQuery({
    queryKey: ['search', keyword],
    queryFn: ({ pageParam }) => fetchSearchResults(keyword, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const next = allPages.length + 1;
      return next <= lastPage.totalPages ? next : undefined;
    },
    enabled: true,
    staleTime: 2 * 60 * 1000,
  });
}
