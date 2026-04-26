import { User, Award, Clock, BookOpen, Medal, Target, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const stats = [
    { label: 'Heures d\'apprentissage', value: '42h', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Cours terminés', value: '3', icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Certificats obtenus', value: '1', icon: Award, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const skills = ['Marketing Digital', 'Business Plan', 'Finance', 'Pitch Deck', 'SEO'];
  
  const badges = [
    { title: 'As du Business Plan', date: 'Oct 2023', icon: Target },
    { title: 'Premier Quiz réussi', date: 'Sept 2023', icon: Medal },
    { title: 'Explorateur', date: 'Août 2023', icon: Map },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mon Profil</h1>
        <Link 
          to="/settings" 
          className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-colors"
        >
          Modifier mon profil
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonne de gauche (Avatar et Infos) */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center shadow-sm flex flex-col items-center">
            <div className="w-32 h-32 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-6 border-[6px] border-white dark:border-gray-800 shadow-xl relative">
              <User size={48} strokeWidth={1.5} />
              <div className="absolute bottom-0 right-0 p-1 bg-brand-primary rounded-full text-white border-2 border-white dark:border-gray-800">
                <Medal size={16} />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Jean Doe</h2>
            <p className="text-brand-primary font-bold text-sm mb-6 uppercase tracking-wider">Apprenti Entrepreneur</p>
            
            <div className="w-full pt-6 border-t border-gray-100 dark:border-gray-800">
              <p className="text-gray-500 text-sm italic mb-6">"Mon objectif est de lancer ma startup de e-commerce d'ici 2024."</p>
              
              <div className="w-full flex flex-wrap justify-center gap-2">
                 {skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-bold rounded-full">
                      {skill}
                    </span>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Colonne de droite (Stats et Réussites) */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                <div className={`p-4 rounded-full ${stat.bg} ${stat.color} mb-4`}>
                  <stat.icon size={28} strokeWidth={1.5} />
                </div>
                <p className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">{stat.value}</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="text-amber-500" />
                Badges & Réussites
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge, i) => (
                <div key={i} className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center gap-4 hover:border-brand-primary transition-colors cursor-default">
                  <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-amber-600 rounded-full shrink-0">
                    <badge.icon size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1">{badge.title}</p>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">{badge.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
