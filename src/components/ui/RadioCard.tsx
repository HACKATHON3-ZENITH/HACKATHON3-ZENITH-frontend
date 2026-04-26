import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RadioCardProps {
  selected: boolean;
  onChange: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function RadioCard({ selected, onChange, icon, title, description, className }: RadioCardProps) {
  return (
    <div
      onClick={onChange}
      className={cn(
        "cursor-pointer p-5 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center space-y-3",
        "bg-white dark:bg-gray-800/50 backdrop-blur-sm",
        selected 
          ? "border-brand-primary bg-brand-primary/10 ring-2 ring-brand-primary/20" 
          : "border-gray-200 dark:border-gray-700 hover:border-brand-primary/50 hover:bg-brand-primary/5",
        className
      )}
    >
      {icon && <div className={cn("p-3 rounded-full", selected ? "bg-brand-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500")}>
        {icon}
      </div>}
      <div>
        <h4 className={cn("font-bold text-lg", selected ? "text-gray-900 dark:text-white" : "text-gray-500")}>
          {title}
        </h4>
        {description && (
          <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
