export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'LEARNER' | 'CREATOR' | 'ADMIN';
}

export interface AuthResponse {
  user: User;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: any;
  timestamp: string;
}
