import { useQuery } from '@tanstack/react-query';
import { fetchSearchResults } from '../services/mangaApi';

export function useSearchMangas(keyword, page) {
  return useQuery({
    queryKey: ['search', keyword, page],
    queryFn: () => fetchSearchResults(keyword, page),
    enabled: keyword.trim().length >= 2,
    staleTime: 2 * 60 * 1000,
  });
}
