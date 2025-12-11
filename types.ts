export enum ConnectionState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTING = 'DISCONNECTING'
}

export interface ServerLocation {
  id: string;
  name: string;
  countryCode: string; // ISO 2-letter code
  city: string;
  latency: number; // ms
  load: number; // percentage
  coordinates: [number, number]; // [longitude, latitude]
  premium?: boolean;
}

export interface ConnectionStats {
  downloadSpeed: number; // Mbps
  uploadSpeed: number; // Mbps
  dataUsed: number; // MB
  duration: number; // seconds
  ipAddress: string;
  protocol: 'WireGuard' | 'OpenVPN' | 'IKEv2';
}

export interface AIMessage {
  type: 'info' | 'warning' | 'success';
  text: string;
}
