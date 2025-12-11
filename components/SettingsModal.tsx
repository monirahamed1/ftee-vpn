import React, { useState } from 'react';
import { X, Settings, Shield, Zap, Smartphone, ChevronRight, Sparkles, Paintbrush, Wifi, WifiOff, Globe, Layout, HelpCircle, BarChart3, Database, Clock, Activity, User, CreditCard, LogOut, Bell, Code, DollarSign, Terminal as TerminalIcon, RefreshCw, AlertTriangle } from 'lucide-react';
import { AppTheme, AppSettings, LifetimeStats } from '../types';
import { APP_THEMES } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: AppTheme;
  onSetTheme: (theme: AppTheme) => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onRestartTutorial?: () => void;
  lifetimeStats?: LifetimeStats;
  onSimulateDrop?: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentTheme, onSetTheme, settings, onUpdateSettings, onRestartTutorial, lifetimeStats, onSimulateDrop }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'account' | 'appearance' | 'connection' | 'stats' | 'developer'>('general');

  const toggleSetting = (key: keyof AppSettings) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key as keyof AppSettings] // simplified toggle for boolean types
    });
  };

  const toggleMonetization = () => {
    const newState = !settings.monetization;
    console.log(`[Developer] Monetization SDK: ${newState ? 'ENABLED' : 'DISABLED'}`);
    onUpdateSettings({
      ...settings,
      monetization: newState
    });
  };

  const cycleProtocol = () => {
    const protocols = ['WireGuard v2.0', 'OpenVPN TCP', 'OpenVPN UDP', 'IKEv2'];
    const currentIndex = protocols.indexOf(settings.protocol);
    const nextIndex = (currentIndex + 1) % protocols.length;
    onUpdateSettings({ ...settings, protocol: protocols[nextIndex] });
  };
  
  const cycleLanguage = () => {
    const languages = ['English (US)', 'Español', 'Français', 'Deutsch', '中文'];
    const currentIndex = languages.indexOf(settings.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    onUpdateSettings({ ...settings, language: languages[nextIndex] });
  };
  
  const toggleDensity = () => {
      onUpdateSettings({
          ...settings,
          density: settings.density === 'compact' ? 'spacious' : 'compact'
      });
  };
  
  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({
      ...settings,
      reconnectDelay: parseInt(e.target.value)
    });
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatData = (mb: number) => {
    if (mb < 1000) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(2)} GB`;
  };

  return (
    <div 
      className={`fixed inset-0 z-[110] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'bg-black/80 backdrop-blur-sm opacity-100 pointer-events-auto' : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-md bg-[#0a0f1c] border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-slate-900/80 to-[#0a0f1c]">
          <h2 className="text-lg font-display font-bold text-white tracking-widest flex items-center gap-3">
            <Settings size={18} className="text-[var(--theme-primary)]" />
            APP SETTINGS
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/5 px-4 pt-4 overflow-x-auto no-scrollbar">
          {['general', 'account', 'appearance', 'connection', 'stats', 'developer'].map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex-1 min-w-[70px] pb-3 text-[10px] sm:text-xs font-bold tracking-wider border-b-2 transition-colors uppercase ${activeTab === tab ? 'border-[var(--theme-primary)] text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
             >
               {tab === 'stats' ? 'Statistics' : tab}
             </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               {/* System Group */}
               <div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">App Preferences</h4>
                 <div className="space-y-3">
                   {/* Haptics */}
                   <div 
                     onClick={() => toggleSetting('haptics')}
                     className={`flex items-center justify-between p-4 border rounded-2xl transition-all cursor-pointer group ${settings.haptics ? 'bg-slate-900/60 border-[var(--theme-primary)]/50' : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/40'}`}
                   >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${settings.haptics ? 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]' : 'bg-slate-800 text-slate-400'}`}>
                          <Smartphone size={20} />
                        </div>
                        <div>
                          <div className={`text-sm font-medium transition-colors ${settings.haptics ? 'text-white' : 'text-slate-200'}`}>Haptics</div>
                          <div className="text-xs text-slate-500 mt-0.5">Vibration feedback</div>
                        </div>
                      </div>
                       <div className={`w-11 h-6 rounded-full relative border transition-all ${settings.haptics ? 'bg-[var(--theme-primary)]/20 border-[var(--theme-primary)]' : 'bg-slate-800/80 border-slate-600/50'}`}>
                          <div className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all ${settings.haptics ? 'right-1 bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-glow)]' : 'left-1 bg-slate-400'}`}></div>
                      </div>
                    </div>
                    
                    {/* Language */}
                    <div 
                      onClick={cycleLanguage}
                      className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/5 rounded-2xl hover:bg-slate-800/40 hover:border-slate-500/20 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                          <Globe size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">Language</div>
                          <div className="text-xs text-[var(--theme-primary)] mt-0.5">{settings.language}</div>
                        </div>
                      </div>
                       <ChevronRight size={18} className="text-slate-600" />
                    </div>

                    {/* Restart Tutorial */}
                    <div 
                      onClick={onRestartTutorial}
                      className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/5 rounded-2xl hover:bg-slate-800/40 hover:border-slate-500/20 transition-all cursor-pointer group"
                    >
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                            <HelpCircle size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">Onboarding</div>
                            <div className="text-xs text-slate-500 mt-0.5">Replay the tutorial</div>
                          </div>
                       </div>
                       <ChevronRight size={18} className="text-slate-600" />
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               {/* Profile Card */}
               <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--theme-primary)]/20 border border-[var(--theme-primary)]/50 flex items-center justify-center text-[var(--theme-primary)]">
                    <User size={28} />
                  </div>
                  <div className="flex-1">
                     <div className="text-white font-bold tracking-wide">Anonymous User</div>
                     <div className="text-xs text-slate-500">Free Plan • ID: 8X92-K2L1</div>
                  </div>
                  <button className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg border border-white/5 transition-colors">
                     EDIT
                  </button>
               </div>

                {/* Premium Upsell */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900 border border-indigo-500/30 p-6 group transition-all hover:border-indigo-400/50">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                  <Sparkles size={100} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                     <h3 className="text-xl font-display font-bold text-white">PREMIUM</h3>
                     <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-black tracking-wider">PRO</span>
                  </div>
                  <p className="text-sm text-indigo-200/80 mb-5 leading-relaxed">
                    Unlock military-grade encryption, 4K streaming optimization, and global multi-hop servers.
                  </p>
                  <button className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-bold text-xs tracking-[0.15em] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/10 flex items-center justify-center gap-2">
                    <Sparkles size={14} /> UPGRADE PLAN
                  </button>
                </div>
              </div>

               <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-slate-900/40 border border-white/5 rounded-2xl hover:bg-slate-800/40 hover:border-slate-500/20 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                           <CreditCard size={20} />
                        </div>
                        <div className="text-left">
                           <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">Subscription</div>
                           <div className="text-xs text-slate-500 mt-0.5">Manage billing</div>
                        </div>
                     </div>
                     <ChevronRight size={18} className="text-slate-600" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 bg-slate-900/40 border border-white/5 rounded-2xl hover:bg-slate-800/40 hover:border-slate-500/20 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                           <Bell size={20} />
                        </div>
                        <div className="text-left">
                           <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">Notifications</div>
                           <div className="text-xs text-slate-500 mt-0.5">Alerts & News</div>
                        </div>
                     </div>
                     <ChevronRight size={18} className="text-slate-600" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 bg-slate-900/40 border border-red-500/10 rounded-2xl hover:bg-red-900/10 hover:border-red-500/30 transition-all group mt-6">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-900/20 flex items-center justify-center text-red-400 group-hover:text-red-300 transition-colors">
                           <LogOut size={20} />
                        </div>
                        <div className="text-left">
                           <div className="text-sm font-medium text-red-200 group-hover:text-red-100 transition-colors">Sign Out</div>
                        </div>
                     </div>
                  </button>
               </div>
             </div>
          )}

          {activeTab === 'appearance' && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Free Themes</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {APP_THEMES.map(theme => (
                      <button 
                        key={theme.id}
                        onClick={() => onSetTheme(theme)}
                        className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${currentTheme.id === theme.id ? 'bg-slate-800/60 border-[var(--theme-primary)]' : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/40'}`}
                      >
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full border-2 border-slate-700 shadow-lg" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}></div>
                            <div className="text-left">
                              <div className={`text-sm font-bold ${currentTheme.id === theme.id ? 'text-white' : 'text-slate-300'}`}>{theme.name}</div>
                              <div className="text-xs text-slate-500">Futuristic Preset</div>
                            </div>
                         </div>
                         {currentTheme.id === theme.id && <div className="w-3 h-3 rounded-full bg-[var(--theme-primary)] shadow-[0_0_10px_var(--theme-primary)]"></div>}
                      </button>
                    ))}
                  </div>
               </div>
               
               <div 
                 onClick={toggleDensity}
                 className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 cursor-pointer hover:border-slate-500/20 transition-all"
               >
                 <div className="flex items-center gap-3 mb-2 text-slate-300">
                   <Layout size={18} />
                   <span className="text-sm font-bold">Interface Density</span>
                 </div>
                 <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                   <div 
                      className="bg-[var(--theme-primary)] h-full rounded-full relative transition-all duration-300"
                      style={{ width: settings.density === 'compact' ? '30%' : '80%' }}
                   >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                   </div>
                 </div>
                 <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono tracking-wider">
                   <span className={settings.density === 'compact' ? 'text-[var(--theme-primary)]' : ''}>COMPACT</span>
                   <span className={settings.density === 'spacious' ? 'text-[var(--theme-primary)]' : ''}>SPACIOUS</span>
                 </div>
               </div>
             </div>
          )}

          {activeTab === 'connection' && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              {/* Protocol */}
              <div 
                onClick={cycleProtocol}
                className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/5 rounded-2xl hover:bg-slate-800/40 hover:border-[var(--theme-primary)] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--theme-primary)]/10 flex items-center justify-center text-[var(--theme-primary)]">
                    <Shield size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">VPN Protocol</div>
                    <div className="text-xs text-[var(--theme-primary)] font-mono mt-0.5">{settings.protocol}</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>

               {/* Auto Reconnect */}
               <div 
                 onClick={() => toggleSetting('autoReconnect')}
                 className={`flex items-center justify-between p-4 border rounded-2xl transition-all cursor-pointer group ${settings.autoReconnect ? 'bg-slate-900/60 border-[var(--theme-primary)]/50' : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/40'}`}
               >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${settings.autoReconnect ? 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]' : 'bg-slate-800 text-slate-400'}`}>
                    <RefreshCw size={20} />
                  </div>
                  <div>
                    <div className={`text-sm font-medium transition-colors ${settings.autoReconnect ? 'text-white' : 'text-slate-200'}`}>Auto Reconnect</div>
                    <div className="text-xs text-slate-500 mt-0.5">{settings.autoReconnect ? `Retry after ${settings.reconnectDelay}s` : 'Disabled'}</div>
                  </div>
                </div>
                 <div className={`w-11 h-6 rounded-full relative border transition-all ${settings.autoReconnect ? 'bg-[var(--theme-primary)]/20 border-[var(--theme-primary)]' : 'bg-slate-800/80 border-slate-600/50'}`}>
                    <div className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all ${settings.autoReconnect ? 'right-1 bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-glow)]' : 'left-1 bg-slate-400'}`}></div>
                </div>
              </div>
              
              {/* Reconnect Delay Slider (Only visible if autoReconnect is on) */}
              {settings.autoReconnect && (
                 <div className="p-4 bg-slate-900/20 border border-white/5 rounded-2xl animate-in slide-in-from-top-2">
                    <div className="flex justify-between text-xs mb-2">
                       <span className="text-slate-400 font-bold">RECONNECT DELAY</span>
                       <span className="text-[var(--theme-primary)] font-mono">{settings.reconnectDelay}s</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      value={settings.reconnectDelay} 
                      onChange={handleDelayChange}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--theme-primary)]"
                    />
                 </div>
              )}

              {/* Kill Switch */}
              <div 
                onClick={() => toggleSetting('killSwitch')}
                className={`flex items-center justify-between p-4 border rounded-2xl transition-all cursor-pointer group ${settings.killSwitch ? 'bg-slate-900/60 border-emerald-500/30' : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/40'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${settings.killSwitch ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className={`text-sm font-medium transition-colors ${settings.killSwitch ? 'text-white' : 'text-slate-200'}`}>Kill Switch</div>
                    <div className="text-xs text-slate-500 mt-0.5">{settings.killSwitch ? 'Safety Lock Active' : 'Disabled'}</div>
                  </div>
                </div>
                 <div className={`w-11 h-6 rounded-full relative border transition-all ${settings.killSwitch ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-slate-800/80 border-slate-600/50'}`}>
                    <div className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all ${settings.killSwitch ? 'right-1 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'left-1 bg-slate-400'}`}></div>
                </div>
              </div>

               {/* Smart Route */}
               <div 
                 onClick={() => toggleSetting('smartRouting')}
                 className={`flex items-center justify-between p-4 border rounded-2xl transition-all cursor-pointer group ${settings.smartRouting ? 'bg-slate-900/60 border-[var(--theme-primary)]/50' : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/40'}`}
               >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${settings.smartRouting ? 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]' : 'bg-slate-800 text-slate-400'}`}>
                    <Wifi size={20} />
                  </div>
                  <div>
                    <div className={`text-sm font-medium transition-colors ${settings.smartRouting ? 'text-white' : 'text-slate-200'}`}>Smart Routing</div>
                    <div className="text-xs text-slate-500 mt-0.5">{settings.smartRouting ? 'Auto-optimize path' : 'Manual selection'}</div>
                  </div>
                </div>
                 <div className={`w-11 h-6 rounded-full relative border transition-all ${settings.smartRouting ? 'bg-[var(--theme-primary)]/20 border-[var(--theme-primary)]' : 'bg-slate-800/80 border-slate-600/50'}`}>
                    <div className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all ${settings.smartRouting ? 'right-1 bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-glow)]' : 'left-1 bg-slate-400'}`}></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'developer' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Monetization & SDK</h4>

                {/* Ads Toggle */}
                <div 
                  onClick={toggleMonetization}
                  className={`flex items-center justify-between p-4 border rounded-2xl transition-all cursor-pointer group ${settings.monetization ? 'bg-slate-900/60 border-amber-500/50' : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/40'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${settings.monetization ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <div className={`text-sm font-medium transition-colors ${settings.monetization ? 'text-white' : 'text-slate-200'}`}>Monetization</div>
                      <div className="text-xs text-slate-500 mt-0.5">{settings.monetization ? 'Ad SDK Initialized' : 'Ads Disabled'}</div>
                    </div>
                  </div>
                  <div className={`w-11 h-6 rounded-full relative border transition-all ${settings.monetization ? 'bg-amber-900/30 border-amber-500/30' : 'bg-slate-800/80 border-slate-600/50'}`}>
                      <div className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all ${settings.monetization ? 'right-1 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'left-1 bg-slate-400'}`}></div>
                  </div>
                </div>

                {/* Mock Revenue Card - Conditionally Rendered */}
                {settings.monetization && (
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                          <BarChart3 size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Daily Revenue</div>
                          <div className="text-xs text-slate-500">eCPM: $12.45</div>
                        </div>
                    </div>
                    <div className="text-2xl font-display font-bold text-white font-mono">
                        ${(Math.random() * 50 + 10).toFixed(2)}
                    </div>
                  </div>
                )}

                {/* Simulation Tools */}
                <div>
                   <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <AlertTriangle size={12} /> Simulation Tools
                   </h5>
                   <button 
                     onClick={onSimulateDrop}
                     className="w-full flex items-center justify-between p-4 bg-red-900/10 border border-red-500/30 rounded-2xl hover:bg-red-900/20 transition-all group"
                   >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-900/20 flex items-center justify-center text-red-400 group-hover:text-red-300 transition-colors">
                           <WifiOff size={20} />
                        </div>
                        <div className="text-left">
                           <div className="text-sm font-medium text-red-200 group-hover:text-red-100 transition-colors">Force Network Crash</div>
                           <div className="text-xs text-red-400/70 mt-0.5">Simulate signal loss (Auto-reconnect test)</div>
                        </div>
                     </div>
                   </button>
                </div>

                {/* Code Block */}
                <div>
                   <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                     <Code size={12} /> Config.json
                   </h5>
                   <div className="bg-[#050505] p-4 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-400 leading-relaxed overflow-x-auto">
                     <span className="text-purple-400">{"{"}</span><br/>
                     &nbsp;&nbsp;<span className="text-blue-400">"sdk_version"</span>: <span className="text-green-400">"4.2.1"</span>,<br/>
                     &nbsp;&nbsp;<span className="text-blue-400">"ad_units"</span>: <span className="text-purple-400">{"{"}</span><br/>
                     &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"banner"</span>: <span className="text-green-400">"ca-app-pub-39402560999/6300978111"</span>,<br/>
                     &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"interstitial"</span>: <span className="text-green-400">"enabled"</span><br/>
                     &nbsp;&nbsp;<span className="text-purple-400">{"}"}</span>,<br/>
                     &nbsp;&nbsp;<span className="text-blue-400">"mediation"</span>: [<span className="text-green-400">"admob"</span>, <span className="text-green-400">"meta"</span>],<br/>
                     &nbsp;&nbsp;<span className="text-blue-400">"test_mode"</span>: <span className="text-yellow-400">true</span><br/>
                     <span className="text-purple-400">{"}"}</span>
                   </div>
                </div>

                <div 
                  onClick={() => toggleSetting('devMode')}
                  className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/5 rounded-2xl hover:bg-slate-800/40 transition-all cursor-pointer"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                         <TerminalIcon size={20} />
                      </div>
                      <div>
                         <div className="text-sm font-medium text-slate-200">Debug Logging</div>
                         <div className="text-xs text-slate-500">Verbose terminal output</div>
                      </div>
                   </div>
                   <div className={`w-3 h-3 rounded-full ${settings.devMode ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-600'}`}></div>
                </div>
            </div>
          )}

          {activeTab === 'stats' && lifetimeStats && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Lifetime Usage</h4>
               
               <div className="grid grid-cols-2 gap-4">
                 {/* Total Data */}
                 <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="p-3 bg-cyan-500/10 rounded-full mb-3 text-cyan-400">
                       <Database size={24} />
                    </div>
                    <div className="text-2xl font-display font-bold text-white mb-1">
                      {formatData(lifetimeStats.totalDataTransfer)}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Data Protected</div>
                 </div>

                 {/* Total Duration */}
                 <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="p-3 bg-emerald-500/10 rounded-full mb-3 text-emerald-400">
                       <Clock size={24} />
                    </div>
                    <div className="text-2xl font-display font-bold text-white mb-1">
                       {formatDuration(lifetimeStats.totalDuration)}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Secure Time</div>
                 </div>
               </div>

               {/* Connection Count */}
               <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                        <Activity size={20} />
                     </div>
                     <div>
                        <div className="text-sm font-bold text-white">Sessions</div>
                        <div className="text-xs text-slate-500">Successful connections</div>
                     </div>
                  </div>
                  <div className="text-2xl font-display font-bold text-white">
                     {lifetimeStats.successfulConnections}
                  </div>
               </div>
               
               {/* Visual Chart Mockup */}
               <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-6">
                     <BarChart3 size={16} className="text-[var(--theme-primary)]" />
                     <span className="text-xs font-bold text-slate-300 tracking-wider">ACTIVITY LOG</span>
                  </div>
                  
                  <div className="flex items-end justify-between h-24 gap-2">
                     {[30, 45, 25, 60, 40, 75, 50].map((h, i) => (
                        <div key={i} className="w-full bg-slate-800/50 rounded-t-sm relative group overflow-hidden">
                           <div 
                             className="absolute bottom-0 left-0 right-0 bg-[var(--theme-primary)] opacity-60 transition-all duration-500 group-hover:opacity-100"
                             style={{ height: `${h}%` }}
                           ></div>
                        </div>
                     ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-slate-600 font-mono">
                     <span>MON</span>
                     <span>SUN</span>
                  </div>
               </div>
            </div>
          )}

          <div className="pt-4 text-center pb-2">
             <div className="text-[10px] text-slate-600 font-mono tracking-widest">M Ai VPN v3.0.0 (BUILD 9124)</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;