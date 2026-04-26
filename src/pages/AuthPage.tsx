import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { TestimonialSide } from '@/components/auth/TestimonialSide';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  
  // Initialize state based on URL param
  const [isLogin, setIsLogin] = useState(mode !== 'register');
  const { login, register, isLoading, error } = useAuth();

  // Sync state if URL changes
  useEffect(() => {
    setIsLogin(mode !== 'register');
  }, [mode]);

  const toggleAuth = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F6F8FA]">
      {/* Left side - Fixed Testimonial */}
      <div className="lg:w-1/2 bg-[#0D5C4D] relative overflow-hidden flex items-center justify-center py-12 lg:py-0 order-2 lg:order-1">
        {/* Subtle background dots/pattern */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} />
        <TestimonialSide />
      </div>

      {/* Right side - Sliding Forms */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 order-1 lg:order-2">
        <div className="w-full max-w-[480px]">
          <div className="bg-white p-8 lg:p-12 rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] relative overflow-hidden min-h-[600px] flex items-center">
            <AnimatePresence mode="wait" initial={false}>
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full"
                >
                  <LoginForm 
                    onSubmit={login} 
                    onToggleRegister={toggleAuth} 
                    isLoading={isLoading} 
                    error={error}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full"
                >
                  <RegisterForm 
                    onSubmit={register} 
                    onToggleLogin={toggleAuth} 
                    isLoading={isLoading} 
                    error={error}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
