import { useQuery } from '@tanstack/react-query';
import { fetchMangaList } from '../services/mangaApi';

export function useMangaList(type, page) {
  return useQuery({
    queryKey: ['mangaList', type, page],
    queryFn: () => fetchMangaList(type, page),
    staleTime: 5 * 60 * 1000,
  });
}
