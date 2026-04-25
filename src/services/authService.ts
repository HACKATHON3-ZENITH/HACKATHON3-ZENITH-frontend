import api from '@/lib/api';
import { AuthResponse } from '@/types/auth';
import { LoginInput, RegisterInput } from '@/validation/authSchema';

export const authService = {
  async login(data: LoginInput): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterInput): Promise<AuthResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, terms, ...registerData } = data;
    const response = await api.post<AuthResponse>('/auth/register', registerData);
    return response.data;
  },

  googleLogin(): void {
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/google`;
  },
};
