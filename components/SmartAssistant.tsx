import React, { useEffect, useState } from 'react';
import { Bot, Sparkles, Loader2 } from 'lucide-react';
import { ServerLocation, ConnectionState } from '../types';
import { analyzeConnectionSecurity } from '../services/geminiService';

interface SmartAssistantProps {
  connectionState: ConnectionState;
  server: ServerLocation | null;
  protocol: string;
}

const SmartAssistant: React.FC<SmartAssistantProps> = ({ connectionState, server, protocol }) => {
  const [message, setMessage] = useState<string>("SYSTEM STANDBY. READY FOR CONNECTION.");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connectionState === ConnectionState.CONNECTED && server) {
      setLoading(true);
      setMessage("RUNNING DIAGNOSTICS...");
      
      const timer = setTimeout(async () => {
        const result = await analyzeConnectionSecurity(server, protocol);
        setMessage(result);
        setLoading(false);
      }, 1500); // Simulate scan delay for effect
      
      return () => clearTimeout(timer);
    } else if (connectionState === ConnectionState.DISCONNECTED) {
      setMessage("UNSECURED NETWORK DETECTED. RECOMMEND CONNECTION IMMEDIATELY.");
    } else if (connectionState === ConnectionState.CONNECTING) {
      setMessage(`NEGOTIATING ${protocol.toUpperCase()} KEYS...`);
    }
  }, [connectionState, server, protocol]);

  return (
    <div className="mx-4 mt-6 mb-2">
      <div className="relative p-[1px] rounded-lg overflow-hidden">
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 opacity-30 animate-pulse"></div>
        
        <div className="relative bg-[#080c14] rounded-lg p-3 flex items-start gap-3 backdrop-blur-xl">
          <div className="p-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            {loading ? <Loader2 size={18} className="text-indigo-400 animate-spin" /> : <Bot size={18} className="text-indigo-400" />}
          </div>
          <div className="flex-1">
             <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/30 px-1 rounded">AI GUARD</span>
               {connectionState === ConnectionState.CONNECTED && <Sparkles size={10} className="text-amber-400" />}
             </div>
             <p className="text-sm text-slate-300 font-mono leading-tight shadow-black drop-shadow-md">
               {message}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAssistant;