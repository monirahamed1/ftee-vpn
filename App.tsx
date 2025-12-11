import React, { useState, useEffect, useRef } from 'react';
import { Menu, Globe, MapPin, ChevronUp, Terminal, ArrowUp, ArrowDown, Users } from 'lucide-react';
import { ConnectionState, ServerLocation, ConnectionStats, AppTheme, AppSettings, LifetimeStats } from './types';
import { SERVER_LOCATIONS, MOCK_IPS, APP_THEMES } from './constants';
import CyberGlobe from './components/CyberGlobe';
import ConnectionButton from './components/ConnectionButton';
import StatsPanel from './components/StatsPanel';
import ServerList from './components/ServerList';
import SmartAssistant from './components/SmartAssistant';
import MenuBar from './components/MenuBar';
import MobileStatusBar from './components/MobileStatusBar';
import TerminalLog from './components/TerminalLog';
import OnboardingTutorial from './components/OnboardingTutorial';
import AboutModal from './components/AboutModal';

const App: React.FC = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [selectedServer, setSelectedServer] = useState<ServerLocation | null>(SERVER_LOCATIONS[0]);
  const [isServerListOpen, setIsServerListOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(APP_THEMES[0]);
  const [showScrollControls, setShowScrollControls] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(2410893);
  
  // Track if a disconnect was initiated by the user
  const isIntentionalDisconnect = useRef(false);
  
  // Tutorial State
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Refs for Tutorial
  const connectBtnRef = useRef<HTMLDivElement>(null);
  const serverRef = useRef<HTMLButtonElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  // App Settings State
  const [appSettings, setAppSettings] = useState<AppSettings>({
    haptics: true,
    language: 'English (US)',
    protocol: 'WireGuard v2.0',
    killSwitch: true,
    smartRouting: false,
    density: 'compact',
    monetization: false,
    devMode: false,
    autoReconnect: true,
    reconnectDelay: 3
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

  // Lifetime Stats State
  const [lifetimeStats, setLifetimeStats] = useState<LifetimeStats>({
    totalDuration: 0,
    totalDataTransfer: 0,
    successfulConnections: 0
  });

  // Load Lifetime Stats
  useEffect(() => {
    const saved = localStorage.getItem('m_ai_vpn_lifetime_stats');
    if (saved) {
      try {
        setLifetimeStats(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse lifetime stats", e);
      }
    }
  }, []);

  // Check LocalStorage for Tutorial
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('m_ai_vpn_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  // Simulate live user count fluctuation
  useEffect(() => {
    const userInterval = setInterval(() => {
      setOnlineUsers(prev => {
         const change = Math.floor(Math.random() * 25) - 10;
         return prev + change;
      });
    }, 3000);
    return () => clearInterval(userInterval);
  }, []);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowScrollControls(true);
        } else {
            setShowScrollControls(false);
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (direction: 'top' | 'bottom') => {
      window.scrollTo({
          top: direction === 'top' ? 0 : document.body.scrollHeight,
          behavior: 'smooth'
      });
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('m_ai_vpn_tutorial_seen', 'true');
  };

  const handleRestartTutorial = () => {
    setIsMenuOpen(false);
    // Small delay to allow menu to close before starting tutorial animation
    setTimeout(() => {
        setShowTutorial(true);
    }, 300);
  };

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

  // Handle Menu Toggle with Haptics
  const handleMenuToggle = () => {
     if (appSettings.haptics && navigator.vibrate) {
        navigator.vibrate(20);
     }
     setIsMenuOpen(!isMenuOpen);
  };

  const connectToVpn = () => {
    // Reset intentional disconnect flag
    isIntentionalDisconnect.current = false;
    
    setConnectionState(ConnectionState.CONNECTING);
    // Fast connection simulation - 2s
    setTimeout(() => {
      setConnectionState(ConnectionState.CONNECTED);
      setStats(prev => ({ ...prev, ipAddress: MOCK_IPS.CONNECTED, downloadSpeed: 145.2, uploadSpeed: 45.8 }));
      
      // Update Connection Count
      setLifetimeStats(prev => {
         const updated = { ...prev, successfulConnections: prev.successfulConnections + 1 };
         localStorage.setItem('m_ai_vpn_lifetime_stats', JSON.stringify(updated));
         return updated;
      });

      if (appSettings.haptics && navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }, 2000);
  };

  const disconnectVpn = (intentional: boolean = true) => {
    isIntentionalDisconnect.current = intentional;
    
    setConnectionState(ConnectionState.DISCONNECTING);
    
    // Update Lifetime Stats with current session data
    setLifetimeStats(prev => {
      const updated = { 
        ...prev, 
        totalDuration: prev.totalDuration + stats.duration,
        totalDataTransfer: prev.totalDataTransfer + stats.dataUsed
      };
      localStorage.setItem('m_ai_vpn_lifetime_stats', JSON.stringify(updated));
      return updated;
    });

    // Fast disconnect - 1.2s
    setTimeout(() => {
      setConnectionState(ConnectionState.DISCONNECTED);
      setStats(prev => ({ ...prev, ipAddress: MOCK_IPS.DISCONNECTED, downloadSpeed: 0, uploadSpeed: 0, duration: 0, dataUsed: 0 }));
      if (appSettings.haptics && navigator.vibrate) navigator.vibrate(50);
    }, 1200);
  };

  // Simulate Connection Drop (for testing auto-reconnect)
  const simulateConnectionDrop = () => {
    if (connectionState === ConnectionState.CONNECTED) {
      // Mark as UNINTENTIONAL to trigger auto-reconnect logic
      isIntentionalDisconnect.current = false;
      
      // Save stats before wiping (simulating data saved before crash)
      setLifetimeStats(prev => {
        const updated = { 
          ...prev, 
          totalDuration: prev.totalDuration + stats.duration,
          totalDataTransfer: prev.totalDataTransfer + stats.dataUsed
        };
        localStorage.setItem('m_ai_vpn_lifetime_stats', JSON.stringify(updated));
        return updated;
      });

      // INSTANTLY switch to disconnected to simulate a crash/drop (no "Disconnecting..." animation)
      setConnectionState(ConnectionState.DISCONNECTED);
      setStats(prev => ({ ...prev, ipAddress: MOCK_IPS.DISCONNECTED, downloadSpeed: 0, uploadSpeed: 0, duration: 0, dataUsed: 0 }));
      
      // Error-like haptic feedback
      if (appSettings.haptics && navigator.vibrate) {
         navigator.vibrate([50, 100, 50]); 
      }
      
      setIsMenuOpen(false);
    }
  };

  // Auto-Reconnect Logic
  useEffect(() => {
    if (
      connectionState === ConnectionState.DISCONNECTED && 
      !isIntentionalDisconnect.current && 
      appSettings.autoReconnect
    ) {
      const delay = appSettings.reconnectDelay * 1000;
      
      const timer = setTimeout(() => {
        connectToVpn();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [connectionState, appSettings.autoReconnect, appSettings.reconnectDelay]);

  // Handle Server Selection with Auto-Connect
  const handleServerSelect = (server: ServerLocation) => {
    setSelectedServer(server);
    if (appSettings.haptics && navigator.vibrate) navigator.vibrate(30);

    // If connected, reconnect. If disconnected, connect.
    if (connectionState === ConnectionState.CONNECTED) {
       // Quick bounce (intentional disconnect for server switch)
       disconnectVpn(true);
       setTimeout(() => {
          connectToVpn();
       }, 500);
    } else if (connectionState === ConnectionState.DISCONNECTED) {
       connectToVpn();
    }
  };

  // Handle Connection Button Click
  const handleConnectToggle = () => {
    if (appSettings.haptics && navigator.vibrate) {
       navigator.vibrate(50);
    }

    if (connectionState === ConnectionState.DISCONNECTED) {
      connectToVpn();
    } else if (connectionState === ConnectionState.CONNECTED) {
      disconnectVpn(true);
    }
  };

  // Duration Timer & Data Simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (connectionState === ConnectionState.CONNECTED) {
      interval = setInterval(() => {
        setStats(prev => ({ 
            ...prev, 
            duration: prev.duration + 1,
            dataUsed: prev.dataUsed + (Math.random() * 2 + 0.5) // Simulate 0.5-2.5 MB/s data usage
        }));
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

  // Dynamic Density Classes
  const spacingClass = appSettings.density === 'compact' ? 'gap-2' : 'gap-6';
  // Increased top padding to account for fixed header
  const mainPaddingClass = appSettings.density === 'compact' ? 'pb-8 pt-20' : 'pb-12 pt-24';

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col items-center font-sans relative overflow-x-hidden">
      
      {/* Tutorial Overlay */}
      {showTutorial && (
        <OnboardingTutorial 
          isActive={showTutorial} 
          onComplete={handleTutorialComplete}
          refs={{
            connect: connectBtnRef,
            server: serverRef,
            ai: aiRef,
            settings: menuRef // Point tutorial to the new menu button
          }}
        />
      )}

      {/* Background Effects - Fixed so they don't scroll away */}
      <div className="fixed inset-0 hologram-grid pointer-events-none z-0"></div>
      <div className="fixed top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[var(--theme-primary)] opacity-10 to-transparent pointer-events-none z-0"></div>

      {/* Mobile Status Bar Simulation - Fixed Top */}
      <div className="fixed top-0 w-full z-[130] pointer-events-none bg-[#050505]/50 backdrop-blur-sm">
         <MobileStatusBar 
           isConnected={connectionState === ConnectionState.CONNECTED} 
           ipAddress={stats.ipAddress}
         />
      </div>

      {/* Header - Fixed & High Z-Index for Accessibility on All Pages */}
      <header className="fixed top-0 w-full max-w-lg px-6 py-3 mt-6 flex justify-between items-center z-[120] transition-all duration-300">
        
        {/* Gradient Backdrop for Readability */}
        <div className="absolute inset-0 -top-6 bg-gradient-to-b from-[#050505] via-[#050505]/95 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-2.5">
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
        <div className="relative z-10 flex items-center gap-2">
            <button 
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                className={`p-2 rounded-full transition-colors group ${isTerminalOpen ? 'bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]' : 'hover:bg-white/5 text-slate-400'}`}
                title="Python Console"
            >
                <Terminal size={20} className="transition-colors" />
            </button>
            <button 
              ref={menuRef}
              onClick={handleMenuToggle}
              className={`p-2 rounded-full hover:bg-white/5 transition-all duration-300 group ${isMenuOpen ? 'bg-white/10 text-white' : 'text-slate-400'}`}
            >
              <Menu size={20} className={`group-hover:text-white transition-colors ${isMenuOpen ? 'text-[var(--theme-primary)]' : ''}`} />
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 w-full max-w-lg flex flex-col items-center justify-start z-10 relative transition-all duration-300 ${mainPaddingClass} ${isTerminalOpen ? 'pb-72' : ''}`}>
        
        {/* Globe Visualization */}
        <div className="w-full h-[35vh] relative -mt-4 shrink-0">
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

        {/* Dynamic Layout Container */}
        <div className={`w-full flex flex-col items-center ${spacingClass}`}>

          {/* AI Assistant */}
          <div ref={aiRef} className="w-full">
            <SmartAssistant 
                connectionState={connectionState} 
                server={selectedServer} 
                protocol={appSettings.protocol}
            />
          </div>

          {/* Connection Button */}
          <div ref={connectBtnRef} className="my-1 flex flex-col items-center gap-4">
             <ConnectionButton state={connectionState} onClick={handleConnectToggle} />
          </div>

          {/* Server Selector Trigger */}
          <div className="w-full px-6">
            <button 
              ref={serverRef}
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
          {/* Changed dataLimit from 1024 to 10240 (10 GB) */}
          <StatsPanel stats={stats} state={connectionState} dataLimit={10240} />

        </div>

        {/* Timer Display if Connected */}
        <div className={`mt-2 text-center transition-all duration-500 ${connectionState === ConnectionState.CONNECTED ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}`}>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Session Duration</div>
          <div className="text-2xl font-mono text-emerald-400 font-bold tabular-nums tracking-widest neon-text">
            {formatTime(stats.duration)}
          </div>
        </div>
        
        {/* Padding for bottom scroll */}
        <div className="h-12 w-full"></div>

      </main>

      {/* Floating Online Users Counter - Bottom Left */}
      <div className="fixed bottom-6 left-4 z-40 flex items-center gap-3 px-4 py-2.5 bg-[#0a0f1c]/90 backdrop-blur-md border border-white/10 rounded-full shadow-lg hover:border-[var(--theme-primary)]/40 transition-colors animate-in slide-in-from-left duration-500">
         <div className="relative">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
               <Users size={16} className="text-[var(--theme-primary)]" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0a0f1c] animate-pulse"></div>
         </div>
         <div className="flex flex-col">
             <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-0.5">Global Users</span>
             <span className="text-xs font-mono font-bold text-white tracking-wide">{onlineUsers.toLocaleString()}</span>
         </div>
      </div>

      {/* Floating Scroll Controls */}
      <div className={`fixed bottom-6 right-4 z-40 flex flex-col gap-2 transition-all duration-300 ${showScrollControls || (window.scrollY > 0) ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-12'}`}>
          <button 
             onClick={() => handleScrollTo('top')}
             className="p-3 bg-slate-800/80 backdrop-blur border border-white/10 rounded-full shadow-lg hover:bg-[var(--theme-primary)] hover:text-black transition-colors"
          >
             <ArrowUp size={18} />
          </button>
          <button 
             onClick={() => handleScrollTo('bottom')}
             className="p-3 bg-slate-800/80 backdrop-blur border border-white/10 rounded-full shadow-lg hover:bg-[var(--theme-primary)] hover:text-black transition-colors"
          >
             <ArrowDown size={18} />
          </button>
      </div>

      {/* Terminal Overlay */}
      {isTerminalOpen && (
          <TerminalLog 
            connectionState={connectionState} 
            server={selectedServer} 
            protocol={appSettings.protocol}
            onClose={() => setIsTerminalOpen(false)}
          />
      )}
      
      {/* About View Modal */}
      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
      
      {/* Monetization Mock Banner (Visible only if enabled in Developer settings and Terminal is closed) */}
      {appSettings.monetization && !isTerminalOpen && !isAboutOpen && (
        <div className="fixed bottom-0 w-full bg-gradient-to-r from-slate-900 via-[#0a0f1c] to-slate-900 border-t border-white/10 p-2 z-[90] flex items-center justify-center gap-4 animate-in slide-in-from-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
             <span className="text-[10px] text-slate-500 bg-slate-800 px-1 rounded border border-slate-700">AD</span>
             <span className="text-xs text-slate-400 font-mono tracking-wide">SPONSORED: Secure your digital footprint today.</span>
        </div>
      )}

      {/* Server List Modal */}
      <ServerList 
        servers={SERVER_LOCATIONS} 
        selectedServer={selectedServer} 
        onSelect={handleServerSelect} 
        isOpen={isServerListOpen} 
        onClose={() => setIsServerListOpen(false)} 
      />

      {/* Side Menu Bar */}
      <MenuBar 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        currentTheme={currentTheme}
        onSetTheme={setCurrentTheme}
        settings={appSettings}
        onUpdateSettings={setAppSettings}
        onRestartTutorial={handleRestartTutorial}
        lifetimeStats={lifetimeStats}
        onSimulateDrop={simulateConnectionDrop}
        onOpenAbout={() => { setIsMenuOpen(false); setIsAboutOpen(true); }}
      />

    </div>
  );
};

export default App;