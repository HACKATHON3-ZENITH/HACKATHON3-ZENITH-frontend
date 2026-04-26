import { useState } from 'react';
import { User, Bell, Shield } from 'lucide-react';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profil Entrepreneurial', icon: User },
    { id: 'account', label: 'Compte & Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const { register, handleSubmit } = useForm();

  const onSubmitProfile = (data: any) => {
    console.log('Profile Settings updated:', data);
    // TODO: Connect to backend
  };

  return (
    <div className="max-w-5xl mx-auto py-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
        <p className="text-gray-500 mt-2">Gérez vos préférences, vos formulaires d'intégration et votre compte.</p>
      </header>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-6">
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors text-left",
                  activeTab === tab.id 
                    ? "bg-brand-primary/10 text-brand-primary" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12">
          {activeTab === 'profile' && (
            <div className="max-w-2xl space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Formulaire d'Intégration</h2>
                <p className="text-gray-500 text-sm mt-1">Modifiez à tout moment ces informations qui aident l'algorithme de recommandation de Zenith Learn.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Niveau d'expérience</label>
                  <select {...register('experienceLevel')} className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:border-brand-primary outline-none">
                    <option value="NONE">Aucune expérience</option>
                    <option value="IDEA">J'ai une idée de projet</option>
                    <option value="UNDER_2_YEARS">Moins de 2 ans</option>
                    <option value="OVER_2_YEARS">Plus de 2 ans</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Secteur d'activité</label>
                  <select {...register('sector')} className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:border-brand-primary outline-none">
                    <option value="TECH">Tech / Numérique</option>
                    <option value="COMMERCE">Commerce / Distribution</option>
                    <option value="AGRICULTURE">Agroalimentaire</option>
                    <option value="SERVICES">Services / B2B</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Temps hebdomadaire alloué (Dédié à la plateforme)</label>
                  <select {...register('weeklyHours')} className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:border-brand-primary outline-none">
                    <option value="LESS_2H">Moins de 2h</option>
                    <option value="2_5H">Entre 2h et 5h / Semaine</option>
                    <option value="5_10H">5h à 10h / Semaine</option>
                    <option value="MORE_10H">Plus de 10h / Semaine</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Objectif à accomplir</label>
                  <textarea 
                    {...register('mainGoal')} 
                    rows={3} 
                    placeholder="Définissez votre but (ex: Lancer mon MVP d'ici décembre)"
                    className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:border-brand-primary outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button type="submit" className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-colors">
                    Sauvegarder le profil
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sécurité du Compte</h2>
                <p className="text-gray-500 text-sm mt-1">Gérez vos identifiants de connexion.</p>
              </div>
              <form className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email actuel</label>
                  <input type="email" disabled value="jean.doe@zenithlearn.com" className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-500 cursor-not-allowed" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Nouveau mot de passe</label>
                  <input type="password" placeholder="••••••••" className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:border-brand-primary outline-none" />
                </div>
                <button type="button" className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-colors">
                  Mettre à jour
                </button>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Préférences de communication</h2>
                <p className="text-gray-500 text-sm mt-1">Choisissez les emails Zenith Learn que vous souhaitez recevoir.</p>
              </div>
              <div className="space-y-4">
                 {[
                   { id: 'n1', title: 'Actualités du catalogue', desc: 'Soyez alerté de l\'ajout de nouveaux contenus.' },
                   { id: 'n2', title: 'Rappels d\'apprentissage', desc: 'Recevez un email quand vous avez un cours inachevé.' },
                   { id: 'n3', title: 'Activité communautaire', desc: 'Alertes lors de réponses sur le forum.' }
                 ].map(n => (
                   <div key={n.id} className="flex items-start gap-4 p-5 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-brand-primary/50 transition-colors">
                      <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 accent-brand-primary border-gray-300 rounded cursor-pointer" />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white mb-1">{n.title}</p>
                        <p className="text-sm text-gray-500">{n.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
