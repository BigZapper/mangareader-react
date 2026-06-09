import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMangaList } from '../services/mangaApi';

export function useInfiniteMangaList(type = 'truyen-moi', { enabled = true } = {}) {
  return useInfiniteQuery({
    queryKey: ['mangaList-infinite', type],
    queryFn: ({ pageParam }) => fetchMangaList(type, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const next = allPages.length + 1;
      return next <= lastPage.totalPages ? next : undefined;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
