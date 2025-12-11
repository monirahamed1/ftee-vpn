import React, { useState, useEffect } from 'react';
import { Settings, Shield, Globe, MapPin, ChevronUp } from 'lucide-react';
import { ConnectionState, ServerLocation, ConnectionStats } from './types';
import { SERVER_LOCATIONS, MOCK_IPS } from './constants';
import CyberGlobe from './components/CyberGlobe';
import ConnectionButton from './components/ConnectionButton';
import StatsPanel from './components/StatsPanel';
import ServerList from './components/ServerList';
import SmartAssistant from './components/SmartAssistant';

const App: React.FC = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [selectedServer, setSelectedServer] = useState<ServerLocation | null>(SERVER_LOCATIONS[0]);
  const [isServerListOpen, setIsServerListOpen] = useState(false);
  
  // Simulated stats
  const [stats, setStats] = useState<ConnectionStats>({
    downloadSpeed: 0,
    uploadSpeed: 0,
    dataUsed: 0,
    duration: 0,
    ipAddress: MOCK_IPS.DISCONNECTED,
    protocol: 'WireGuard'
  });

  // Handle Connection Logic
  const handleConnectToggle = () => {
    if (connectionState === ConnectionState.DISCONNECTED) {
      setConnectionState(ConnectionState.CONNECTING);
      setTimeout(() => {
        setConnectionState(ConnectionState.CONNECTED);
        setStats(prev => ({ ...prev, ipAddress: MOCK_IPS.CONNECTED, downloadSpeed: 145.2, uploadSpeed: 45.8 }));
      }, 2500);
    } else if (connectionState === ConnectionState.CONNECTED) {
      setConnectionState(ConnectionState.DISCONNECTING);
      setTimeout(() => {
        setConnectionState(ConnectionState.DISCONNECTED);
        setStats(prev => ({ ...prev, ipAddress: MOCK_IPS.DISCONNECTED, downloadSpeed: 0, uploadSpeed: 0, duration: 0 }));
      }, 1500);
    }
  };

  // Duration Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (connectionState === ConnectionState.CONNECTED) {
      interval = setInterval(() => {
        setStats(prev => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [connectionState]);

  // Format Time
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col items-center overflow-hidden font-sans relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 hologram-grid pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none z-0"></div>

      {/* Header */}
      <header className="w-full max-w-lg px-6 py-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <Shield size={24} className="text-cyan-400 fill-cyan-400/20" />
          <h1 className="text-xl font-display font-bold tracking-widest text-white">
            NEON<span className="text-cyan-400">GUARD</span>
          </h1>
        </div>
        <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
          <Settings size={20} className="text-slate-400" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg flex flex-col items-center justify-between z-10 pb-8 relative">
        
        {/* Globe Visualization */}
        <div className="w-full h-[35vh] relative -mt-4">
           <CyberGlobe connectionState={connectionState} targetLocation={selectedServer} />
           
           {/* Floating IP Display */}
           <div className="absolute bottom-4 left-0 right-0 flex justify-center">
             <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                <Globe size={12} className="text-slate-400" />
                <span className="text-xs font-mono text-cyan-200 tracking-wide">{stats.ipAddress}</span>
             </div>
           </div>
        </div>

        {/* AI Assistant */}
        <SmartAssistant connectionState={connectionState} server={selectedServer} />

        {/* Connection Button */}
        <div className="my-2">
           <ConnectionButton state={connectionState} onClick={handleConnectToggle} />
        </div>

        {/* Server Selector Trigger */}
        <div className="w-full px-6 mb-4">
          <button 
            onClick={() => setIsServerListOpen(true)}
            className="w-full flex items-center justify-between bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 transition-all hover:border-cyan-500/30 group"
          >
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-cyan-900/30 transition-colors">
                 <MapPin size={16} className="text-slate-300 group-hover:text-cyan-400" />
               </div>
               <div className="flex flex-col items-start">
                 <span className="text-xs text-slate-500 font-bold tracking-wider">SELECTED NODE</span>
                 <span className="text-white font-display font-medium tracking-wide">
                   {selectedServer?.city.toUpperCase()}, {selectedServer?.countryCode}
                 </span>
               </div>
             </div>
             <ChevronUp size={20} className="text-slate-500 group-hover:text-cyan-400" />
          </button>
        </div>

        {/* Stats */}
        <StatsPanel stats={stats} state={connectionState} />

        {/* Timer Display if Connected */}
        <div className={`mt-4 text-center transition-all duration-500 ${connectionState === ConnectionState.CONNECTED ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Session Duration</div>
          <div className="text-2xl font-mono text-emerald-400 font-bold tabular-nums tracking-widest neon-text">
            {formatTime(stats.duration)}
          </div>
        </div>

      </main>

      {/* Server List Modal */}
      <ServerList 
        servers={SERVER_LOCATIONS} 
        selectedServer={selectedServer} 
        onSelect={setSelectedServer} 
        isOpen={isServerListOpen} 
        onClose={() => setIsServerListOpen(false)} 
      />

    </div>
  );
};

export default App;