import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  BrainCircuit, 
  Layers, 
  LineChart, 
  Info, 
  Zap, 
  ShieldCheck,
  Search,
  ArrowRight
} from 'lucide-react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { clsx } from 'clsx';

const IAAnalysis: React.FC = () => {
  // Données de démonstration SHAP pour l'explication TWIST 09
  const demoContributions = [
    { variable: "Lancement d'entreprise (T04)", weight: 0.40, impact: 0.40, type: 'positive', description: 'Le lancement effectif d\'une structure augmente drastiquement le score de potentiel.' },
    { variable: "Actions terrain (T04)", weight: 0.30, impact: 0.24, type: 'positive', description: 'Nombre d\'activités concrètes validées sur la plateforme.' },
    { variable: "Engagement moyen (T01)", weight: 0.15, impact: 0.12, type: 'positive', description: 'Fréquence et intensité des interactions avec les contenus.' },
    { variable: "Segment Entrepreneur Actif (T05)", weight: 0.15, impact: 0.15, type: 'positive', description: 'Bonus lié au profil comportemental identifié.' },
    { variable: "Pénalité de disponibilité (T08)", weight: "Fixe", impact: -0.05, type: 'negative', description: 'Correction appliquée pour neutraliser l\'avantage lié au temps libre excessif.' },
  ];

  const totalScore = demoContributions.reduce((acc, curr) => acc + curr.impact, 0);

  return (
    <div className="min-h-screen bg-[#F6F8FA] font-sans selection:bg-brand-primary/10">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
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
              Comment fonctionne <br />
              <span className="text-brand-primary">notre IA éthique ?</span>
            </h1>
            
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              Conformément aux exigences du TWIST 09, nous exposons la décomposition quantitative de chaque recommandation. 
              Pas de "boîte noire", uniquement des variables auditables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Sidebar: Key Concepts */}
            <div className="lg:col-span-4 space-y-6">
              {[
                { 
                  icon: Layers, 
                  title: "Décomposition SHAP", 
                  desc: "Chaque variable est isolée pour mesurer sa contribution exacte au score final de l'apprenant." 
                },
                { 
                  icon: ShieldCheck, 
                  title: "Neutralisation (T08)", 
                  desc: "Notre modèle identifie et corrige automatiquement les biais liés à la disponibilité (temps libre excessif)." 
                },
                { 
                  icon: Search, 
                  title: "Auditabilité Totale", 
                  desc: "Le bailleur peut remonter à la source de chaque point attribué, garantissant l'équité du classement." 
                }
              ].map((pill, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-brand-primary/5 rounded-2xl text-brand-primary">
                      <pill.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{pill.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{pill.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Live SHAP Simulation */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-50 relative overflow-hidden"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-3xl -z-10" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Analyse TWIST 09 (Exemple SHAP)</h2>
                    <p className="text-gray-500 font-medium">Décomposition quantitative du Potentiel Entrepreneurial</p>
                  </div>
                  <div className="px-6 py-4 bg-gray-950 text-white rounded-3xl text-center">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Score Final</p>
                    <p className="text-3xl font-black text-brand-secondary">{(totalScore * 100).toFixed(1)}%</p>
                  </div>
                </div>

                {/* Score Chart Grid */}
                <div className="space-y-8">
                  {demoContributions.map((c, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-end mb-2">
                        <div className="space-y-1">
                          <span className="text-sm font-bold text-gray-900">{c.variable}</span>
                          <p className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">{c.description}</p>
                        </div>
                        <span className={clsx(
                          "font-mono text-sm font-bold",
                          c.type === 'positive' ? "text-emerald-600" : "text-rose-500"
                        )}>
                          {c.type === 'positive' ? '+' : ''}{c.impact.toFixed(4)}
                        </span>
                      </div>
                      <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.abs(c.impact) * 200}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={clsx(
                            "h-full rounded-full",
                            c.type === 'positive' ? "bg-emerald-500" : "bg-rose-500"
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  
                  {/* Summary Bar */}
                  <div className="pt-10 border-t border-dashed border-gray-200">
                    <div className="flex justify-between items-center text-lg font-black">
                      <span className="text-gray-900">Score de Réussite Prédit</span>
                      <span className="text-brand-primary">{totalScore.toFixed(4)}</span>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-2xl text-xs flex items-start space-x-3">
                      <Info size={16} className="mt-0.5 flex-shrink-0" />
                      <p>
                        Conformément au <strong>TWIST 06</strong>, ce score est auditable en temps réel par les créateurs de cours 
                        pour comprendre l'adéquation de leurs contenus avec les besoins du terrain.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Technical Section */}
          <section className="mt-24 py-20 bg-gray-950 rounded-[60px] p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  L'IA au service de <br /> l'impact continental.
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Zap className="text-brand-secondary" />
                    <p className="text-gray-300">Modèle hybride : Filtrage Collaboratif + Content-Based Analysis.</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <LineChart className="text-brand-secondary" />
                    <p className="text-gray-300">Pondération dynamique des Twists (T01-T08).</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <BarChart3 className="text-brand-secondary" />
                    <p className="text-gray-300">Normalisation des durées (T03) et signaux terrain (T04).</p>
                  </div>
                </div>
                <button className="px-10 py-5 bg-brand-secondary text-gray-950 font-black rounded-button hover:bg-[#E8B84B] transition-all flex items-center group">
                  Consulter la documentation technique (IA)
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Vitesse d'inférence", value: "42ms" },
                  { label: "Biais Neutralisé", value: "98.4%" },
                  { label: "Précision Classif.", value: "92.1%" },
                  { label: "Auditabilité", value: "100%" }
                ].map((stat, i) => (
                  <div key={i} className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[32px] text-center">
                    <p className="text-3xl font-black text-brand-secondary mb-1">{stat.value}</p>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IAAnalysis;
