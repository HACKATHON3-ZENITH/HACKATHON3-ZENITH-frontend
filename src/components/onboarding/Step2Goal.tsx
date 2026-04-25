import { Target, FileText, Users, DollarSign, Users2, Laptop, MoreHorizontal } from 'lucide-react';
import { RadioCard } from '@/components/ui/RadioCard';
import { MainGoal } from '@/types/profile';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';

const GOAL_OPTIONS = [
  { id: 'VALIDATE_IDEA', title: "Valider mon idée", icon: <Target size={24} /> },
  { id: 'BUSINESS_PLAN', title: "Rédiger mon business plan", icon: <FileText size={24} /> },
  { id: 'FIRST_CLIENTS', title: "Trouver mes premiers clients", icon: <Users size={24} /> },
  { id: 'FUNDING', title: "Obtenir un financement", icon: <DollarSign size={24} /> },
  { id: 'TEAM', title: "Gérer mon équipe", icon: <Users2 size={24} /> },
  { id: 'DIGITALIZE', title: "Digitaliser mon activité", icon: <Laptop size={24} /> },
  { id: 'OTHER', title: "Autre", icon: <MoreHorizontal size={24} /> },
];

export function Step2Goal() {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h3 className="text-3xl font-serif-academy font-bold text-academy-text-primary tracking-tight">Votre cap</h3>
        <p className="text-academy-text-muted font-medium">Que veux-tu accomplir dans les 6 prochains mois ?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GOAL_OPTIONS.map((opt) => (
          <RadioCard
            key={opt.id}
            selected={data.mainGoal === opt.id}
            onChange={() => updateData({ mainGoal: opt.id as MainGoal })}
            title={opt.title}
            icon={opt.icon}
            className="flex-row items-center space-y-0 space-x-4 text-left p-4 h-full"
          />
        ))}
      </div>

      {data.mainGoal === 'OTHER' && (
        <div className="space-y-4 pt-4">
          <label className="block text-sm font-black uppercase tracking-widest text-academy-text-primary">
            Précisez votre objectif
          </label>
          <textarea
            value={data.otherGoal || ''}
            onChange={(e) => updateData({ otherGoal: e.target.value })}
            placeholder="Ex: Lancer une boutique en ligne d'artisanat local..."
            className="w-full min-h-[120px] p-6 bg-academy-bg-card border-2 border-academy-border rounded-xl text-academy-text-primary focus:border-academy-primary focus:ring-0 outline-none transition-all resize-none"
          />
        </div>
      )}
    </div>
  );
}
