import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export const useRecommendations = () => {
  const userStr = localStorage.getItem('user');
  let userId = null;
  try {
    if (userStr) {
      userId = JSON.parse(userStr).id;
    }
  } catch(e) {}

  return useQuery({
    queryKey: ['recommendations', userId],
    queryFn: async () => {
      if (!userId) return null;
      const res = await api.get(`/rankings/recommendations/${userId}`);
      return res.data.data;
    },
    enabled: !!userId,
  });
};
