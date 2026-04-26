import { useState, useEffect } from 'react';
import { Sprout, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Formations', href: '#formations' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Analyse IA', to: '/ia-analyse' },
    { name: 'Communauté', href: '#communaute' },
    { name: 'Impact', href: '#impact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-white/90 backdrop-blur-md py-3 shadow-lg border-b border-gray-100" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 transform transition-transform group-hover:rotate-6">
            <Sprout size={24} />
          </div>
          <span className={cn(
            "text-2xl font-black tracking-tight transition-colors",
            scrolled ? "text-brand-primary" : "text-gray-900"
          )}>
            Zenith<span className="text-brand-secondary">Learn</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            link.to ? (
              <Link
                key={link.name}
                to={link.to}
                className={cn(
                  "text-sm font-bold tracking-wide uppercase transition-all hover:text-brand-primary relative group",
                  scrolled ? "text-gray-600" : "text-gray-700"
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-bold tracking-wide uppercase transition-all hover:text-brand-primary relative group",
                  scrolled ? "text-gray-600" : "text-gray-700"
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
              </a>
            )
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/auth?mode=login"
            className={cn(
              "text-sm font-bold uppercase tracking-widest transition-colors hover:text-brand-primary",
              scrolled ? "text-gray-600" : "text-gray-700"
            )}
          >
            Se connecter
          </Link>
          <Link 
            to="/auth?mode=register"
            className="px-6 py-3 bg-brand-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-button hover:bg-brand-primary-hover transition-all shadow-xl shadow-brand-primary/20 hover:-translate-y-0.5 active:scale-95"
          >
            Commencer
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-xl transition-colors",
            scrolled ? "bg-gray-100 text-gray-900" : "bg-white/20 text-gray-900"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 py-8 px-6 space-y-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  className="block text-xl font-bold text-gray-900 border-b border-gray-50 pb-4"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-xl font-bold text-gray-900 border-b border-gray-50 pb-4"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <div className="pt-4 flex flex-col space-y-4">
              <Link
                to="/auth"
                className="text-center py-4 text-gray-900 font-bold border border-gray-200 rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                Se connecter
              </Link>
              <Link 
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="py-5 bg-brand-primary text-center text-white font-black uppercase tracking-widest rounded-xl shadow-lg"
              >
                Commencer gratuitement
              </Link>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
