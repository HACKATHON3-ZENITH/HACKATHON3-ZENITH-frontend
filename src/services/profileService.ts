import api from '@/lib/api';
import { OnboardingData, UserProfile } from '@/types/profile';

export const profileService = {
  async submitOnboarding(data: OnboardingData): Promise<{ profile: UserProfile; message: string }> {
    const response = await api.post('/onboarding', data);
    return response.data;
  },

  async getProfile(): Promise<UserProfile> {
    const response = await api.get('/profile');
    return response.data;
  },

  async updateProfile(data: OnboardingData): Promise<{ profile: UserProfile; message: string }> {
    const response = await api.put('/profile', data);
    return response.data;
  },

  async updateGoal(goalStatement: string): Promise<{ message: string }> {
    const response = await api.put('/goal', { goalStatement });
    return response.data;
  },
};
