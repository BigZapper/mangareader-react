import { useQuery } from '@tanstack/react-query';
import { fetchMangaByGenre } from '../services/mangaApi';

export function useMangaByGenre(slug, page) {
  return useQuery({
    queryKey: ['mangaByGenre', slug, page],
    queryFn: () => fetchMangaByGenre(slug, page),
    enabled: !!slug,
  });
}
