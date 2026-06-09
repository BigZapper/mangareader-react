import { useQuery } from '@tanstack/react-query';
import { fetchMangaDetail } from '../services/mangaApi';

export function useMangaDetail(slug) {
  return useQuery({
    queryKey: ['mangaDetail', slug],
    queryFn: () => fetchMangaDetail(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
