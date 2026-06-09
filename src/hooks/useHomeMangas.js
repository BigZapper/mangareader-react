import { useQuery } from '@tanstack/react-query';
import { fetchHomeMangas } from '../services/mangaApi';

export function useHomeMangas() {
  return useQuery({
    queryKey: ['homeMangas'],
    queryFn: fetchHomeMangas,
    staleTime: 5 * 60 * 1000,
  });
}
