import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const headers = () => ({
  'Content-Type': 'application/json',
  ...(localStorage.getItem('token')
    ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
    : {})
});

export const useLessonProgress = (lessonId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { positionSeconds?: number; isCompleted?: boolean }) => {
      const response = await axios.put(`${API_BASE}/enrollments/lessons/${lessonId}/progress`, data, {
        headers: headers()
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
      queryClient.invalidateQueries({ queryKey: ['course'] });
    }
  });
};
