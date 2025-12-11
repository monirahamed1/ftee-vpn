import React, { useRef, useState, useMemo } from 'react';
import { MapPin, Signal, Star, Zap, ArrowUp, ArrowDown, Activity, ArrowUpDown, ChevronLeft, Search, X } from 'lucide-react';
import { ServerLocation } from '../types';

interface ServerListProps {
  servers: ServerLocation[];
  selectedServer: ServerLocation | null;
  onSelect: (server: ServerLocation) => void;
  isOpen: boolean;
  onClose: () => void;
}

type SortOption = 'recommended' | 'latency' | 'load' | 'name';

const ServerList: React.FC<ServerListProps> = ({ servers, selectedServer, onSelect, isOpen, onClose }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedServers = useMemo(() => {
    let result = [...servers];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(s => 
        s.city.toLowerCase().includes(query) || 
        s.name.toLowerCase().includes(query)
      );
    }
    
    // Sort
    switch (sortOption) {
      case 'latency':
        return result.sort((a, b) => a.latency - b.latency);
      case 'load':
        return result.sort((a, b) => a.load - b.load);
      case 'name':
        return result.sort((a, b) => a.city.localeCompare(b.city));
      case 'recommended':
      default:
        return result; // Preserves original order (Turbo first, then by region logic)
    }
  }, [servers, sortOption, searchQuery]);

  if (!isOpen) return null;

  const scrollToTop = () => {
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-[50] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-md h-[80vh] bg-[#0a0f1c] border-t sm:border border-slate-700/50 rounded-t-3xl sm:rounded-2xl p-6 flex flex-col shadow-2xl relative animate-in slide-in-from-bottom duration-300"
      >
        <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-6 sm:hidden"></div>
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
           <button 
             onClick={onClose} 
             className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
           >
             <ChevronLeft size={20} />
           </button>
           <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-display font-bold text-white tracking-wide">
                SELECT NODE
            </h2>
            <span className="text-xs text-slate-500 font-mono">({sortedServers.length})</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
           <input
             type="text"
             placeholder="Search city or country..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--theme-primary)] transition-colors"
           />
           {searchQuery && (
             <button
               onClick={() => setSearchQuery('')}
               className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
             >
               <X size={16} />
             </button>
           )}
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
            <button 
                onClick={() => setSortOption('recommended')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all border whitespace-nowrap ${sortOption === 'recommended' ? 'bg-[var(--theme-primary)] text-black border-[var(--theme-primary)]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
            >
                <Star size={12} /> RECOMMENDED
            </button>
            <button 
                onClick={() => setSortOption('latency')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all border whitespace-nowrap ${sortOption === 'latency' ? 'bg-[var(--theme-primary)] text-black border-[var(--theme-primary)]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
            >
                <Signal size={12} /> LATENCY
            </button>
            <button 
                onClick={() => setSortOption('load')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all border whitespace-nowrap ${sortOption === 'load' ? 'bg-[var(--theme-primary)] text-black border-[var(--theme-primary)]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
            >
                <Activity size={12} /> LOAD
            </button>
             <button 
                onClick={() => setSortOption('name')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all border whitespace-nowrap ${sortOption === 'name' ? 'bg-[var(--theme-primary)] text-black border-[var(--theme-primary)]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
            >
                <ArrowUpDown size={12} /> NAME
            </button>
        </div>

        {/* List */}
        <div ref={listRef} className="flex-1 overflow-y-auto space-y-3 pr-2 relative scroll-smooth">
          {sortedServers.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-40 text-slate-500">
                <MapPin size={32} className="mb-2 opacity-20" />
                <p className="text-sm font-mono">No servers found</p>
             </div>
          ) : (
            sortedServers.map((server) => {
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
            })
          )}
        </div>

        {/* Floating Scroll Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
           <button 
             onClick={scrollToTop}
             className="p-2 bg-slate-800/80 backdrop-blur border border-white/10 rounded-full shadow-lg hover:bg-[var(--theme-primary)] hover:text-black transition-colors"
           >
              <ArrowUp size={16} />
           </button>
           <button 
             onClick={scrollToBottom}
             className="p-2 bg-slate-800/80 backdrop-blur border border-white/10 rounded-full shadow-lg hover:bg-[var(--theme-primary)] hover:text-black transition-colors"
           >
              <ArrowDown size={16} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ServerList;