
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
  highSpeed?: boolean;
}

export interface ConnectionStats {
  downloadSpeed: number; // Mbps
  uploadSpeed: number; // Mbps
  dataUsed: number; // MB
  duration: number; // seconds
  ipAddress: string;
  protocol: string;
}

export interface LifetimeStats {
  totalDuration: number; // seconds
  totalDataTransfer: number; // MB
  successfulConnections: number;
}

export interface AIMessage {
  type: 'info' | 'warning' | 'success';
  text: string;
}

export interface AppTheme {
  id: string;
  name: string;
  primary: string; // Hex for primary accent
  secondary: string; // Hex for secondary/dim accent
}

export interface AppSettings {
  haptics: boolean;
  language: string;
  protocol: string;
  killSwitch: boolean;
  smartRouting: boolean;
  density: 'compact' | 'spacious';
  monetization: boolean;
  devMode: boolean;
  autoReconnect: boolean;
  reconnectDelay: number; // seconds
}
