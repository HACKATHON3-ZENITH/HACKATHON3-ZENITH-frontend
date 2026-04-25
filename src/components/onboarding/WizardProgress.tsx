import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
  return (
    <div className="flex items-center space-x-4">
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const step = idx + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                isCompleted 
                  ? "bg-academy-primary border-academy-primary text-white shadow-lg shadow-academy-primary/20" 
                  : isActive
                    ? "bg-academy-bg-mid border-academy-primary text-academy-primary ring-4 ring-academy-primary/10"
                    : "bg-academy-bg-mid border-academy-border text-academy-text-muted opacity-50"
              )}
            >
              {isCompleted ? <Check size={20} /> : <span className="font-bold text-sm">{step}</span>}
            </div>
            {step < totalSteps && (
              <div 
                className={cn(
                  "w-12 h-0.5 mx-2",
                  isCompleted ? "bg-academy-primary" : "bg-academy-border"
                )} 
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
