import React, { useEffect, useRef, useState } from 'react';
import { Terminal, X, Copy } from 'lucide-react';
import { ConnectionState, ServerLocation } from '../types';

interface TerminalLogProps {
  connectionState: ConnectionState;
  server: ServerLocation | null;
  onClose: () => void;
  protocol: string;
}

const TerminalLog: React.FC<TerminalLogProps> = ({ connectionState, server, onClose, protocol }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (text: string) => {
    setLogs(prev => {
        const newLogs = [...prev, `> ${text}`];
        // Limit log history for performance
        if (newLogs.length > 100) return newLogs.slice(newLogs.length - 100);
        return newLogs;
    });
  };

  // Auto-scroll on new logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Helper: Generate random hex hash
  const genHash = (len: number) => {
     const chars = '0123456789ABCDEF';
     let result = '';
     for (let i = 0; i < len; i++) result += chars[Math.floor(Math.random() * chars.length)];
     return result;
  };

  // Initial Boot Sequence
  useEffect(() => {
    setLogs([]); 
    addLog(`import m_ai_vpn as vpn`);
    addLog(`import sys`);
    addLog(`import cryptography`);
    addLog(`from network import Packet, Tunnel`);
    addLog(`sys.version_info(major=3, minor=12, micro=1)`);
    addLog(`vpn.core.init(protocol="${protocol}", security_level="MAX")`);
    addLog(`system.drivers.load("tun_tap")`);
    addLog(`> Driver loaded successfully.`);
    addLog(`system.ready()`);
  }, [protocol]);

  // Connection Logic
  useEffect(() => {
    if (connectionState === ConnectionState.CONNECTING && server) {
      const sessionID = genHash(16);
      const targetHash = genHash(32);
      
      const steps = [
        `sys.stdout.write("Initializing secure context...\\n")`,
        `session = vpn.Session(id="0x${sessionID}", mode="hardened")`,
        `# Resolving ${server.city} endpoint...`,
        `dns.resolver.query("${server.id}.node.net", record="AAAA")`,
        `> ${server.coordinates.map(c => c.toFixed(4)).join(',')}`,
        `crypto.pki.load_cert("/etc/keys/client.pem")`,
        `crypto.ecdh.generate_keypair(curve="secp384r1")`,
        `handshake.initiate(target="0x${targetHash}", method="ECDHE_ECDSA")`,
        `# Establishing secure channel...`,
        `net.socket.connect(addr="${(server.coordinates[1] + 90).toFixed(2)}.${(server.coordinates[0] + 180).toFixed(2)}:443")`,
        `auth.verify_signature(algo="SHA-384") -> OK`,
        `auth.challenge_response(latency=${server.latency}ms, jitter=${Math.floor(Math.random() * 5)}ms)`,
        `routing.bgp.announce_prefix("10.8.0.0/24")`,
        `firewall.punch_hole(port=${Math.floor(Math.random() * 60000) + 1024}, method="UDP", nat_type="symmetric")`,
        `tunnel.encapsulate(protocol="${protocol}", mtu=1420)`,
        `stream.alloc(buffer_size=8192, ring_buffer=True)`,
        `encryption.enable("CHACHA20-POLY1305")`,
        `vpn.interface.up("tun0")`,
        `vpn.connect(verify=True, leak_protection=True)`
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < steps.length) {
          addLog(steps[i]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Fast log speed
      return () => clearInterval(interval);

    } else if (connectionState === ConnectionState.CONNECTED) {
      addLog(`STATUS: CONNECTED`);
      addLog(`interface.tun0.state(UP)`);
      addLog(`ip.mask_active(True)`);
      addLog(`traffic.monitor.start(daemon=True)`);
      
      // Simulate ongoing traffic logs
      const interval = setInterval(() => {
         const ping = Math.floor(Math.random() * 20) + (server ? server.latency : 20);
         const packetSize = Math.floor(Math.random() * 1400) + 64;
         const throughput = (Math.random() * 500 + 50).toFixed(1);
         
         const actions = [
             `net.ipv4.tx(len=${packetSize}, flags="DF")`,
             `net.ipv4.rx(len=${Math.floor(Math.random() * 1500)}, ttl=${Math.floor(Math.random() * 64) + 30})`,
             `crypto.rekey(reason="interval") -> SUCCESS`,
             `keepalive.ping(${ping}ms) -> PONG`,
             `routing.table.check() -> OPTIMAL`,
             `dns.query(qname="*.google.com", qtype="A") -> NOERROR`,
             `threat.ids.scan(packet_id=${genHash(8)}) -> CLEAN`,
             `obfuscation.padding(size=${Math.floor(Math.random() * 256)})`,
             `metrics.emit(throughput=${throughput}Mbps, latency=${ping}ms)`
         ];
         
         // Randomly pick an action
         const randomAction = actions[Math.floor(Math.random() * actions.length)];
         addLog(randomAction);
      }, 600); // Frequent updates for dynamic feel
      return () => clearInterval(interval);

    } else if (connectionState === ConnectionState.DISCONNECTING) {
      const steps = [
          `connection.terminate(signal=SIGTERM)`,
          `tunnel.destroy()`,
          `cache.flush()`,
          `interface.tun0.down()`,
          `vpn.shutdown()`,
          `sys.exit(0)`
      ];
      let i = 0;
      const interval = setInterval(() => {
          if (i < steps.length) {
            addLog(steps[i]);
            i++;
          } else {
            clearInterval(interval);
          }
      }, 100);
      return () => clearInterval(interval);

    } else if (connectionState === ConnectionState.DISCONNECTED) {
      if (logs.length > 5 && !logs[logs.length-1].includes('DISCONNECTED')) {
        addLog(`STATUS: DISCONNECTED`);
        addLog(`waiting_for_input...`);
      }
    }
  }, [connectionState, server, protocol]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] h-64 bg-[#0d1117]/95 backdrop-blur-xl border-t border-slate-700 animate-in slide-in-from-bottom duration-300 font-mono text-xs flex flex-col shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-700">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal size={14} />
          <span className="font-bold">PYTHON CONSOLE - {server?.city || 'IDLE'}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-slate-500 hover:text-white transition-colors" title="Copy Log">
             <Copy size={14} />
          </button>
          <button onClick={onClose} className="text-slate-500 hover:text-red-400 transition-colors">
             <X size={14} />
          </button>
        </div>
      </div>

      {/* Logs Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-1 font-mono">
        {logs.map((log, index) => {
            // Simple syntax highlighting logic
            let colorClass = 'text-[#FFD43B]'; // Default Python yellow
            if (log.includes('error')) colorClass = 'text-red-400';
            else if (log.includes('STATUS')) colorClass = 'text-[var(--theme-primary)] font-bold';
            else if (log.includes('import') || log.includes('from ')) colorClass = 'text-purple-400';
            else if (log.startsWith('> #')) colorClass = 'text-slate-500 italic'; // Comments
            else if (log.includes('=')) colorClass = 'text-white';
            else if (log.includes('->')) colorClass = 'text-emerald-400';
            
            return (
              <div key={index} className="flex gap-2">
                <span className="text-slate-600 select-none w-6 text-right opacity-50">{(index + 1)}</span>
                <span className={`${colorClass} break-all`}>
                  {log}
                </span>
              </div>
            );
        })}
        {/* Blinking Cursor */}
        <div className="flex gap-2 animate-pulse mt-1">
           <span className="text-slate-600 select-none w-6 text-right opacity-50">{(logs.length + 1)}</span>
           <span className="text-[#3776AB]">_</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalLog;