import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  BrainCircuit, 
  Layers, 
  Info, 
  Zap, 
  ShieldCheck,
  Search,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  ChevronRight,
  Activity
} from 'lucide-react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { clsx } from 'clsx';

// ── MOCK DATA (10 COURSES) ──────────────────────────────────────────
const MOCK_COURSES = [
  { id: 'c1', title: 'AgriTech : Moderniser l\'irrigation au Sahel', categoryName: 'Agriculture', level: 'Intermédiaire', duration: 12 },
  { id: 'c2', title: 'Fintech : Fondamentaux du Mobile Money', categoryName: 'Finance', level: 'Débutant', duration: 8 },
  { id: 'c3', title: 'Solaire : Installation de kits domestiques', categoryName: 'Énergie', level: 'Avancé', duration: 25 },
  { id: 'c4', title: 'E-commerce : Logistique du dernier kilomètre', categoryName: 'Business', level: 'Intermédiaire', duration: 15 },
  { id: 'c5', title: 'Cultures Maraîchères : Cycle de la Tomate', categoryName: 'Agriculture', level: 'Débutant', duration: 10 },
  { id: 'c6', title: 'Python pour l\'Analyse de Données Agricoles', categoryName: 'Tech', level: 'Avancé', duration: 30 },
  { id: 'c7', title: 'Gestion d\'une Coopérative Agricole', categoryName: 'Business', level: 'Intermédiaire', duration: 20 },
  { id: 'c8', title: 'Marketing Digital pour PME Africaines', categoryName: 'Marketing', level: 'Débutant', duration: 12 },
  { id: 'c9', title: 'Élevage Volaille : Biosécurité et Rendement', categoryName: 'Élevage', level: 'Intermédiaire', duration: 18 },
  { id: 'c10', title: 'Blockchain : Traçabilité des Chaînes de Valeur', categoryName: 'Tech', level: 'Avancé', duration: 22 },
];

const MOCK_INSIGHTS: Record<string, any> = {
  'c1': {
    global_relevance_score: 0.88,
    positive_factors: ["Forte demande sur le segment Sahel", "Engagement élevé des entrepreneurs ruraux", "Validation terrain (T04) importante"],
    negative_factors: ["Coût d'investissement initial élevé", "Niveau technique requis important"],
    shap_data: [92, 88, 75, 90]
  },
  'c2': {
    global_relevance_score: 0.95,
    positive_factors: ["Taux de complétion record (T03)", "Popularité virale", "Facilité d'accès"],
    negative_factors: ["Forte concurrence sur le sujet"],
    shap_data: [98, 45, 95, 92]
  },
  'c3': {
    global_relevance_score: 0.72,
    positive_factors: ["Impact environnemental immédiat", "Certifiant"],
    negative_factors: ["Durée trop longue (T03)", "Déséquilibre théorie/pratique"],
    shap_data: [65, 80, 35, 78]
  },
  'c4': {
    global_relevance_score: 0.81,
    positive_factors: ["Répond à un besoin logistique critique", "Partenariats locaux"],
    negative_factors: ["Complexité administrative"],
    shap_data: [82, 77, 60, 85]
  },
  'c5': {
    global_relevance_score: 0.90,
    positive_factors: ["Extrêmement débutant-friendly", "Résultats rapides"],
    negative_factors: ["Saisonnalité des données"],
    shap_data: [95, 40, 98, 90]
  }
};

// Default generic insight for others
const DEFAULT_INSIGHT = {
  global_relevance_score: 0.75,
  positive_factors: ["Thématique porteuse", "Qualité pédagogique"],
  negative_factors: ["Manque de données historiques"],
  shap_data: [70, 60, 50, 65]
};

