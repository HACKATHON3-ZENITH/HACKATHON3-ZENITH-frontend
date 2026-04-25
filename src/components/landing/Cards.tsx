import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
  delay?: number;
}

export function PillarCard({ icon: Icon, title, text, delay = 0 }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ translateY: -4 }}
      className="p-6 bg-white rounded-[12px] border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="w-12 h-12 bg-brand-primary-light text-brand-primary rounded-full flex items-center justify-center mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-brand-primary mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{text}</p>
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-[12px] hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0 mt-1">
        <Icon className="text-brand-primary" size={24} />
      </div>
      <div>
        <h4 className="text-base font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  city: string;
  text: string;
}

export function TestimonialCard({ name, city, text }: TestimonialCardProps) {
  return (
    <div className="p-8 bg-white rounded-[12px] border border-gray-200 shadow-sm relative">
      <div className="mb-6 flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-brand-secondary">★</span>
        ))}
      </div>
      <p className="text-gray-900 font-medium italic mb-6 leading-relaxed">
        "{text}"
      </p>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{city}</p>
        </div>
      </div>
    </div>
  );
}
