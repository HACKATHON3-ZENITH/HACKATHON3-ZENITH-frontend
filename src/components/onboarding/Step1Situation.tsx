import { Rocket, Lightbulb, TrendingUp, Building2 } from 'lucide-react';
import { RadioCard } from '@/components/ui/RadioCard';
import { ExperienceLevel, Sector } from '@/types/profile';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';

const EXPERIENCE_OPTIONS = [
  { id: 'NONE', title: 'Aucune expérience', description: 'Je démarre de zéro', icon: <Rocket size={24} /> },
  { id: 'IDEA', title: "J'ai une idée", description: 'Pas encore lancé', icon: <Lightbulb size={24} /> },
  { id: 'UNDER_2_YEARS', title: 'Moins de 2 ans', description: 'Entreprise jeune', icon: <TrendingUp size={24} /> },
  { id: 'OVER_2_YEARS', title: 'Plus de 2 ans', description: 'Entreprise établie', icon: <Building2 size={24} /> },
];

const SECTORS: { id: Sector; name: string }[] = [
  { id: 'AGRICULTURE', name: 'Agriculture / Agroalimentaire' },
  { id: 'COMMERCE', name: 'Commerce / Distribution' },
  { id: 'TECH', name: 'Tech / Numérique' },
  { id: 'SERVICES', name: 'Services / Conseil' },
  { id: 'ARTISANAT', name: 'Artisanat / Manufacture' },
  { id: 'HEALTH', name: 'Santé / Bien-être' },
  { id: 'EDUCATION', name: 'Éducation / Formation' },
  { id: 'OTHER', name: 'Autre' },
];

export function Step1Situation() {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Parlons de vous</h3>
        <p className="text-gray-500 font-medium">Quel est ton niveau d'expérience entrepreneuriale ?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {EXPERIENCE_OPTIONS.map((opt) => (
          <RadioCard
            key={opt.id}
            selected={data.experienceLevel === opt.id}
            onChange={() => updateData({ experienceLevel: opt.id as ExperienceLevel })}
            title={opt.title}
            description={opt.description}
            icon={opt.icon}
          />
        ))}
      </div>

      <div className="space-y-6 pt-6">
        <label className="block text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">
          Secteur d'activité cible
        </label>
        <select
          value={data.sector || ''}
          onChange={(e) => updateData({ sector: e.target.value as Sector })}
          className="w-full h-14 px-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-primary focus:ring-0 outline-none transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled>Sélectionner un secteur</option>
          {SECTORS.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
