import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export const useEnrollment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await api.post(`/courses/${courseId}/enroll`, {});
      return response.data.data;
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ['course'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    }
  });
};