const IAAnalysis: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const selectedCourse = useMemo(() => 
    MOCK_COURSES.find(c => c.id === selectedCourseId)
  , [selectedCourseId]);

  const insights = useMemo(() => 
    selectedCourseId ? (MOCK_INSIGHTS[selectedCourseId] || DEFAULT_INSIGHT) : null
  , [selectedCourseId]);

  return (
    <div className="min-h-screen bg-[#F6F8FA] font-sans selection:bg-brand-primary/10">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-primary/10 rounded-full border border-brand-primary/20"
            >
              <BrainCircuit className="text-brand-primary" size={20} />
              <span className="text-sm font-bold text-brand-primary uppercase tracking-widest">Transparence Algorithmique</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              Explorateur de <span className="text-brand-primary">Confiance IA</span>
            </h1>
            
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              Consultez les critères de recommandation de chaque cours (MOCKED). 
              Comprenez pourquoi notre modèle valorise certains parcours plutôt que d'autres.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 1. Sidebar: Course Selection */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Filtrer les cours..." 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredCourses.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">Aucun cours trouvé</p>
                  ) : (
                    filteredCourses.map((course: any) => (
                      <button
                        key={course.id}
                        onClick={() => setSelectedCourseId(course.id)}
                        className={clsx(
                          "w-full text-left p-4 rounded-2xl transition-all group border-2",
                          selectedCourseId === course.id 
                            ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20" 
                            : "bg-white text-gray-900 border-transparent hover:border-gray-100 hover:bg-gray-50"
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1 min-w-0">
                            <p className={clsx(
                              "font-bold truncate",
                              selectedCourseId === course.id ? "text-white" : "text-gray-900"
                            )}>{course.title}</p>
                            <p className={clsx(
                              "text-xs mt-0.5",
                              selectedCourseId === course.id ? "text-white/70" : "text-gray-400"
                            )}>{course.categoryName}</p>
                          </div>
                          <ChevronRight className={clsx(
                            "transition-transform",
                            selectedCourseId === course.id ? "translate-x-1" : "group-hover:translate-x-1"
                          )} size={18} />
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Bias Notice */}
              <div className="p-6 bg-brand-primary/5 rounded-3xl border border-brand-primary/10">
                <div className="flex items-center space-x-3 mb-3">
                  <ShieldCheck className="text-brand-primary" size={20} />
                  <h4 className="font-bold text-gray-900">Équité & Fiabilité (T08/T10)</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  Notre algorithme neutralise les biais de disponibilité et évalue la fiabilité des actions auto-déclarées (TWIST 10).
                </p>
                <div className="flex items-center space-x-2 text-[10px] font-black text-brand-primary uppercase tracking-widest">
                   <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                   <span>Audit de confiance actif</span>
                </div>
              </div>
            </div>

            {/* 2. Main Area: Analysis */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {!selectedCourseId ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[40px] border border-dashed border-gray-200"
                  >
                    <div className="p-6 bg-gray-50 rounded-full mb-6">
                      <Target className="text-gray-300" size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Sélectionnez un cours</h3>
                    <p className="text-gray-500 max-w-sm">
                      Choisissez un cours dans la liste de gauche pour découvrir comment notre moteur de recommandation l'analyse.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selectedCourseId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Insights Card */}
                    <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 blur-3xl -z-10" />
                      
                      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                        <div>
                          <p className="text-brand-primary font-black uppercase tracking-widest text-xs mb-2">Analyse modèle (Mode Mock) — Twist 06</p>
                          <h2 className="text-3xl font-black text-gray-900 mb-2">{selectedCourse?.title}</h2>
                          <div className="flex flex-wrap gap-2">
                             <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500">{selectedCourse?.categoryName}</span>
                             <span className="px-3 py-1 bg-brand-primary/10 rounded-full text-xs font-bold text-brand-primary uppercase">Score {insights?.global_relevance_score?.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-950 text-white rounded-3xl flex items-center space-x-3">
                           <Activity className="text-brand-secondary" />
                           <div>
                              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Confiance IA</p>
                              <p className="text-xl font-bold">{(insights?.global_relevance_score * 100).toFixed(1)}%</p>
                           </div>
                        </div>
                      </div>

                      {/* Positive/Negative Factors */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-emerald-600 uppercase tracking-widest flex items-center">
                             <Sparkles className="mr-2" size={16} /> Facteurs Favorables
                          </h4>
                          <ul className="space-y-3">
                            {insights?.positive_factors?.map((f: string, i: number) => (
                              <li key={i} className="flex items-start space-x-3 text-sm font-medium text-gray-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest flex items-center">
                             <TrendingUp className="mr-2 rotate-180" size={16} /> Points d'Amélioration
                          </h4>
                          <ul className="space-y-3">
                             {insights?.negative_factors?.map((f: string, i: number) => (
                              <li key={i} className="flex items-start space-x-3 text-sm font-medium text-gray-700 bg-rose-50/50 p-3 rounded-xl border border-rose-100/50">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* SHAP Chart Simulation */}
                      <div className="space-y-6 pt-8 border-t border-gray-100">
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Décomposition de la Résonance (Quantitative)</h4>
                        <div className="space-y-6">
                           {[
                             { label: "Adéquation Segment", val: insights?.shap_data[0] || 70, color: "bg-brand-primary" },
                             { label: "Signal Actions Terrain", val: insights?.shap_data[1] || 60, color: "bg-emerald-500" },
                             { label: "Complexité vs Niveau", val: insights?.shap_data[2] || 50, color: "bg-amber-500" },
                             { label: "Score de Rétention", val: insights?.shap_data[3] || 65, color: "bg-brand-secondary" }
                           ].map((bar, i) => (
                             <div key={i}>
                                <div className="flex justify-between text-xs font-bold mb-2">
                                  <span className="text-gray-500">{bar.label}</span>
                                  <span className="text-gray-900">{bar.val}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                                   <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${bar.val}%` }}
                                      transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                                      className={clsx("h-full rounded-full", bar.color)}
                                    />
                                </div>
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="mt-12 p-6 bg-blue-50 rounded-3xl flex items-start space-x-4 border border-blue-100">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                           <Info size={20} />
                        </div>
                        <div className="space-y-1">
                           <h5 className="font-bold text-blue-900">Note Technique (Auditeur)</h5>
                           <p className="text-xs text-blue-700 leading-relaxed">
                              Ce score est calculé en temps réel en agrégeant les signaux du <strong>TWIST 01</strong> (Engagement/Complétion) 
                              et du <strong>TWIST 04</strong> (Impact terrain). L'analyse ci-dessus utilise une décomposition SHAP pour 
                              expliquer la différence entre ce cours et la moyenne de la plateforme.
                           </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IAAnalysis;
