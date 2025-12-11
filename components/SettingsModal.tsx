import React, { useState } from 'react';
import { X, Settings, Shield, Zap, Smartphone, ChevronRight, Sparkles, Paintbrush, Wifi, Globe, Layout } from 'lucide-react';
import { AppTheme, AppSettings } from '../types';
import { APP_THEMES } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: AppTheme;
  onSetTheme: (theme: AppTheme) => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentTheme, onSetTheme, settings, onUpdateSettings }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'connection'>('general');

  if (!isOpen) return null;

  const toggleSetting = (key: keyof AppSettings) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key as keyof AppSettings] // simplified toggle for boolean types
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

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[#0a0f1c] border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300">
        
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
        <div className="flex border-b border-white/5 px-4 pt-4">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex-1 pb-3 text-xs font-bold tracking-wider border-b-2 transition-colors ${activeTab === 'general' ? 'border-[var(--theme-primary)] text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            GENERAL
          </button>
          <button 
            onClick={() => setActiveTab('connection')}
            className={`flex-1 pb-3 text-xs font-bold tracking-wider border-b-2 transition-colors ${activeTab === 'connection' ? 'border-[var(--theme-primary)] text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            CONNECTION
          </button>
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`flex-1 pb-3 text-xs font-bold tracking-wider border-b-2 transition-colors ${activeTab === 'appearance' ? 'border-[var(--theme-primary)] text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            APPEARANCE
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
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
                 </div>
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

          <div className="pt-4 text-center pb-2">
             <div className="text-[10px] text-slate-600 font-mono tracking-widest">M Ai VPN v3.0.0 (BUILD 9124)</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;