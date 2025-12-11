import React, { useState, useEffect } from 'react';
import { X, Lock, RefreshCw, ShieldCheck, Globe, CheckCircle, Search, ArrowRight, Users, Activity, ChevronLeft } from 'lucide-react';
import { ServerLocation } from '../types';

interface SecureBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  server: ServerLocation | null;
  ipAddress: string;
  protocol: string;
}

const SecureBrowser: React.FC<SecureBrowserProps> = ({ isOpen, onClose, server, ipAddress, protocol }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  // Start with a high realistic number for global users
  const [activeUsers, setActiveUsers] = useState(2410893);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setProgress(0);
      
      // Simulate page load
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 500);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Simulate live user count fluctuation
  useEffect(() => {
    const userInterval = setInterval(() => {
      setActiveUsers(prev => {
         // Randomly add or remove a few users to make it look "live"
         const change = Math.floor(Math.random() * 15) - 5;
         return prev + change;
      });
    }, 2500);
    return () => clearInterval(userInterval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0f172a] rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[60vh] md:h-[500px] animate-in slide-in-from-bottom-8 duration-500">
        
        {/* Browser Toolbar */}
        <div className="bg-[#1e293b] p-3 flex items-center gap-4 border-b border-slate-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer" onClick={onClose}></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
             <ChevronLeft size={16} />
          </button>
          
          <div className="flex-1 bg-[#0f172a] rounded-md px-3 py-1.5 flex items-center gap-3 border border-slate-600">
            <Lock size={14} className="text-emerald-400" />
            <span className="text-xs text-emerald-400 font-mono">https://</span>
            <span className="text-xs text-slate-300 font-mono flex-1">check.secure-status.net/verify</span>
            {loading ? (
                <RefreshCw size={12} className="text-slate-500 animate-spin" />
            ) : (
                <ShieldCheck size={14} className="text-emerald-500" />
            )}
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 relative bg-slate-900 overflow-hidden">
           
           {/* Loading Bar */}
           {loading && (
             <div className="absolute top-0 left-0 h-1 bg-emerald-500 transition-all duration-200 z-20" style={{ width: `${progress}%` }}></div>
           )}

           {loading ? (
             <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-16 h-16 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin"></div>
                <div className="text-slate-400 font-mono text-sm animate-pulse">ESTABLISHING SECURE HANDSHAKE...</div>
             </div>
           ) : (
             <div className="p-8 h-full overflow-y-auto">
                <div className="max-w-lg mx-auto text-center">
                   
                   <div className="mb-8 relative inline-block">
                      <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse"></div>
                      <ShieldCheck size={80} className="text-emerald-400 relative z-10 mx-auto" />
                   </div>

                   <h2 className="text-3xl font-display font-bold text-white mb-2">YOU ARE PROTECTED</h2>
                   <p className="text-slate-400 mb-8">Your digital footprint is currently masked by the {protocol} protocol.</p>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                      {/* IP Card */}
                      <div className="bg-[#0f172a] border border-slate-700 p-4 rounded-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                         <div className="flex items-center gap-3 mb-2">
                            <Search size={18} className="text-blue-400" />
                            <span className="text-xs font-bold text-slate-500 uppercase">Visible IP</span>
                         </div>
                         <div className="text-lg font-mono text-white font-bold">{ipAddress.split(' ')[0]}</div>
                         <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                            <CheckCircle size={10} /> MASKED
                         </div>
                      </div>

                      {/* Location Card */}
                      <div className="bg-[#0f172a] border border-slate-700 p-4 rounded-xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                         <div className="flex items-center gap-3 mb-2">
                            <Globe size={18} className="text-purple-400" />
                            <span className="text-xs font-bold text-slate-500 uppercase">Location</span>
                         </div>
                         <div className="text-lg font-display text-white font-bold truncate">{server?.city.split('(')[0].trim()}</div>
                         <div className="text-[10px] text-slate-400 mt-1">
                            Secure Node
                         </div>
                      </div>

                      {/* Active Users Card */}
                      <div className="bg-[#0f172a] border border-slate-700 p-4 rounded-xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                         <div className="flex items-center gap-3 mb-2">
                            <Users size={18} className="text-amber-400" />
                            <span className="text-xs font-bold text-slate-500 uppercase">Online Users</span>
                         </div>
                         <div className="text-lg font-mono text-white font-bold tracking-tight">
                            {activeUsers.toLocaleString()}
                         </div>
                         <div className="text-[10px] text-amber-400 mt-1 flex items-center gap-1">
                            <Activity size={10} className="animate-pulse" /> LIVE COUNT
                         </div>
                      </div>
                   </div>

                   {/* Mock Web Content */}
                   <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col items-center">
                      <p className="text-xs text-slate-500 mb-4">Try browsing the simulated web:</p>
                      <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full transition-all group">
                         <Globe size={16} />
                         <span className="font-bold text-sm">Open SpeedTest.net</span>
                         <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>

                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SecureBrowser;