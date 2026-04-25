import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { Sprout, BarChart3, Users, Settings, Moon, Sun, UserCircle } from 'lucide-react';
import LandingPage from './components/landing/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import ProfilePage from './pages/ProfilePage';
import { cn } from './lib/utils';

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

function Dashboard() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bienvenue sur Zenith Learn</h1>
          <p className="text-gray-600 dark:text-gray-400">Votre parcours entrepreneurial commence ici.</p>
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <button className="px-4 py-2 bg-brand-primary text-white rounded-button hover:bg-brand-primary-hover transition-base">
            Commencer un cours
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Mes Cours',
            icon: Sprout,
            count: 3,
            color: 'bg-brand-primary-light dark:bg-emerald-950/30 text-brand-primary',
          },
          {
            title: 'Statistiques',
            icon: BarChart3,
            count: '85%',
            color: 'bg-brand-secondary-light dark:bg-amber-950/30 text-brand-secondary',
          },
          {
            title: 'Mentorat',
            icon: Users,
            count: 12,
            color: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-[var(--bg-surface)] rounded-card border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-base"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-pill ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{item.count}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="p-12 text-center rounded-card border-2 border-dashed border-gray-200 dark:border-gray-800">
        <p className="text-gray-500">Flux de recommandation éthique en cours de préparation...</p>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const path = location.pathname;
  
  const isLandingPage = path === '/';
  const isAuthPage = path === '/auth';
  const isOnboardingPage = path === '/onboarding';

  // Landing, Auth, and Onboarding are immersive (no sidebar)
  if (isLandingPage || isAuthPage || isOnboardingPage) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg-page)] font-sans-academy">
      {/* Sidebar Mockup */}
      <aside className="w-64 bg-[var(--bg-surface)] border-r border-gray-200 dark:border-gray-800 p-6 hidden lg:block sticky top-0 h-screen">
        <div className="flex items-center space-x-2 mb-10">
          <div className="w-8 h-8 bg-brand-primary rounded-button flex items-center justify-center text-white">
            <Sprout size={20} />
          </div>
          <span className="text-xl font-bold text-brand-primary">Zenith Learn</span>
        </div>

        <nav className="space-y-1">
          {[
            { to: '/dashboard', icon: BarChart3, label: 'Tableau de bord' },
            { to: '/formations', icon: Sprout, label: 'Mes formations' },
            { to: '/profil', icon: UserCircle, label: 'Mon profil' },
            { to: '/settings', icon: Settings, label: 'Paramètres' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-xl transition-all font-bold",
                path === link.to 
                  ? "bg-brand-primary/10 text-brand-primary" 
                  : "text-gray-500 hover:bg-gray-100 hover:text-brand-primary dark:hover:bg-gray-800"
              )}
            >
              <link.icon size={20} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
