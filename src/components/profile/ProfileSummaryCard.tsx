import { User, Calendar, Clock } from 'lucide-react';
import { UserProfile } from '@/types/profile';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProfileSummaryCardProps {
  profile: UserProfile;
}

export function ProfileSummaryCard({ profile }: ProfileSummaryCardProps) {
  return (
    <div className="bg-academy-bg-card border-2 border-academy-border rounded-[24px] p-8 lg:sticky lg:top-24 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-academy-primary/10 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative space-y-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-academy-bg-mid border-2 border-academy-primary rounded-[20px] flex items-center justify-center text-academy-primary shadow-inner">
            <User size={40} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-academy-text-muted mb-1">Profil Actuel</h3>
            <div className="inline-block px-4 py-1.5 bg-academy-primary/20 text-academy-primary-light text-xs font-black rounded-pill border border-academy-primary/30">
              {profile.profileBadge}
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-6 border-t border-academy-border/50">
          <div className="flex items-start space-x-4">
            <div className="mt-1 p-2 bg-academy-bg-mid rounded-lg text-academy-text-muted">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-academy-text-muted uppercase tracking-wider">Créé le</p>
              <p className="text-academy-text-primary font-medium">12 Avril 2024</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="mt-1 p-2 bg-academy-bg-mid rounded-lg text-academy-text-muted">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-academy-text-muted uppercase tracking-wider">Dernière mise à jour</p>
              <p className="text-academy-text-primary font-medium">
                {formatDistanceToNow(new Date(profile.updatedAt), { addSuffix: true, locale: fr })}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-academy-bg-mid/50 rounded-2xl border border-academy-border/30">
          <p className="text-xs text-academy-text-muted leading-relaxed italic">
            "Le profil entrepreneurial est évolutif. Mettez le à jour dès que votre situation change pour affiner vos recommandations."
          </p>
        </div>
      </div>
    </div>
  );
}
