import { Clock, BookOpen, GraduationCap, Zap } from 'lucide-react';
import { RadioCard } from '@/components/ui/RadioCard';
import { WeeklyHours, EducationLevel } from '@/types/profile';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';

const HOUR_OPTIONS = [
  { id: 'LESS_2H', title: 'Moins de 2h', description: 'Rythme léger', icon: <Clock size={24} /> },
  { id: '2_5H', title: '2h à 5h', description: 'Rythme régulier', icon: <BookOpen size={24} /> },
  { id: '5_10H', title: '5h à 10h', description: 'Rythme soutenu', icon: <GraduationCap size={24} /> },
  { id: 'MORE_10H', title: 'Plus de 10h', description: 'Immersion totale', icon: <Zap size={24} /> },
];

const EDUCATION_OPTIONS = [
  { id: 'PRIMARY', title: 'Primaire / Collège', icon: <BookOpen size={24} /> },
  { id: 'SECONDARY', title: 'Lycée / Bac', icon: <GraduationCap size={24} /> },
  { id: 'UNIVERSITY', title: 'Université (L, M, D)', icon: <Zap size={24} /> },
];

export function Step3Constraints() {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h3 className="text-3xl font-serif-academy font-bold text-academy-text-primary tracking-tight">Organisation</h3>
        <p className="text-academy-text-muted font-medium">Combien de temps peux-tu consacrer à la formation par semaine ?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {HOUR_OPTIONS.map((opt) => (
          <RadioCard
            key={opt.id}
            selected={data.weeklyHours === opt.id}
            onChange={() => updateData({ weeklyHours: opt.id as WeeklyHours })}
            title={opt.title}
            description={opt.description}
            icon={opt.icon}
          />
        ))}
      </div>

      <div className="space-y-6 pt-6">
        <p className="text-academy-text-muted font-medium">Quel est ton niveau de formation général ?</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EDUCATION_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.id}
              selected={data.educationLevel === opt.id}
              onChange={() => updateData({ educationLevel: opt.id as EducationLevel })}
              title={opt.title}
              icon={opt.icon}
              className="p-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
