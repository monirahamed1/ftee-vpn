import React from 'react';
import { Power } from 'lucide-react';
import { ConnectionState } from '../types';

interface ConnectionButtonProps {
  state: ConnectionState;
  onClick: () => void;
}

const ConnectionButton: React.FC<ConnectionButtonProps> = ({ state, onClick }) => {
  const isConnected = state === ConnectionState.CONNECTED;
  const isConnecting = state === ConnectionState.CONNECTING || state === ConnectionState.DISCONNECTING;

  return (
    <div className="relative group">
      {/* Outer Glow Ring */}
      <div className={`absolute -inset-4 rounded-full blur-xl transition-all duration-1000 
        ${isConnected ? 'bg-emerald-500/30' : 'bg-cyan-500/20 group-hover:bg-cyan-500/30'}
        ${isConnecting ? 'animate-pulse' : ''}
      `}></div>

      {/* Button Container */}
      <button
        onClick={onClick}
        disabled={isConnecting}
        className={`
          relative w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500
          ${isConnected 
            ? 'border-emerald-500 bg-emerald-950/30 shadow-[0_0_30px_rgba(16,185,129,0.4)]' 
            : 'border-cyan-500 bg-cyan-950/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]'
          }
          ${isConnecting ? 'cursor-wait scale-95 opacity-80' : 'hover:scale-105 active:scale-95'}
        `}
      >
        {/* Inner Ring */}
        <div className={`absolute inset-2 rounded-full border border-dashed transition-all duration-[3000ms]
          ${isConnected ? 'border-emerald-400/50 rotate-180' : 'border-cyan-400/50 rotate-0'}
          ${isConnecting ? 'animate-spin' : ''}
        `}></div>

        {/* Icon */}
        <Power 
          size={48} 
          className={`transition-all duration-500 
            ${isConnected ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]'}
          `}
        />
        
        {/* Status Text (Floating below inside button for cool effect) */}
        <div className="absolute -bottom-10 whitespace-nowrap">
           <span className={`text-sm font-display tracking-widest transition-colors duration-300
             ${isConnected ? 'text-emerald-400' : 'text-cyan-400'}
           `}>
             {state === ConnectionState.DISCONNECTED && "TAP TO CONNECT"}
             {state === ConnectionState.CONNECTING && "INITIALIZING..."}
             {state === ConnectionState.CONNECTED && "SECURED"}
             {state === ConnectionState.DISCONNECTING && "TERMINATING..."}
           </span>
        </div>
      </button>
    </div>
  );
};

export default ConnectionButton;
