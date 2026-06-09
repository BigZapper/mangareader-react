import { useQuery } from '@tanstack/react-query';
import { fetchChapterImages } from '../services/mangaApi';

export function useChapterImages(chapterId) {
  return useQuery({
    queryKey: ['chapter', chapterId],
    queryFn: () => fetchChapterImages(chapterId),
    enabled: !!chapterId,
    staleTime: 30 * 60 * 1000,
  });
}
