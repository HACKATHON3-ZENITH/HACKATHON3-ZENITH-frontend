import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/validation/authSchema';
import { Loader2, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: LoginInput) => void;
  onToggleRegister: () => void;
  isLoading: boolean;
  error: string | null;
}

export function LoginForm({ onSubmit, onToggleRegister, isLoading, error }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1F2328] mb-2">Bon retour</h2>
        <p className="text-[#57606A]">Ravi de vous revoir.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 text-[#CF222E]">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#1F2328] mb-1.5">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="vous@exemple.com"
            className="w-full h-11 px-4 border border-[#D0D7DE] rounded-lg focus:ring-2 focus:ring-[#0D5C4D] focus:border-transparent outline-none transition-all"
          />
          {errors.email && <p className="mt-1 text-xs text-[#CF222E]">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-semibold text-[#1F2328]">Mot de passe</label>
          </div>
          <input
            {...register('password')}
            type="password"
            className="w-full h-11 px-4 border border-[#D0D7DE] rounded-lg focus:ring-2 focus:ring-[#0D5C4D] focus:border-transparent outline-none transition-all"
          />
          {errors.password && <p className="mt-1 text-xs text-[#CF222E]">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#0D5C4D] hover:bg-[#14876E] text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <span>Se connecter</span>}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-[#57606A]">
        Pas encore de compte ?{' '}
        <button onClick={onToggleRegister} className="font-bold text-[#0D5C4D] hover:underline">Créer un compte</button>
      </p>
    </div>
  );
}
