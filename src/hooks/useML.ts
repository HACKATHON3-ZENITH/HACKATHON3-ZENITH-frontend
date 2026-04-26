import { useQuery } from '@tanstack/react-query';
import mlApi from '@/lib/mlApi';

export const useCourseInsights = (courseId: string | null) => {
  return useQuery({
    queryKey: ['course-insights', courseId],
    queryFn: async () => {
      if (!courseId) return null;
      const response = await mlApi.get(`/courses/${courseId}/insights`);
      return response.data;
    },
    enabled: !!courseId,
  });
};
