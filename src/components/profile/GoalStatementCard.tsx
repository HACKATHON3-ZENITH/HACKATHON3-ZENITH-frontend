import { Target, Edit3 } from 'lucide-react';

interface GoalStatementCardProps {
  goalStatement: string;
  onEdit: () => void;
}

export function GoalStatementCard({ goalStatement, onEdit }: GoalStatementCardProps) {
  return (
    <div className="bg-academy-bg-card border-2 border-brand-secondary/30 rounded-[24px] p-8 shadow-2xl relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-secondary/5 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-all group-hover:bg-brand-secondary/10" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        <div className="flex items-start md:items-center space-x-6">
          <div className="p-5 bg-brand-secondary/20 text-brand-secondary rounded-[20px] shadow-lg shadow-brand-secondary/10">
            <Target size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-brand-secondary">Mon objectif déclaré</h3>
            <p className="text-2xl md:text-3xl font-serif-academy font-bold text-academy-text-primary leading-[1.1] max-w-2xl">
              {goalStatement || "Définissez votre premier objectif commercial pour orienter vos recommandations."}
            </p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="flex items-center space-x-2 px-6 py-3 bg-academy-bg-mid hover:bg-academy-bg-card border-2 border-academy-border hover:border-brand-secondary rounded-xl text-academy-text-muted hover:text-brand-secondary transition-all font-bold w-fit"
        >
          <Edit3 size={18} />
          <span>Modifier mon cap</span>
        </button>
      </div>
    </div>
  );
}
