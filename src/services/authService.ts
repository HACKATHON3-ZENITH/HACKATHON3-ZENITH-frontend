import api from '@/lib/api';
import { User, ApiResponse } from '@/types/auth';
import { LoginInput, RegisterInput } from '@/validation/authSchema';

export const authService = {
  async login(data: LoginInput): Promise<User> {
    const response = await api.post<ApiResponse<User>>('/auth/login', data);
    return response.data.data;
  },

  async register(data: RegisterInput): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, terms, ...registerData } = data;
    const response = await api.post<ApiResponse<User>>('/auth/register', registerData);
    return response.data.data;
  }
};
