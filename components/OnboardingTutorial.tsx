import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle2, Zap, Shield, MapPin, Settings } from 'lucide-react';

interface TutorialProps {
  isActive: boolean;
  onComplete: () => void;
  refs: {
    connect: React.RefObject<HTMLElement>;
    server: React.RefObject<HTMLElement>;
    ai: React.RefObject<HTMLElement>;
    settings: React.RefObject<HTMLElement>;
  };
}

const OnboardingTutorial: React.FC<TutorialProps> = ({ isActive, onComplete, refs }) => {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  // Steps configuration
  const steps = [
    {
      target: null, // Center initial step
      title: "SYSTEM INITIALIZED",
      desc: "Welcome to M Ai VPN. Let's configure your secure environment.",
      icon: <Zap size={24} className="text-[var(--theme-primary)]" />
    },
    {
      target: refs.server,
      title: "GLOBAL NODES",
      desc: "Tap here to select your encrypted exit node from 50+ locations.",
      icon: <MapPin size={24} className="text-[var(--theme-primary)]" />
    },
    {
      target: refs.ai,
      title: "AI GUARDIAN",
      desc: "Real-time security analysis and protocol diagnostics appear here.",
      icon: <Shield size={24} className="text-[var(--theme-primary)]" />
    },
    {
      target: refs.connect,
      title: "ENGAGE CORE",
      desc: "Tap the power module to establish your secure tunnel instantly.",
      icon: <Zap size={24} className="text-[var(--theme-primary)]" />
    },
    {
      target: refs.settings,
      title: "SYSTEM CONFIG",
      desc: "Access protocol settings, kill switch, and themes here.",
      icon: <Settings size={24} className="text-[var(--theme-primary)]" />
    }
  ];

  const currentStep = steps[step];

  // Update highlight position
  useEffect(() => {
    if (!isActive) return;

    const updateRect = () => {
      if (currentStep.target && currentStep.target.current) {
        setRect(currentStep.target.current.getBoundingClientRect());
      } else {
        setRect(null);
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);
    
    // Small delay to allow layout to settle
    const timer = setTimeout(updateRect, 100);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      clearTimeout(timer);
    };
  }, [step, isActive, currentStep.target]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Dark Overlay with "Hole" */}
      <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-[2px] transition-all duration-500">
        {rect && (
          <div 
            className="absolute transition-all duration-500 ease-out border-2 border-[var(--theme-primary)] rounded-xl shadow-[0_0_50px_var(--theme-glow)] bg-transparent box-content"
            style={{
              top: rect.top - 8,
              left: rect.left - 8,
              width: rect.width + 16,
              height: rect.height + 16,
            }}
          >
             {/* Corner Accents */}
             <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"></div>
             <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Tutorial Card */}
      <div className="absolute inset-0 flex flex-col justify-end pb-32 sm:justify-center items-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm mx-6 bg-[#0a0f1c] border border-[var(--theme-primary)]/30 p-6 rounded-2xl shadow-2xl relative animate-in slide-in-from-bottom-10 fade-in duration-500">
           
           <div className="flex items-start gap-4">
              <div className="p-3 bg-[var(--theme-primary)]/10 rounded-full border border-[var(--theme-primary)]/20 shadow-[0_0_15px_var(--theme-glow)]">
                {currentStep.icon}
              </div>
              <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <h3 className="text-lg font-display font-bold text-white tracking-widest mb-1">
                      {currentStep.title}
                    </h3>
                    <button onClick={handleSkip} className="text-xs text-slate-500 hover:text-white transition-colors">SKIP</button>
                 </div>
                 <p className="text-sm text-slate-300 leading-relaxed mb-6">
                   {currentStep.desc}
                 </p>
                 
                 <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {steps.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-[var(--theme-primary)]' : 'w-1.5 bg-slate-700'}`}
                        />
                      ))}
                    </div>
                    <button 
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-[var(--theme-primary)] text-black px-4 py-2 rounded-lg text-xs font-bold tracking-wider hover:bg-white transition-colors shadow-[0_0_20px_var(--theme-glow)]"
                    >
                      {step === steps.length - 1 ? 'FINISH' : 'NEXT'}
                      {step === steps.length - 1 ? <CheckCircle2 size={14} /> : <ChevronRight size={14} />}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;