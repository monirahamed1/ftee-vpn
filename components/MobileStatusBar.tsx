import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Key, Shield } from 'lucide-react';

interface MobileStatusBarProps {
  isConnected: boolean;
  ipAddress?: string;
}

const MobileStatusBar: React.FC<MobileStatusBarProps> = ({ isConnected, ipAddress }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Extract just the IP numbers if the string contains text like "(Masked)"
  const displayIp = ipAddress ? ipAddress.split(' ')[0] : '';

  return (
    <div className="w-full px-6 py-2 flex justify-between items-center text-xs font-medium text-slate-300 z-50 select-none">
      <div className="flex items-center gap-2 w-1/3">
        <span>{formatTime(time)}</span>
      </div>
      
      <div className="flex justify-center w-1/3">
        {/* Dynamic Island Style IP Display */}
        {isConnected && displayIp && (
           <div className="bg-[#0f172a]/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-2 animate-in slide-in-from-top-4 duration-700">
              <Shield size={10} className="text-emerald-400" />
              <span className="text-[10px] font-mono font-bold text-emerald-50 tracking-wide">{displayIp}</span>
           </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-1.5 w-1/3">
        {isConnected && (
          <div className="animate-in fade-in zoom-in duration-500 mr-1 bg-slate-800/50 p-0.5 rounded border border-white/10">
            <Key size={10} className="text-white fill-current" />
          </div>
        )}
        <Signal size={12} className="fill-current" />
        <Wifi size={12} />
        <div className="flex items-center gap-0.5 ml-1">
          <span className="text-[10px]">100%</span>
          <Battery size={12} className="fill-current" />
        </div>
      </div>
    </div>
  );
};

export default MobileStatusBar;