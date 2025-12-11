import React from 'react';
import { Shield, FileText, ChevronLeft } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[#0a0f1c] border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500 relative">
        
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
           <div className="flex items-center gap-2">
             <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
               <ChevronLeft size={20} />
             </button>
             <h2 className="text-lg font-display font-bold text-white tracking-wide">ABOUT</h2>
           </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center text-center space-y-6">
           
           {/* Logo */}
           <div className="relative w-20 h-20 flex items-center justify-center mb-2">
             <div className="absolute inset-0 bg-[var(--theme-primary)] opacity-20 blur-xl rounded-full animate-pulse"></div>
             <Shield size={64} className="text-[var(--theme-primary)] relative z-10" />
           </div>

           <div>
             <h1 className="text-2xl font-display font-bold text-white mb-1">M Ai VPN</h1>
             <p className="text-sm text-slate-500 font-mono">v3.1.0 (Build 9124)</p>
           </div>

           <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
             A futuristic, AI-powered VPN interface featuring 3D holographic visualizations, real-time security diagnostics, and a cinematic neon aesthetic.
           </p>

           <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-4"></div>

           <div className="w-full space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-slate-900/40 border border-white/5 rounded-xl hover:bg-slate-800/60 hover:border-[var(--theme-primary)]/30 transition-all group">
                 <div className="flex items-center gap-3">
                    <FileText size={18} className="text-slate-400 group-hover:text-[var(--theme-primary)]" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">Terms of Service</span>
                 </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-slate-900/40 border border-white/5 rounded-xl hover:bg-slate-800/60 hover:border-[var(--theme-primary)]/30 transition-all group">
                 <div className="flex items-center gap-3">
                    <Shield size={18} className="text-slate-400 group-hover:text-[var(--theme-primary)]" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">Privacy Policy</span>
                 </div>
              </button>
           </div>

           <div className="pt-6 text-[10px] text-slate-600">
              © 2025 M Ai Technologies. All rights reserved.
           </div>

        </div>
      </div>
    </div>
  );
};

export default AboutModal;