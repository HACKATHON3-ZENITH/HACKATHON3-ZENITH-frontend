import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@/validation/authSchema';
import { Loader2, AlertCircle } from 'lucide-react';

interface RegisterFormProps {
  onSubmit: (data: RegisterInput) => void;
  onGoogleLogin: () => void;
  onToggleLogin: () => void;
  isLoading: boolean;
  error: string | null;
}

export function RegisterForm({ onSubmit, onGoogleLogin, onToggleLogin, isLoading, error }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1F2328] mb-2">Créer votre espace Zenith</h2>
        <p className="text-[#57606A]">Gratuit jusqu'à 5 membres. Aucune carte bancaire.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 text-[#CF222E]">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1F2328] mb-1.5">Prénom</label>
            <input
              {...register('firstName')}
              type="text"
              className="w-full h-11 px-4 border border-[#D0D7DE] rounded-lg focus:ring-2 focus:ring-[#0D5C4D] focus:border-transparent outline-none transition-all"
            />
            {errors.firstName && <p className="mt-1 text-xs text-[#CF222E]">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1F2328] mb-1.5">Nom</label>
            <input
              {...register('lastName')}
              type="text"
              className="w-full h-11 px-4 border border-[#D0D7DE] rounded-lg focus:ring-2 focus:ring-[#0D5C4D] focus:border-transparent outline-none transition-all"
            />
            {errors.lastName && <p className="mt-1 text-xs text-[#CF222E]">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1F2328] mb-1.5">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full h-11 px-4 border border-[#D0D7DE] rounded-lg focus:ring-2 focus:ring-[#0D5C4D] focus:border-transparent outline-none transition-all"
          />
          {errors.email && <p className="mt-1 text-xs text-[#CF222E]">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1F2328] mb-1.5">Mot de passe</label>
          <input
            {...register('password')}
            type="password"
            className="w-full h-11 px-4 border border-[#D0D7DE] rounded-lg focus:ring-2 focus:ring-[#0D5C4D] focus:border-transparent outline-none transition-all"
          />
          {errors.password && <p className="mt-1 text-xs text-[#CF222E]">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1F2328] mb-1.5">Confirmer le mot de passe</label>
          <input
            {...register('confirmPassword')}
            type="password"
            className="w-full h-11 px-4 border border-[#D0D7DE] rounded-lg focus:ring-2 focus:ring-[#0D5C4D] focus:border-transparent outline-none transition-all"
          />
          {errors.confirmPassword && <p className="mt-1 text-xs text-[#CF222E]">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-start space-x-2 py-2">
          <input
            {...register('terms')}
            type="checkbox"
            className="mt-1 border-[#D0D7DE] rounded focus:ring-[#0D5C4D]"
          />
          <label className="text-sm text-[#57606A]">
            J'accepte les <a href="#" className="font-bold text-[#0D5C4D] hover:underline">conditions générales</a> et la <a href="#" className="font-bold text-[#0D5C4D] hover:underline">politique de confidentialité</a>
          </label>
        </div>
        {errors.terms && <p className="text-xs text-[#CF222E]">{errors.terms.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#0D5C4D] hover:bg-[#14876E] text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2 mt-4"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <span>Créer mon compte</span>}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#D0D7DE]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-[#57606A] font-bold">OU</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onGoogleLogin}
          className="w-full h-12 border border-[#D0D7DE] hover:bg-[#F6F8FA] text-[#1F2328] font-bold rounded-lg transition-all flex items-center justify-center space-x-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>S'inscrire avec Google</span>
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-[#57606A]">
        Déjà un compte ?{' '}
        <button onClick={onToggleLogin} className="font-bold text-[#0D5C4D] hover:underline">Se connecter</button>
      </p>
    </div>
  );
}
