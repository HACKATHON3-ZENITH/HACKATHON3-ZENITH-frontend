import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@/validation/authSchema';
import { Loader2, AlertCircle } from 'lucide-react';

interface RegisterFormProps {
  onSubmit: (data: RegisterInput) => void;
  onToggleLogin: () => void;
  isLoading: boolean;
  error: string | null;
}

export function RegisterForm({ onSubmit, onToggleLogin, isLoading, error }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
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

        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-emerald-900">Devenir Formateur ?</p>
            <p className="text-xs text-emerald-600">Partagez vos connaissances et générez des revenus.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              onChange={(e) => setValue('role', e.target.checked ? 'CREATOR' : 'LEARNER')}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#0D5C4D] hover:bg-[#14876E] text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2 mt-4"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <span>Créer mon compte</span>}
        </button>


      </form>

      <p className="mt-8 text-center text-sm text-[#57606A]">
        Déjà un compte ?{' '}
        <button onClick={onToggleLogin} className="font-bold text-[#0D5C4D] hover:underline">Se connecter</button>
      </p>
    </div>
  );
}
