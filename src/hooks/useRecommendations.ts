import { useQuery } from '@tanstack/react-query';
import mlApi from '@/lib/mlApi';

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
      const res = await mlApi.get(`/recommendations/${userId}`);
      return res.data;
    },
    enabled: !!userId,
  });
};
