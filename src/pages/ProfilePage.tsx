import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema, OnboardingInput } from '@/validation/onboardingSchema';
import { profileService } from '@/services/profileService';
import { UserProfile } from '@/types/profile';
import { ProfileSummaryCard } from '@/components/profile/ProfileSummaryCard';
import { GoalStatementCard } from '@/components/profile/GoalStatementCard';
import { Loader2, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile(data);
      reset(data);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (data: OnboardingInput) => {
    setIsSaving(true);
    try {
      const updated = await profileService.updateProfile(data as any);
      setProfile(updated.profile);
      reset(updated.profile);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-academy-bg-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-academy-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-academy-bg-dark text-academy-text-primary p-6 lg:p-12 theme-academy font-sans-academy">
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Goal Section */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GoalStatementCard 
              goalStatement={profile.mainGoal} 
              onEdit={() => {/* Modal logic */}}
            />
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Edit Form */}
          <div className="lg:w-[65%] space-y-12">
            <div className="space-y-4">
              <h1 className="text-5xl font-serif-academy font-bold tracking-tight">Mon profil entrepreneurial</h1>
              <p className="text-xl text-academy-text-muted leading-relaxed">
                Ces informations aident notre algorithme éthique à te recommander les meilleures formations pour ton projet.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest text-academy-text-muted">Niveau d'expérience</label>
                  <select
                    {...register('experienceLevel')}
                    className="w-full h-14 px-6 bg-academy-bg-card border-2 border-academy-border rounded-xl text-academy-text-primary focus:border-academy-primary outline-none transition-all"
                  >
                    <option value="NONE">Aucune expérience</option>
                    <option value="IDEA">J'ai une idée</option>
                    <option value="UNDER_2_YEARS">Moins de 2 ans</option>
                    <option value="OVER_2_YEARS">Plus de 2 ans</option>
                  </select>
                  {errors.experienceLevel && <p className="text-xs text-danger font-bold uppercase tracking-wider">{errors.experienceLevel.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest text-academy-text-muted">Secteur d'activité</label>
                  <select
                    {...register('sector')}
                    className="w-full h-14 px-6 bg-academy-bg-card border-2 border-academy-border rounded-xl text-academy-text-primary focus:border-academy-primary outline-none transition-all"
                  >
                    <option value="AGRICULTURE">Agriculture / Agroalimentaire</option>
                    <option value="COMMERCE">Commerce / Distribution</option>
                    <option value="TECH">Tech / Numérique</option>
                    <option value="SERVICES">Services / Conseil</option>
                    <option value="ARTISANAT">Artisanat / Manufacture</option>
                    <option value="HEALTH">Santé / Bien-être</option>
                    <option value="EDUCATION">Éducation / Formation</option>
                    <option value="OTHER">Autre</option>
                  </select>
                  {errors.sector && <p className="text-xs text-danger font-bold uppercase tracking-wider">{errors.sector.message}</p>}
                </div>

                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-black uppercase tracking-widest text-academy-text-muted">Temps de formation hebdomadaire</label>
                  <select
                    {...register('weeklyHours')}
                    className="w-full h-14 px-6 bg-academy-bg-card border-2 border-academy-border rounded-xl text-academy-text-primary focus:border-academy-primary outline-none transition-all"
                  >
                    <option value="LESS_2H">Moins de 2h</option>
                    <option value="2_5H">2h à 5h</option>
                    <option value="5_10H">5h à 10h</option>
                    <option value="MORE_10H">Plus de 10h</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-8">
                <button
                  type="submit"
                  disabled={!isDirty || isSaving}
                  className="flex items-center space-x-3 px-10 py-5 bg-academy-primary hover:bg-academy-primary-light disabled:bg-academy-bg-card disabled:text-academy-text-muted text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-academy-primary/20"
                >
                  {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                  <span>Enregistrer les modifications</span>
                </button>
                <button
                  type="button"
                  onClick={() => reset(profile || undefined)}
                  className="px-10 py-5 bg-transparent hover:bg-academy-bg-mid text-academy-text-muted hover:text-academy-text-primary font-black uppercase tracking-widest rounded-2xl transition-all"
                >
                  <X size={20} className="inline mr-2" />
                  Annuler
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:w-[35%]">
            {profile && <ProfileSummaryCard profile={profile} />}
          </div>
        </div>
      </div>
    </div>
  );
}
