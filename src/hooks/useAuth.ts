import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { LoginInput, RegisterInput } from '@/validation/authSchema';
import { AuthError } from '@/types/auth';
import axios from 'axios';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthSuccess = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    navigate('/dashboard');
  };

  const login = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      handleAuthSuccess(response.accessToken, response.refreshToken);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Identifiants invalides');
      } else {
        setError('Une erreur est survenue lors de la connexion');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      handleAuthSuccess(response.accessToken, response.refreshToken);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Email déjà utilisé');
      } else {
        setError('Une erreur est survenue lors de la création du compte');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = () => {
    authService.googleLogin();
  };

  return { login, register, googleLogin, isLoading, error };
}
