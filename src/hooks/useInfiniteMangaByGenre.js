import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMangaByGenre } from '../services/mangaApi';

export function useInfiniteMangaByGenre(slug) {
  return useInfiniteQuery({
    queryKey: ['mangaByGenre-infinite', slug],
    queryFn: ({ pageParam }) => fetchMangaByGenre(slug, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const next = allPages.length + 1;
      return next <= lastPage.totalPages ? next : undefined;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
