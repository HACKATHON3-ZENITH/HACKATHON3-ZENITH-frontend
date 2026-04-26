import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link, useNavigate, Navigate } from 'react-router-dom';
import { Sprout, BarChart3, Users, Settings, Moon, Sun, UserCircle, BookOpen } from 'lucide-react';
import LandingPage from './components/landing/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import { cn } from './lib/utils';
import Catalogue from './pages/Catalogue/Catalogue';
import CourseDetail from './pages/CourseDetail/CourseDetail';
import LessonReader from './pages/LessonReader/LessonReader';
import CreatorDashboard from './pages/Creator/CreatorDashboard';
import CourseCard from './components/CourseCard/CourseCard';
import CourseGrid from './components/CourseGrid/CourseGrid';
import { useCourses } from './hooks/useCourses';
import { Loader2 } from 'lucide-react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-pill hover:bg-gray-100 dark:hover:bg-gray-800 transition-base text-gray-600 dark:text-gray-400"
      title="Basculer le thème"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

function MyFormations() {
  const [activeTab, setActiveTab] = useState('learning');
  const { data: courses, isLoading } = useCourses({});
  const navigate = useNavigate();

  const enrolledCourses = courses?.filter((c: any) => c.isEnrolled) || [];
  const learningCourses = enrolledCourses.filter((c: any) => (c.userCompletionRate || 0) < 100);
  const completedCourses = enrolledCourses.filter((c: any) => (c.userCompletionRate || 0) === 100);

  const displayedCourses = activeTab === 'learning' ? learningCourses : completedCourses;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mes Formations</h1>
          <p className="text-gray-500 mt-2">Poursuivez votre apprentissage là où vous l'avez laissé.</p>
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
        </div>
      </header>

      {/* NetAcad Style Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('learning')}
            className={cn(
              "py-4 px-1 border-b-4 font-bold text-sm transition-colors",
              activeTab === 'learning'
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            )}
          >
            EN COURS ({learningCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={cn(
              "py-4 px-1 border-b-4 font-bold text-sm transition-colors",
              activeTab === 'completed'
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            )}
          >
            TERMINÉ ({completedCourses.length})
          </button>
        </nav>
      </div>

      <>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="animate-spin text-brand-primary mb-4" size={40} />
            <p className="text-gray-500">Chargement de vos formations...</p>
          </div>
        ) : displayedCourses.length > 0 ? (
          <CourseGrid>
            {displayedCourses.map((course: any) => (
              <CourseCard 
                key={course.id} 
                {...course} 
                variant="default"
                onClick={() => navigate(`/cours/${course.slug}`)}
              />
            ))}
          </CourseGrid>
        ) : (
          <div className="p-12 text-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500">
              {activeTab === 'learning' 
                ? "Vous n'avez aucun cours en cours d'apprentissage." 
                : "Vous n'avez pas encore terminé de cours."}
            </p>
          </div>
        )}
      </>
    </div>
  );
}

function App() {
  const location = useLocation();
  const path = location.pathname;
  
  const isLandingPage = path === '/';
  const isAuthPage = path === '/auth';
  const isOnboardingPage = path === '/onboarding';
  const isLessonReader = path.includes('/lecture');
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isCreator = user?.role === 'CREATOR' || user?.role === 'ADMIN';

  // Landing, Auth, Onboarding and Lesson Reader are immersive (no sidebar)
  if (isLandingPage || isAuthPage || isOnboardingPage || isLessonReader) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/cours/:slug/lecture/:leconId" element={<LessonReader />} />
        <Route path="/cours/:slug/lecture" element={<LessonReader />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg-page)] font-sans-academy">
      {/* Sidebar Mockup */}
      <aside className="w-64 bg-[var(--bg-surface)] border-r border-gray-200 dark:border-gray-800 py-6 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center space-x-2 px-6 mb-10">
          <div className="w-8 h-8 bg-brand-primary rounded-button flex items-center justify-center text-white">
            <Sprout size={20} />
          </div>
          <span className="text-xl font-bold text-brand-primary">Zenith Learn</span>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Menu Principal</p>
          {[
            { to: '/formations', icon: BookOpen, label: 'Mes formations' },
            { to: '/catalogue', icon: Sprout, label: 'Catalogue' },
            { to: '/profil', icon: UserCircle, label: 'Mon profil' },
            { to: '/settings', icon: Settings, label: 'Paramètres' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center space-x-3 px-6 py-3 transition-all font-bold border-l-4",
                path === link.to 
                  ? "bg-brand-primary/10 text-brand-primary border-brand-primary" 
                  : "border-transparent text-gray-500 hover:bg-gray-100 hover:text-brand-primary dark:hover:bg-gray-800"
              )}
            >
              <link.icon size={20} />
              <span>{link.label}</span>
            </Link>
          ))}

          {isCreator && (
            <div className="mt-8">
              <p className="px-6 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Espace Créateur</p>
              {[
                { to: '/creator/dashboard', icon: BarChart3, label: 'Dashboard' },
                { to: '/creator/new-course', icon: Plus, label: 'Nouveau cours' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center space-x-3 px-6 py-3 transition-all font-bold border-l-4",
                    path.startsWith(link.to)
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500" 
                      : "border-transparent text-gray-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:text-emerald-600"
                  )}
                >
                  <link.icon size={20} />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>

        <div className="px-6 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
             <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-emerald-400 flex items-center justify-center text-white font-bold">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.firstName} {user?.lastName}</p>
                  <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
                </div>
             </div>
             <button 
              onClick={() => { localStorage.removeItem('user'); window.location.href = '/auth'; }}
              className="w-full py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
             >
               Déconnexion
             </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-[#0B0F19]">
        <Routes>
          <Route path="/" element={<Navigate to="/formations" replace />} />
          <Route path="/formations" element={<MyFormations />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/cours/:slug" element={<CourseDetail />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/creator/dashboard" element={<CreatorDashboard />} />
          <Route path="/creator/new-course" element={<div className="p-12 text-center">Formulaire de création de cours (Bientôt)</div>} />
          <Route path="*" element={<Navigate to="/formations" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
