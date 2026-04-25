import { Sprout, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-primary rounded-button flex items-center justify-center text-white">
                <Sprout size={20} />
              </div>
              <span className="text-xl font-bold text-brand-primary">Zenith Learn</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Former la prochaine génération d'entrepreneurs africains par la connaissance éthique et le mentorat.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-brand-primary hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-brand-primary hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-brand-primary hover:text-white transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Produit</h4>
            <ul className="space-y-4">
              {['Fonctionnalités', 'Tarifs', 'Entreprise', 'Roadmap'].map((item) => (
                <li key={item}>
                  <Link to="/auth?mode=register" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Ressources</h4>
            <ul className="space-y-4">
              {['Blog', 'Aide', 'API', 'Docs'].map((item) => (
                <li key={item}>
                  <Link to="/auth?mode=register" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Légal</h4>
            <ul className="space-y-4">
              {['Mentions légales', 'Confidentialité', 'CGU', 'Cookies'].map((item) => (
                <li key={item}>
                  <Link to="/auth?mode=register" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {currentYear} Zenith Learn — De l'Afrique au monde</p>
          <p className="mt-4 md:mt-0">Fait avec ❤️ pour les bâtisseurs de demain.</p>
        </div>
      </div>
    </footer>
  );
}
