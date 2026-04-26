import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { LoginInput, RegisterInput } from '@/validation/authSchema';
import { AuthError, User } from '@/types/auth';
import axios from 'axios';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthSuccess = (user: User, isRegister: boolean = false) => {
    localStorage.setItem('user', JSON.stringify(user));
    
    // Si c'est une inscription, on redirige vers l'onboarding
    if (isRegister) {
      navigate('/onboarding');
    } else {
      navigate('/formations'); // Le point d'entrée central du Dashboard
    }
  };

  const login = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authService.login(data);
      handleAuthSuccess(user, false);
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
      const user = await authService.register(data);
      handleAuthSuccess(user, true);
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

  return { login, register, isLoading, error };
}
