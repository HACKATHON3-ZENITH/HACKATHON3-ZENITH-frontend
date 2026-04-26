import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Shield, 
  Smartphone, 
  ChevronRight, 
  CheckCircle2, 
  Download, 
  Award, 
  UsersRound,
  ArrowRight,
  TrendingUp,
  Globe
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PillarCard, FeatureCard, TestimonialCard } from './Cards';

// Hero Image Import
import heroBanner from '@/assets/images/hero/hero-banner.png';
import plantIllustration from '@/assets/images/illustrations/growth-plant.png';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const plantScale = useTransform(scrollYProgress, [0.3, 0.5], [0.95, 1.05]);
  const plantRotate = useTransform(scrollYProgress, [0.3, 0.5], [-2, 2]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] font-sans overflow-x-hidden selection:bg-brand-primary/10">
      <Navbar />

      {/* 2. Hero Section */}
      <header className="relative pt-32 md:pt-48 pb-24 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary-light/40 via-white to-white -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] -z-10" />
        
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10 lg:col-span-5"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-pill border border-brand-primary/10 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-secondary animate-pulse" />
              <span className="text-xs font-bold text-gray-700 tracking-wider uppercase">L'élite des entrepreneurs africains</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight">
              Bâtissez l'Afrique <br />
              <span className="text-brand-primary relative">
                de demain.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-secondary/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl font-medium">
              L'excellence entrepreneuriale au service de l'impact. Une plateforme guidée par votre vision, propulsée par une expertise locale.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/auth?mode=register" className="px-10 py-5 bg-brand-primary text-white text-center font-bold rounded-button hover:bg-brand-primary-hover transition-all shadow-xl shadow-brand-primary/25 hover:-translate-y-1 active:scale-95">
                Initialiser mon projet
              </Link>
              <a href="#formations" className="px-10 py-5 bg-white text-gray-700 border border-gray-200 font-bold rounded-button hover:bg-gray-50 transition-all hover:border-brand-primary/30 active:scale-95 group flex items-center justify-center">
                Voir l'écosystème 
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-8 pt-4">
              <div className="flex -space-x-4">
                {[
                  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&h=150&q=80",
                  "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=150&h=150&q=80",
                  "https://images.unsplash.com/photo-1523910088395-dce257a4d5bb?auto=format&fit=crop&w=150&h=150&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
                ].map((src, i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-inner font-bold text-white">
                    <img src={src} alt={`Bâtisseur Zenith ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium">
                Rejoint par <span className="text-brand-primary font-bold">12,000+</span> bâtisseurs <br/> à travers le continent.
              </p>
            </motion.div>

          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 2 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:col-span-7 lg:-mr-20"
          >
            <div className="relative z-10 rounded-[32px] overflow-hidden shadow-[0_48px_96px_-24px_rgba(13,92,77,0.3)] border-8 border-white">
              <img src={heroBanner} alt="Zenith Learn Dashboard" className="w-full h-auto object-cover scale-105" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-brand-secondary/10 rounded-full blur-3xl -z-10" />
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-1/4 p-6 bg-white rounded-card shadow-2xl z-20 border border-gray-100 hidden md:block"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-full">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400 tracking-widest">Performance</p>
                  <p className="text-2xl font-black text-gray-900">+124%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </header>

      {/* 3. Section Pourquoi (3 piliers) */}
      <section className="py-32 bg-white" id="formations">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-secondary font-bold tracking-[0.2em] uppercase text-xs"
            >
              L'éthique au cœur
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              L'apprentissage sans compromis.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-2xl mx-auto font-medium"
            >
              Nous avons éradiqué les algorithmes d'addiction pour laisser place à une technologie qui respecte votre temps et vos objectifs.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <PillarCard 
              icon={Target} 
              title="Transparence radicale" 
              text="Votre trajectoire est unique. Nous alignons nos ressources sur vos objectifs concrets, sans distraction publicitaire." 
              delay={0.1}
            />
            <PillarCard 
              icon={Shield} 
              title="Intégrité cognitive" 
              text="Zéro dark patterns. Nous formons des décideurs, pas des utilisateurs captifs. Apprenez ce qui compte, quand cela compte." 
              delay={0.2}
            />
            <PillarCard 
              icon={Globe} 
              title="Ancrage continental" 
              text="Une expertise conçue par et pour l'Afrique. Des solutions de paiement intégrées et un accès bas-débit optimisé." 
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* 4. Section Croissance (Pousse) */}
      <section className="py-32 overflow-hidden bg-[#F6F8FA]" id="expertise">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  De la germination <br /> à l'empire économique.
                </h2>
                <div className="h-1.5 w-24 bg-brand-primary rounded-full" />
              </div>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Le parcours Zenith n'est pas une simple suite de vidéos. C'est un écosystème de croissance structuré pour transformer chaque idée en une valeur marché quantifiable.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Ingénierie de produit', desc: 'Concevoir pour le besoin réel.' },
                  { title: 'Finance stratégique', desc: 'Maîtriser son cash-flow.' },
                  { title: 'Leadership d\'impact', desc: 'Inspirer et bâtir son équipe.' },
                  { title: 'Scale continentale', desc: 'Briser les frontières.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="mt-1 p-1 bg-brand-primary/10 rounded-full text-brand-primary text-xs">
                      <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/auth?mode=register" className="px-10 py-5 bg-white text-gray-700 border-2 border-gray-200 font-bold rounded-button hover:border-brand-primary transition-all group flex items-center w-fit">
                Notre manifeste méthodologique 
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </motion.div>

            <motion.div 
              style={{ scale: plantScale, rotate: plantRotate }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative group">
                <img 
                  src={plantIllustration} 
                  alt="Croissance Zenith" 
                  className="max-w-md md:max-w-lg h-auto relative z-10 transition-transform group-hover:scale-105 duration-700" 
                />
                <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-[100px] -z-10 group-hover:bg-brand-primary/10 transition-colors" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Section Fonctionnalités (Grille 2x2) */}
      <section className="py-20 md:py-32" id="communaute">
        <div className="container mx-auto px-4">
          <div className="bg-gray-950 text-white rounded-[48px] p-8 md:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
              <div className="space-y-8">
                <span className="text-brand-secondary font-bold uppercase tracking-widest text-sm">Arsenaux technologiques</span>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  La tech au service de <br className="hidden md:block"/> l'indépendance.
                </h2>
                <p className="text-xl text-gray-400 font-medium leading-relaxed">
                  Pas de fioritures. Uniquement des outils robustes, pensés pour la réalité du terrain et la performance.
                </p>
                <div className="pt-6">
                  <Link to="/auth?mode=register" className="inline-block px-8 py-4 bg-brand-secondary text-gray-950 font-bold rounded-button hover:bg-[#E8B84B] transition-all hover:-translate-y-1">
                    Activer mon accès Premium
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-10">
                <FeatureCard 
                  icon={TrendingUp} 
                  title="Algorithme Intelligent" 
                  description="Une recommandation qui apprend de vos retours, pas de vos clics compulsifs."
                />
                <FeatureCard 
                  icon={Download} 
                  title="Offline-First" 
                  description="Vidéos et ressources encodées pour l'apprentissage sans connexion."
                />
                <FeatureCard 
                  icon={Award} 
                  title="Certifications d'État" 
                  description="Des diplômes reconnus et valorisés par les recruteurs internationaux."
                />
                <FeatureCard 
                  icon={UsersRound} 
                  title="Cercle de confiance" 
                  description="Accès exclusif à des mentors ayant bâti des licornes en Afrique."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Témoignages */}
      <section className="py-32" id="impact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Voix de la nouvelle économie</h2>
            <p className="text-gray-500 font-medium">Ce n'est pas nous qui le disons, ce sont ceux qui bâtissent.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <TestimonialCard 
              text="Zenith Learn a radicalement changé ma vision du scale. En 6 mois, nous avons étendu nos opérations sur trois nouveaux marchés grâce à leur framework de finance." 
              name="Aïcha Diallo" 
              city="CEO @ TechSud, Dakar" 
            />
            <TestimonialCard 
              text="L'approche éthique n'est pas qu'un mot marketing ici. On sent que la plateforme veut réellement notre succès. J'ai économisé des mois d'erreurs stratégiques." 
              name="Koffi Anan" 
              city="Fondateur @ AgriBox, Abidjan" 
            />
          </div>
        </div>
      </section>

      {/* 7. CTA Final */}
      <section className="pb-32">
        <div className="container mx-auto px-4">
          <div className="bg-brand-primary rounded-[48px] p-12 md:p-32 text-center space-y-10 relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(13,92,77,0.4)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/10 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3" />
            
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            >
              Écrivez votre propre <br className="hidden md:block"/> success story africaine.
            </motion.h2>
            <p className="text-xl text-brand-primary-light/80 max-w-2xl mx-auto font-medium">
              Le futur de l'Afrique appartient à ceux qui maîtrisent le savoir. <br/> Rejoignez l'élite des bâtisseurs continentaux.
            </p>
            
            <div className="pt-6">
              <Link to="/auth?mode=register" className="inline-block px-12 py-6 bg-brand-secondary text-gray-950 text-xl font-black rounded-button hover:bg-[#E8B84B] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 uppercase tracking-widest">
                Rejoindre le mouvement
              </Link>
            </div>
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Satisfait ou remboursé sous 30 jours</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
