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
        "bg-academy-bg-card/50 backdrop-blur-sm",
        selected 
          ? "border-academy-primary bg-academy-primary/10 ring-2 ring-academy-primary/20" 
          : "border-academy-border hover:border-academy-primary/50 hover:bg-academy-primary/5",
        className
      )}
    >
      {icon && <div className={cn("p-3 rounded-full", selected ? "bg-academy-primary text-white" : "bg-academy-bg-mid text-academy-text-muted")}>
        {icon}
      </div>}
      <div>
        <h4 className={cn("font-bold text-lg", selected ? "text-academy-text-primary" : "text-academy-text-muted")}>
          {title}
        </h4>
        {description && (
          <p className="text-xs text-academy-text-muted font-medium leading-relaxed mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
