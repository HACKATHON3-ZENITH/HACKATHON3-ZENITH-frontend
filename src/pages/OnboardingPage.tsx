/**
 * TWIST 05 — Les données collectées à l'onboarding alimentent la
 * segmentation explicite en deux profils : entrepreneur_actif (~20%)
 * et explorateur (~80%). Les recommandations diffèrent selon le segment.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { WizardProgress } from '@/components/onboarding/WizardProgress';
import { Step1Situation } from '@/components/onboarding/Step1Situation';
import { Step2Goal } from '@/components/onboarding/Step2Goal';
import { Step3Constraints } from '@/components/onboarding/Step3Constraints';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { profileService } from '@/services/profileService';
import { OnboardingData } from '@/types/profile';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Illustration import (using provided plant)
import plantIllustration from '@/assets/images/illustrations/growth-plant.png';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { currentStep, nextStep, prevStep, data, reset } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/formations');
        reset();
      }, 2500);
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-white flex flex-col lg:flex-row font-sans-academy">
      {/* Left Column - Fixed Info */}
      <div className="lg:w-[40%] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 relative p-12 lg:p-24 flex flex-col justify-between items-center lg:items-start lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden order-2 lg:order-1">
        <div className="space-y-8 max-w-sm text-center lg:text-left">
          <motion.img 
            src={plantIllustration} 
            alt="Onboarding" 
            className="w-48 lg:w-64 mx-auto lg:mx-0 filter drop-shadow-[0_20px_50px_rgba(26,127,55,0.2)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">Façonnons votre parcours</h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Répondez à quelques questions pour que Zenith Learn puisse vous recommander les formations les plus adaptées à <span className="text-brand-primary font-black uppercase tracking-wider">votre projet</span>.
            </p>
          </div>
        </div>

        <div className="pt-12 w-full">
          <WizardProgress currentStep={currentStep} totalSteps={3} />
          <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-gray-400 text-center lg:text-left">Étape {currentStep} sur 3</p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent -z-10" />
      </div>

      {/* Right Column - Steps */}
      <div className="lg:w-[60%] p-8 lg:p-24 flex flex-col order-1 lg:order-2">
        <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-4 animate-bounce">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Profil configuré avec succès !</h3>
                <p className="text-gray-500 text-lg">Préparation de votre espace d'apprentissage...</p>
                <Loader2 className="animate-spin text-brand-primary mt-8" size={32} />
              </motion.div>
            ) : (
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
            )}
          </AnimatePresence>

          {!isSuccess && (
          <div className="flex items-center justify-between pt-12 border-t border-gray-200 dark:border-gray-800 mt-12 mb-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                "flex items-center space-x-2 px-6 py-4 rounded-xl font-bold transition-all",
                currentStep === 1 ? "opacity-0 pointer-events-none" : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <ArrowLeft size={20} />
              <span>Précédent</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid() || isSubmitting}
              className={cn(
                "flex items-center space-x-3 px-10 py-4 rounded-xl font-black uppercase tracking-widest transition-all",
                isStepValid() 
                  ? "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/30 hover:-translate-y-1" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50 border border-gray-300 dark:border-gray-700"
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
          )}
        </div>
      </div>
    </div>
  );
}

