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

  // We use inline styles for dynamic colors to bridge the gap between Tailwind classes and CSS variables for complex states
  
  return (
    <div className="relative group">
      {/* Outer Glow Ring */}
      <div 
        className={`absolute -inset-4 rounded-full blur-xl transition-all duration-1000 ${isConnecting ? 'animate-pulse' : ''}`}
        style={{
           backgroundColor: isConnected ? 'rgba(16, 185, 129, 0.3)' : 'var(--theme-glow)'
        }}
      ></div>

      {/* Button Container */}
      <button
        onClick={onClick}
        disabled={isConnecting}
        className={`
          relative w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500
          ${isConnecting ? 'cursor-wait scale-95 opacity-80' : 'hover:scale-105 active:scale-95'}
        `}
        style={{
            borderColor: isConnected ? '#10b981' : 'var(--theme-primary)',
            backgroundColor: isConnected ? 'rgba(6, 78, 59, 0.3)' : 'rgba(8, 51, 68, 0.3)',
            boxShadow: isConnected ? '0 0 30px rgba(16,185,129,0.4)' : '0 0 30px var(--theme-glow)'
        }}
      >
        {/* Inner Ring */}
        <div 
            className={`absolute inset-2 rounded-full border border-dashed transition-all duration-[3000ms] ${isConnecting ? 'animate-spin' : ''}`}
            style={{
                borderColor: isConnected ? 'rgba(52, 211, 153, 0.5)' : 'var(--theme-glow)',
                transform: isConnected ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
        ></div>

        {/* Icon */}
        <Power 
          size={48} 
          className="transition-all duration-500"
          style={{
              color: isConnected ? '#34d399' : 'var(--theme-primary)',
              filter: isConnected ? 'drop-shadow(0 0 10px rgba(52,211,153,0.8))' : 'drop-shadow(0 0 10px var(--theme-glow))'
          }}
        />
        
        {/* Status Text (Floating below inside button for cool effect) */}
        <div className="absolute -bottom-10 whitespace-nowrap">
           <span 
                className="text-sm font-display tracking-widest transition-colors duration-300"
                style={{ color: isConnected ? '#34d399' : 'var(--theme-primary)' }}
            >
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