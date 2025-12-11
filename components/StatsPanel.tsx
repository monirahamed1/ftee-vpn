import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Activity, ShieldCheck } from 'lucide-react';
import { ConnectionState, ConnectionStats } from '../types';

interface StatsPanelProps {
  stats: ConnectionStats;
  state: ConnectionState;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, state }) => {
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
      
      {/* Session Stats */}
      <div className="col-span-2 flex justify-between items-center bg-slate-900/30 p-2 px-4 rounded-lg border border-white/5">
        <div className="flex items-center gap-2 text-slate-400">
           <ShieldCheck size={14} className={state === ConnectionState.CONNECTED ? "text-emerald-400" : "text-slate-600"} />
           <span className="text-xs">PROTOCOL</span>
        </div>
        <span className="text-xs font-mono text-emerald-300">{stats.protocol}</span>
      </div>
    </div>
  );
};

export default StatsPanel;
