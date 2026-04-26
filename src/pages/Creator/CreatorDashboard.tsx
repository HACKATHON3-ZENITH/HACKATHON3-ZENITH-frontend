import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '@/hooks/useCourses';
import { LayoutGrid, Plus, Users, TrendingUp, DollarSign, Edit, MoreVertical, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const CreatorDashboard: React.FC = () => {
  const navigate = useNavigate();
  // We'll filter courses by creator locally for now, 
  // or add a specific hook useCreatorCourses later.
  const { data: courses, isLoading } = useCourses({});
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // Filter courses created by current user
  const myCourses = courses?.filter((c: any) => c.creator?.id === user?.id) || [];

  const stats = [
    { label: 'Cours Actifs', value: myCourses.length, icon: LayoutGrid, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Apprenants', value: '1,280', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Revenus (FCFA)', value: '345,000', icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Progression', value: '+12%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-brand-primary to-emerald-400 bg-clip-text text-transparent italic">
            ESPACE CRÉATEUR
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
            Gérez vos contenus et suivez l'impact de vos formations.
          </p>
        </div>
        <button 
          onClick={() => navigate('/creator/new-course')}
          className="flex items-center space-x-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-brand-primary/20"
        >
          <Plus size={20} />
          <span>Créer un nouveau cours</span>
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-2xl", stat.bg)}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Course List */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold dark:text-white">Mes Formations</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-primary/20 transition-all w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-xs font-bold uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/30">
                <th className="px-6 py-4">Formation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Apprenants</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Chargement de vos cours...
                  </td>
                </tr>
              ) : myCourses.length > 0 ? (
                myCourses.map((course: any) => (
                  <tr key={course.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={course.coverImageUrl} 
                          alt="" 
                          className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform" 
                        />
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{course.title}</p>
                          <p className="text-xs text-gray-400">{course.categoryName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        course.status === 'PUBLISHED' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                      )}>
                        {course.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                      {course.enrolledCount || 0}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      {course.priceXaf ? `${course.priceXaf.toLocaleString()} FCFA` : 'Gratuit'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-brand-primary transition-all">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600 transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                    Vous n'avez pas encore créé de formation.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
