import React, { useState, useEffect } from 'react';
import { Settings, Globe, MapPin, ChevronUp } from 'lucide-react';
import { ConnectionState, ServerLocation, ConnectionStats, AppTheme, AppSettings } from './types';
import { SERVER_LOCATIONS, MOCK_IPS, APP_THEMES } from './constants';
import CyberGlobe from './components/CyberGlobe';
import ConnectionButton from './components/ConnectionButton';
import StatsPanel from './components/StatsPanel';
import ServerList from './components/ServerList';
import SmartAssistant from './components/SmartAssistant';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [selectedServer, setSelectedServer] = useState<ServerLocation | null>(SERVER_LOCATIONS[0]);
  const [isServerListOpen, setIsServerListOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(APP_THEMES[0]);
  
  // App Settings State
  const [appSettings, setAppSettings] = useState<AppSettings>({
    haptics: true,
    language: 'English (US)',
    protocol: 'WireGuard v2.0',
    killSwitch: true,
    smartRouting: false,
    density: 'compact'
  });
  
  // Simulated stats
  const [stats, setStats] = useState<ConnectionStats>({
    downloadSpeed: 0,
    uploadSpeed: 0,
    dataUsed: 0,
    duration: 0,
    ipAddress: MOCK_IPS.DISCONNECTED,
    protocol: appSettings.protocol
  });

  // Sync protocol setting to stats
  useEffect(() => {
    setStats(prev => ({ ...prev, protocol: appSettings.protocol }));
  }, [appSettings.protocol]);

  // Apply Theme
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.primary);
    root.style.setProperty('--theme-secondary', currentTheme.secondary);
    
    // Calculate glow based on primary hex
    const hex = currentTheme.primary.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    root.style.setProperty('--theme-glow', `rgba(${r}, ${g}, ${b}, 0.5)`);
    
  }, [currentTheme]);

  // Handle Connection Logic
  const handleConnectToggle = () => {
    if (appSettings.haptics && navigator.vibrate) {
       navigator.vibrate(50);
    }

    if (connectionState === ConnectionState.DISCONNECTED) {
      setConnectionState(ConnectionState.CONNECTING);
      setTimeout(() => {
        setConnectionState(ConnectionState.CONNECTED);
        setStats(prev => ({ ...prev, ipAddress: MOCK_IPS.CONNECTED, downloadSpeed: 145.2, uploadSpeed: 45.8 }));
        if (appSettings.haptics && navigator.vibrate) navigator.vibrate([50, 50, 50]);
      }, 2500);
    } else if (connectionState === ConnectionState.CONNECTED) {
      setConnectionState(ConnectionState.DISCONNECTING);
      setTimeout(() => {
        setConnectionState(ConnectionState.DISCONNECTED);
        setStats(prev => ({ ...prev, ipAddress: MOCK_IPS.DISCONNECTED, downloadSpeed: 0, uploadSpeed: 0, duration: 0 }));
        if (appSettings.haptics && navigator.vibrate) navigator.vibrate(50);
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
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[var(--theme-primary)] opacity-10 to-transparent pointer-events-none z-0"></div>

      {/* Header */}
      <header className="w-full max-w-lg px-6 py-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2.5">
          {/* Custom M Ai Logo */}
          <div className="relative w-8 h-8 flex items-center justify-center">
             <div className="absolute inset-0 bg-[var(--theme-primary)] opacity-20 blur-sm rounded-full"></div>
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--theme-primary)] relative z-10">
                <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(0,0,0,0.3)"/>
                <path d="M7 11V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17 11V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 11L12 14L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7.5" r="1.5" fill="currentColor" className="animate-pulse"/>
             </svg>
          </div>
          <h1 className="text-xl font-display font-bold tracking-widest text-white flex items-baseline gap-1">
            M <span className="text-[var(--theme-primary)]">Ai</span> <span className="text-sm font-sans font-light tracking-wide text-slate-400 opacity-80">VPN</span>
          </h1>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-full hover:bg-white/5 transition-colors group"
        >
          <Settings size={20} className="text-slate-400 group-hover:text-white transition-colors" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg flex flex-col items-center justify-between z-10 pb-8 relative">
        
        {/* Globe Visualization */}
        <div className="w-full h-[35vh] relative -mt-4">
           <CyberGlobe 
             connectionState={connectionState} 
             targetLocation={selectedServer} 
             themeColor={currentTheme.primary}
           />
           
           {/* Floating IP Display */}
           <div className="absolute bottom-4 left-0 right-0 flex justify-center">
             <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <Globe size={12} className="text-slate-400" />
                <span className="text-xs font-mono text-[var(--theme-primary)] tracking-wide">{stats.ipAddress}</span>
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
            className="w-full flex items-center justify-between bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 transition-all hover:border-[var(--theme-primary)]/50 hover:shadow-[0_0_20px_var(--theme-glow)] group"
          >
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-[var(--theme-primary)]/20 transition-colors">
                 <MapPin size={16} className="text-slate-300 group-hover:text-[var(--theme-primary)]" />
               </div>
               <div className="flex flex-col items-start">
                 <span className="text-xs text-slate-500 font-bold tracking-wider">SELECTED NODE</span>
                 <span className="text-white font-display font-medium tracking-wide group-hover:text-[var(--theme-primary)] transition-colors">
                   {selectedServer?.city.toUpperCase()}
                 </span>
               </div>
             </div>
             <ChevronUp size={20} className="text-slate-500 group-hover:text-[var(--theme-primary)]" />
          </button>
        </div>

        {/* Stats */}
        <StatsPanel stats={stats} state={connectionState} />

        {/* Timer Display if Connected */}
        <div className={`mt-4 text-center transition-all duration-500 ${connectionState === ConnectionState.CONNECTED ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}`}>
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

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        currentTheme={currentTheme}
        onSetTheme={setCurrentTheme}
        settings={appSettings}
        onUpdateSettings={setAppSettings}
      />

    </div>
  );
};

export default App;