import React from 'react';
import { MapPin, Signal, Star, Zap } from 'lucide-react';
import { ServerLocation } from '../types';

interface ServerListProps {
  servers: ServerLocation[];
  selectedServer: ServerLocation | null;
  onSelect: (server: ServerLocation) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ServerList: React.FC<ServerListProps> = ({ servers, selectedServer, onSelect, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-md h-[70vh] bg-[#0a0f1c] border-t sm:border border-slate-700/50 rounded-t-3xl sm:rounded-2xl p-6 flex flex-col shadow-2xl relative animate-in slide-in-from-bottom duration-300"
      >
        <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-6 sm:hidden"></div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display font-bold text-white tracking-wide">
            SELECT NODE
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            CLOSE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {servers.map((server) => {
            const isSelected = selectedServer?.id === server.id;
            return (
              <button
                key={server.id}
                onClick={() => {
                  onSelect(server);
                  onClose();
                }}
                className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-200 group
                  ${isSelected 
                    ? 'bg-slate-800/60 border-[var(--theme-primary)] shadow-[0_0_15px_var(--theme-glow)]' 
                    : 'bg-slate-900/40 border-slate-800 hover:border-[var(--theme-primary)] hover:bg-slate-800/60'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-[var(--theme-primary)]/10' : 'bg-slate-800'}`}>
                    {server.highSpeed ? (
                       <Zap size={20} className={isSelected ? 'text-[var(--theme-primary)]' : 'text-amber-400'} />
                    ) : (
                       <MapPin size={20} className={isSelected ? 'text-[var(--theme-primary)]' : 'text-slate-400'} />
                    )}
                  </div>
                  <div className="text-left">
                    <div className={`font-bold flex items-center gap-2 ${isSelected ? 'text-[var(--theme-primary)]' : 'text-slate-200'}`}>
                      {server.city}
                      {server.highSpeed && <span className="text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider">Turbo</span>}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{server.name}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {server.premium && (
                    <Star size={14} className="text-amber-400 fill-amber-400/20" />
                  )}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                      <Signal size={14} className={server.latency < 25 ? 'text-emerald-400' : server.latency < 100 ? 'text-yellow-400' : 'text-red-400'} />
                      <span className="text-xs text-slate-400 font-mono">{server.latency}ms</span>
                    </div>
                    <span className="text-[10px] text-slate-600">LOAD {server.load}%</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServerList;