import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from '../services/mangaApi';

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: 60 * 60 * 1000,
  });
}
