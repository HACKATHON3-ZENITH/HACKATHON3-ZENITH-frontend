import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { WizardProgress } from '@/components/onboarding/WizardProgress';
import { Step1Situation } from '@/components/onboarding/Step1Situation';
import { Step2Goal } from '@/components/onboarding/Step2Goal';
import { Step3Constraints } from '@/components/onboarding/Step3Constraints';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { profileService } from '@/services/profileService';
import { OnboardingData } from '@/types/profile';
import { useState } from 'react';

// Illustration import (using provided plant)
import plantIllustration from '@/assets/images/illustrations/growth-plant.png';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { currentStep, nextStep, prevStep, data, reset } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      nextStep();
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Validate or cleanup data before submission
      await profileService.submitOnboarding(data as OnboardingData);
      navigate('/dashboard');
      reset();
    } catch (error) {
      console.error('Onboarding failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) return !!(data.experienceLevel && data.sector);
    if (currentStep === 2) return !!data.mainGoal;
    if (currentStep === 3) return !!(data.weeklyHours && data.educationLevel);
    return false;
  };

  return (
    <div className="min-h-screen bg-academy-bg-dark text-academy-text-primary flex flex-col lg:flex-row theme-academy font-sans-academy">
      {/* Left Column - Fixed Info */}
      <div className="lg:w-[40%] bg-academy-bg-mid relative p-12 lg:p-24 flex flex-col justify-between items-center lg:items-start lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden order-2 lg:order-1">
        <div className="space-y-8 max-w-sm text-center lg:text-left">
          <motion.img 
            src={plantIllustration} 
            alt="Onboarding" 
            className="w-48 lg:w-64 mx-auto lg:mx-0 filter drop-shadow-[0_20px_50px_rgba(26,107,60,0.4)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-serif-academy font-bold leading-tight">Façonnons votre parcours</h1>
            <p className="text-academy-text-muted text-lg leading-relaxed">
              Répondez à quelques questions pour que Zenith Learn puisse vous recommander les formations les plus adaptées à <span className="text-academy-primary font-bold">VOTRE</span> projet.
            </p>
          </div>
        </div>

        <div className="pt-12">
          <WizardProgress currentStep={currentStep} totalSteps={3} />
          <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-academy-text-muted">Étape {currentStep} sur 3</p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-academy-primary/5 via-transparent to-transparent -z-10" />
      </div>

      {/* Right Column - Steps */}
      <div className="lg:w-[60%] p-8 lg:p-24 flex flex-col order-1 lg:order-2">
        <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              {currentStep === 1 && <Step1Situation />}
              {currentStep === 2 && <Step2Goal />}
              {currentStep === 3 && <Step3Constraints />}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-12 border-t border-academy-border mt-12 mb-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                "flex items-center space-x-2 px-6 py-4 rounded-xl font-bold transition-all",
                currentStep === 1 ? "opacity-0 pointer-events-none" : "text-academy-text-muted hover:text-academy-text-primary hover:bg-academy-bg-mid"
              )}
            >
              <ArrowLeft size={20} />
              <span>Précédent</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid() || isSubmitting}
              className={cn(
                "flex items-center space-x-3 px-10 py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl",
                isStepValid() 
                  ? "bg-academy-primary text-white hover:bg-academy-primary-light shadow-academy-primary/20 hover:-translate-y-1" 
                  : "bg-academy-bg-card text-academy-text-muted cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span>{currentStep === 3 ? "Commencer l'aventure" : "Suivant"}</span>
                  {currentStep < 3 && <ArrowRight size={20} />}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

