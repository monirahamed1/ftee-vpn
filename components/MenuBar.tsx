import React, { useState } from 'react';
import { 
  ChevronDown, Shield, Zap, Smartphone, Globe, Layout, 
  HelpCircle, User, CreditCard, LogOut, Bell, DollarSign, 
  BarChart3, Activity, Database, Clock, Terminal, WifiOff, 
  RefreshCw, ExternalLink, ChevronLeft, Info 
} from 'lucide-react';
import { AppTheme, AppSettings, LifetimeStats } from '../types';
import { APP_THEMES } from '../constants';

interface MenuBarProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: AppTheme;
  onSetTheme: (theme: AppTheme) => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onRestartTutorial?: () => void;
  lifetimeStats?: LifetimeStats;
  onSimulateDrop?: () => void;
  onOpenAbout: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ 
  isOpen, onClose, currentTheme, onSetTheme, settings, onUpdateSettings, 
  onRestartTutorial, lifetimeStats, onSimulateDrop, onOpenAbout 
}) => {
  const [openSection, setOpenSection] = useState<string | null>('connection');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const updateSetting = (key: keyof AppSettings, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  const toggleBoolSetting = (key: keyof AppSettings) => {
    updateSetting(key, !settings[key as keyof AppSettings]);
  };

  const formatData = (mb: number) => mb < 1000 ? `${mb.toFixed(1)} MB` : `${(mb / 1024).toFixed(2)} GB`;
  const formatDuration = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[140] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Side Menu Drawer */}
      <div className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-[#0a0f1c] border-r border-slate-700/50 shadow-2xl z-[150] transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-slate-900 via-[#0a0f1c] to-[#0a0f1c] flex items-center gap-4">
           <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
             <ChevronLeft size={20} />
           </button>
           <div>
             <h2 className="text-xl font-display font-bold text-white tracking-widest">MENU</h2>
             <p className="text-[10px] text-slate-500 font-mono tracking-wide">SYSTEM CONFIGURATION</p>
           </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          
          {/* Account Section */}
          <div className="p-4 border-b border-white/5">
            <div className="bg-slate-900/40 border border-white/5 rounded-xl p-3 flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[var(--theme-primary)]/20 flex items-center justify-center text-[var(--theme-primary)] border border-[var(--theme-primary)]/30">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">Anonymous User</div>
                <div className="text-[10px] text-slate-500 font-mono">ID: 8X92-K2L1</div>
              </div>
            </div>
            <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-xs font-bold tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2">
              <Zap size={12} /> UPGRADE TO PRO
            </button>
          </div>

          {/* Accordion Groups */}
          <div className="py-2">

            {/* Connection Group */}
            <MenuSection 
              title="CONNECTION" 
              icon={Shield} 
              isOpen={openSection === 'connection'} 
              onToggle={() => toggleSection('connection')}
            >
               {/* Protocol */}
               <div className="space-y-2">
                 <label className="text-xs text-slate-500 font-bold ml-1">PROTOCOL</label>
                 <div className="grid grid-cols-2 gap-2">
                   {['WireGuard v2.0', 'OpenVPN TCP', 'OpenVPN UDP', 'IKEv2'].map(p => (
                     <button
                       key={p}
                       onClick={() => updateSetting('protocol', p)}
                       className={`px-3 py-2 rounded-lg text-[10px] font-mono border transition-all truncate ${settings.protocol === p ? 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)] text-[var(--theme-primary)]' : 'bg-slate-900 border-white/5 text-slate-400 hover:border-white/10'}`}
                     >
                       {p.split(' ')[0]}
                     </button>
                   ))}
                 </div>
               </div>

               {/* Toggles */}
               <SettingToggle 
                 label="Auto Reconnect" 
                 desc={`Retry after ${settings.reconnectDelay}s`} 
                 active={settings.autoReconnect} 
                 onClick={() => toggleBoolSetting('autoReconnect')} 
               />
               
               {settings.autoReconnect && (
                 <div className="pl-2 pr-1 pt-1">
                   <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                     <span>Delay</span>
                     <span className="text-[var(--theme-primary)]">{settings.reconnectDelay}s</span>
                   </div>
                   <input 
                      type="range" 
                      min="1" max="30" 
                      value={settings.reconnectDelay} 
                      onChange={(e) => updateSetting('reconnectDelay', parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--theme-primary)]"
                    />
                 </div>
               )}

               <SettingToggle 
                 label="Kill Switch" 
                 desc="Block traffic if VPN drops" 
                 active={settings.killSwitch} 
                 onClick={() => toggleBoolSetting('killSwitch')} 
                 danger
               />

               <SettingToggle 
                 label="Smart Routing" 
                 desc="Optimize path latency" 
                 active={settings.smartRouting} 
                 onClick={() => toggleBoolSetting('smartRouting')} 
               />
            </MenuSection>

            {/* Interface Group */}
            <MenuSection 
              title="INTERFACE" 
              icon={Layout} 
              isOpen={openSection === 'interface'} 
              onToggle={() => toggleSection('interface')}
            >
              <div className="space-y-3">
                <div>
                   <label className="text-xs text-slate-500 font-bold ml-1 mb-2 block">THEME</label>
                   <div className="grid grid-cols-5 gap-2">
                     {APP_THEMES.map(theme => (
                       <button
                         key={theme.id}
                         onClick={() => onSetTheme(theme)}
                         className={`w-full aspect-square rounded-full border-2 transition-all shadow-lg ${currentTheme.id === theme.id ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                         style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                         title={theme.name}
                       />
                     ))}
                   </div>
                </div>

                <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-lg border border-white/5">
                   <div className="flex flex-col">
                     <span className="text-sm font-medium text-slate-200">Density</span>
                     <span className="text-[10px] text-slate-500 uppercase">{settings.density}</span>
                   </div>
                   <button 
                     onClick={() => updateSetting('density', settings.density === 'compact' ? 'spacious' : 'compact')}
                     className="px-3 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-300 hover:text-white transition-colors"
                   >
                     TOGGLE
                   </button>
                </div>

                <SettingToggle 
                   label="Haptics" 
                   desc="Vibration feedback" 
                   active={settings.haptics} 
                   onClick={() => toggleBoolSetting('haptics')} 
                />

                <button 
                   onClick={() => {
                      const langs = ['English (US)', 'Español', 'Français', 'Deutsch', '中文'];
                      const idx = langs.indexOf(settings.language);
                      updateSetting('language', langs[(idx + 1) % langs.length]);
                   }}
                   className="w-full flex items-center justify-between p-3 bg-slate-900/40 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                >
                   <div className="flex items-center gap-3">
                     <Globe size={16} className="text-slate-400" />
                     <span className="text-sm text-slate-200">Language</span>
                   </div>
                   <span className="text-xs text-[var(--theme-primary)]">{settings.language}</span>
                </button>
              </div>
            </MenuSection>

            {/* Stats Group */}
            <MenuSection 
              title="STATISTICS" 
              icon={BarChart3} 
              isOpen={openSection === 'stats'} 
              onToggle={() => toggleSection('stats')}
            >
              {lifetimeStats && (
                <div className="grid grid-cols-2 gap-2">
                   <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5 flex flex-col items-center text-center">
                      <Database size={16} className="text-cyan-400 mb-2" />
                      <div className="text-lg font-bold text-white leading-none mb-1">{formatData(lifetimeStats.totalDataTransfer)}</div>
                      <div className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">Data Secured</div>
                   </div>
                   <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5 flex flex-col items-center text-center">
                      <Clock size={16} className="text-emerald-400 mb-2" />
                      <div className="text-lg font-bold text-white leading-none mb-1">{formatDuration(lifetimeStats.totalDuration)}</div>
                      <div className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">Total Time</div>
                   </div>
                   <div className="col-span-2 bg-slate-900/50 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-purple-400" />
                        <span className="text-xs text-slate-300 font-bold">Total Sessions</span>
                      </div>
                      <span className="text-xl font-mono text-white">{lifetimeStats.successfulConnections}</span>
                   </div>
                </div>
              )}
            </MenuSection>

            {/* Developer Group */}
            <MenuSection 
              title="DEVELOPER" 
              icon={Terminal} 
              isOpen={openSection === 'developer'} 
              onToggle={() => toggleSection('developer')}
            >
               <div className="space-y-3">
                  <SettingToggle 
                    label="Debug Mode" 
                    desc="Verbose logging" 
                    active={settings.devMode} 
                    onClick={() => toggleBoolSetting('devMode')} 
                  />
                  
                  <SettingToggle 
                    label="Monetization SDK" 
                    desc="Ad integration test" 
                    active={settings.monetization} 
                    onClick={() => toggleBoolSetting('monetization')} 
                  />

                  {settings.monetization && (
                    <div className="bg-slate-900/40 p-3 rounded-lg border border-white/5 flex justify-between items-center">
                       <span className="text-xs text-slate-400">Mock Revenue</span>
                       <span className="text-sm font-mono text-green-400">${(Math.random() * 100).toFixed(2)}</span>
                    </div>
                  )}

                  <button 
                     onClick={onSimulateDrop}
                     className="w-full p-3 bg-red-900/10 border border-red-500/20 rounded-lg flex items-center gap-3 hover:bg-red-900/20 transition-colors group"
                  >
                     <WifiOff size={18} className="text-red-400" />
                     <div className="text-left">
                        <div className="text-xs font-bold text-red-200">Simulate Crash</div>
                        <div className="text-[9px] text-red-400/60">Test auto-reconnect</div>
                     </div>
                  </button>
                  
                  <div className="p-3 bg-black rounded border border-slate-800 font-mono text-[9px] text-slate-500 overflow-x-auto">
                    {`{"version": "3.1.0", "build": 9124, "env": "prod"}`}
                  </div>
               </div>
            </MenuSection>

            {/* Support/Other */}
             <div className="border-b border-white/5">
                <button onClick={onRestartTutorial} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                   <div className="flex items-center gap-3">
                      <HelpCircle size={18} />
                      <span className="text-sm font-medium">Tutorial</span>
                   </div>
                </button>
                <button 
                  onClick={onOpenAbout}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                >
                   <div className="flex items-center gap-3">
                      <Info size={18} />
                      <span className="text-sm font-medium">About</span>
                   </div>
                </button>
                 <button className="w-full flex items-center justify-between p-4 hover:bg-red-900/10 transition-colors text-slate-400 hover:text-red-400">
                   <div className="flex items-center gap-3">
                      <LogOut size={18} />
                      <span className="text-sm font-medium">Sign Out</span>
                   </div>
                </button>
             </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-slate-900/50 text-center">
           <div className="text-[10px] text-slate-600 font-mono tracking-widest">M Ai VPN v3.1.0</div>
        </div>
      </div>
    </>
  );
};

// Helper Components
const MenuSection: React.FC<{ title: string, icon: any, isOpen: boolean, onToggle: () => void, children: React.ReactNode }> = ({ title, icon: Icon, isOpen, onToggle, children }) => (
  <div className="border-b border-white/5">
    <button onClick={onToggle} className={`w-full flex items-center justify-between p-4 transition-colors ${isOpen ? 'bg-white/5' : 'hover:bg-white/5'}`}>
      <div className="flex items-center gap-3">
        <Icon size={18} className={isOpen ? 'text-[var(--theme-primary)]' : 'text-slate-500'} />
        <span className={`font-display font-bold text-xs tracking-widest ${isOpen ? 'text-white' : 'text-slate-400'}`}>{title}</span>
      </div>
      <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--theme-primary)]' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-black/20 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
       <div className="p-4 space-y-4 border-t border-white/5 border-dashed">
         {children}
       </div>
    </div>
  </div>
);

const SettingToggle: React.FC<{ label: string, desc: string, active: boolean, onClick: () => void, danger?: boolean }> = ({ label, desc, active, onClick, danger }) => (
  <div 
     onClick={onClick}
     className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${active ? (danger ? 'bg-red-900/20 border-red-500/50' : 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)]/50') : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/60'}`}
  >
    <div className="flex-1">
      <div className={`text-sm font-bold ${active ? 'text-white' : 'text-slate-300'}`}>{label}</div>
      <div className="text-[10px] text-slate-500">{desc}</div>
    </div>
    <div className={`w-9 h-5 rounded-full relative border transition-all ${active ? (danger ? 'bg-red-500 border-red-500' : 'bg-[var(--theme-primary)] border-[var(--theme-primary)]') : 'bg-slate-800 border-slate-600'}`}>
       <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all shadow-sm ${active ? 'right-0.5' : 'left-0.5'}`}></div>
    </div>
  </div>
);

export default MenuBar;