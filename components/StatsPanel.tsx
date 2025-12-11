import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Activity, ShieldCheck, Database } from 'lucide-react';
import { ConnectionState, ConnectionStats } from '../types';

interface StatsPanelProps {
  stats: ConnectionStats;
  state: ConnectionState;
  dataLimit?: number; // MB
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, state, dataLimit = 1024 }) => {
  const [displayDown, setDisplayDown] = useState(0);
  const [displayUp, setDisplayUp] = useState(0);

  // Animate numbers
  useEffect(() => {
    if (state !== ConnectionState.CONNECTED) {
      setDisplayDown(0);
      setDisplayUp(0);
      return;
    }

    const interval = setInterval(() => {
      // Add some random variance to make it look "live"
      const variance = (Math.random() - 0.5) * 5;
      setDisplayDown(Math.max(0, parseFloat((stats.downloadSpeed + variance).toFixed(1))));
      setDisplayUp(Math.max(0, parseFloat((stats.uploadSpeed + variance / 2).toFixed(1))));
    }, 800);

    return () => clearInterval(interval);
  }, [state, stats]);

  // Calculate progress percentage
  const usagePercent = Math.min(100, (stats.dataUsed / dataLimit) * 100);
  
  // Format Data Limit Display
  const displayLimit = dataLimit >= 1024 
    ? `${(dataLimit / 1024).toFixed(0)} GB` 
    : `${dataLimit} MB`;

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm px-4">
      {/* Download Card */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl flex flex-col items-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center gap-2 text-cyan-400 mb-1">
          <ArrowDown size={16} />
          <span className="text-xs font-bold tracking-wider">DOWNLOAD</span>
        </div>
        <div className="text-2xl font-display font-bold text-white">
          {displayDown} <span className="text-xs text-slate-400 font-normal">Mbps</span>
        </div>
        {/* Animated Graph Line Mockup */}
        <div className="w-full h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
           <div className="h-full bg-cyan-500 w-1/2 animate-pulse"></div>
        </div>
      </div>

      {/* Upload Card */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl flex flex-col items-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center gap-2 text-emerald-400 mb-1">
          <ArrowUp size={16} />
          <span className="text-xs font-bold tracking-wider">UPLOAD</span>
        </div>
        <div className="text-2xl font-display font-bold text-white">
          {displayUp} <span className="text-xs text-slate-400 font-normal">Mbps</span>
        </div>
        <div className="w-full h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
           <div className="h-full bg-emerald-500 w-1/3 animate-pulse"></div>
        </div>
      </div>
      
      {/* Session Stats (Protocol) */}
      <div className="col-span-2 flex justify-between items-center bg-slate-900/30 p-2 px-4 rounded-lg border border-white/5">
        <div className="flex items-center gap-2 text-slate-400">
           <ShieldCheck size={14} className={state === ConnectionState.CONNECTED ? "text-emerald-400" : "text-slate-600"} />
           <span className="text-xs">PROTOCOL</span>
        </div>
        <span className="text-xs font-mono text-emerald-300">{stats.protocol}</span>
      </div>

      {/* Data Usage Progress Bar */}
      <div className="col-span-2 mt-1">
         <div className="flex justify-between items-center text-[10px] font-bold tracking-wider mb-2">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Database size={12} className={state === ConnectionState.CONNECTED ? "text-[var(--theme-primary)]" : "text-slate-600"} />
              <span>SESSION DATA</span>
            </div>
            <span className="text-slate-300">
              {stats.dataUsed.toFixed(1)} MB <span className="text-slate-600">/ {displayLimit}</span>
            </span>
         </div>
         <div className="h-2 bg-slate-800/80 rounded-full overflow-hidden border border-white/5 relative group">
             {/* Glow Effect */}
             <div className="absolute inset-0 bg-[var(--theme-primary)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
             
             {/* Progress Fill */}
             <div 
               className="h-full bg-gradient-to-r from-[var(--theme-primary)] via-blue-500 to-purple-500 relative transition-all duration-300 ease-out"
               style={{ width: `${usagePercent}%` }}
             >
                {/* Leading Edge Flare */}
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white shadow-[0_0_8px_white]"></div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default StatsPanel;