import { ServerLocation } from './types';

// High Speed "Turbo" Servers
const HIGH_SPEED_SERVERS: ServerLocation[] = [
  { id: 'turbo-1', name: 'United States', city: 'New York (Turbo)', countryCode: 'US', latency: 8, load: 12, coordinates: [-74.006, 40.7128], premium: false, highSpeed: true },
  { id: 'turbo-2', name: 'United Kingdom', city: 'London (Turbo)', countryCode: 'GB', latency: 14, load: 18, coordinates: [-0.1276, 51.5074], premium: false, highSpeed: true },
  { id: 'turbo-3', name: 'Singapore', city: 'Singapore (Turbo)', countryCode: 'SG', latency: 18, load: 20, coordinates: [103.8198, 1.3521], premium: false, highSpeed: true },
  { id: 'turbo-4', name: 'Germany', city: 'Frankfurt (Turbo)', countryCode: 'DE', latency: 15, load: 22, coordinates: [8.6821, 50.1109], premium: false, highSpeed: true },
  { id: 'turbo-5', name: 'Japan', city: 'Tokyo (Turbo)', countryCode: 'JP', latency: 20, load: 15, coordinates: [139.6917, 35.6895], premium: false, highSpeed: true },
];

// Base list of major city hubs to generate servers from
const BASE_CITIES = [
  // North America
  { code: 'us-ny', country: 'United States', city: 'New York', cc: 'US', coords: [-74.006, 40.7128] },
  { code: 'us-la', country: 'United States', city: 'Los Angeles', cc: 'US', coords: [-118.2437, 34.0522] },
  { code: 'us-chi', country: 'United States', city: 'Chicago', cc: 'US', coords: [-87.6298, 41.8781] },
  { code: 'us-mia', country: 'United States', city: 'Miami', cc: 'US', coords: [-80.1918, 25.7617] },
  { code: 'us-dal', country: 'United States', city: 'Dallas', cc: 'US', coords: [-96.7970, 32.7767] },
  { code: 'us-sea', country: 'United States', city: 'Seattle', cc: 'US', coords: [-122.3321, 47.6062] },
  { code: 'us-sf', country: 'United States', city: 'San Francisco', cc: 'US', coords: [-122.4194, 37.7749] },
  { code: 'us-atl', country: 'United States', city: 'Atlanta', cc: 'US', coords: [-84.3880, 33.7490] },
  { code: 'us-den', country: 'United States', city: 'Denver', cc: 'US', coords: [-104.9903, 39.7392] },
  { code: 'us-wdc', country: 'United States', city: 'Washington DC', cc: 'US', coords: [-77.0369, 38.9072] },
  { code: 'ca-tor', country: 'Canada', city: 'Toronto', cc: 'CA', coords: [-79.3832, 43.6532] },
  { code: 'ca-van', country: 'Canada', city: 'Vancouver', cc: 'CA', coords: [-123.1207, 49.2827] },
  { code: 'ca-mtl', country: 'Canada', city: 'Montreal', cc: 'CA', coords: [-73.5673, 45.5017] },
  { code: 'mx-mex', country: 'Mexico', city: 'Mexico City', cc: 'MX', coords: [-99.1332, 19.4326] },
  
  // Europe
  { code: 'uk-lon', country: 'United Kingdom', city: 'London', cc: 'GB', coords: [-0.1276, 51.5074] },
  { code: 'uk-man', country: 'United Kingdom', city: 'Manchester', cc: 'GB', coords: [-2.2426, 53.4808] },
  { code: 'fr-par', country: 'France', city: 'Paris', cc: 'FR', coords: [2.3522, 48.8566] },
  { code: 'de-ber', country: 'Germany', city: 'Berlin', cc: 'DE', coords: [13.4050, 52.5200] },
  { code: 'de-fra', country: 'Germany', city: 'Frankfurt', cc: 'DE', coords: [8.6821, 50.1109] },
  { code: 'nl-ams', country: 'Netherlands', city: 'Amsterdam', cc: 'NL', coords: [4.9041, 52.3676] },
  { code: 'es-mad', country: 'Spain', city: 'Madrid', cc: 'ES', coords: [-3.7038, 40.4168] },
  { code: 'it-rom', country: 'Italy', city: 'Rome', cc: 'IT', coords: [12.4964, 41.9028] },
  { code: 'it-mil', country: 'Italy', city: 'Milan', cc: 'IT', coords: [9.1900, 45.4642] },
  { code: 'ch-zur', country: 'Switzerland', city: 'Zurich', cc: 'CH', coords: [8.5417, 47.3769] },
  { code: 'se-sto', country: 'Sweden', city: 'Stockholm', cc: 'SE', coords: [18.0686, 59.3293] },
  { code: 'no-osl', country: 'Norway', city: 'Oslo', cc: 'NO', coords: [10.7522, 59.9139] },
  { code: 'pl-war', country: 'Poland', city: 'Warsaw', cc: 'PL', coords: [21.0122, 52.2297] },
  { code: 'ro-buc', country: 'Romania', city: 'Bucharest', cc: 'RO', coords: [26.1025, 44.4268] },
  { code: 'ua-kyi', country: 'Ukraine', city: 'Kyiv', cc: 'UA', coords: [30.5238, 50.4501] },
  { code: 'fi-hel', country: 'Finland', city: 'Helsinki', cc: 'FI', coords: [24.9384, 60.1699] },
  { code: 'cz-pra', country: 'Czech Republic', city: 'Prague', cc: 'CZ', coords: [14.4378, 50.0755] },
  { code: 'at-vie', country: 'Austria', city: 'Vienna', cc: 'AT', coords: [16.3738, 48.2082] },

  // Asia
  { code: 'jp-tok', country: 'Japan', city: 'Tokyo', cc: 'JP', coords: [139.6917, 35.6895] },
  { code: 'jp-osa', country: 'Japan', city: 'Osaka', cc: 'JP', coords: [135.5023, 34.6937] },
  { code: 'kr-seo', country: 'South Korea', city: 'Seoul', cc: 'KR', coords: [126.9780, 37.5665] },
  { code: 'sg-sin', country: 'Singapore', city: 'Singapore', cc: 'SG', coords: [103.8198, 1.3521] },
  { code: 'hk-hon', country: 'Hong Kong', city: 'Hong Kong', cc: 'HK', coords: [114.1694, 22.3193] },
  { code: 'in-mum', country: 'India', city: 'Mumbai', cc: 'IN', coords: [72.8777, 19.0760] },
  { code: 'in-del', country: 'India', city: 'New Delhi', cc: 'IN', coords: [77.1025, 28.7041] },
  { code: 'id-jak', country: 'Indonesia', city: 'Jakarta', cc: 'ID', coords: [106.8456, -6.2088] },
  { code: 'th-ban', country: 'Thailand', city: 'Bangkok', cc: 'TH', coords: [100.5018, 13.7563] },
  { code: 'vn-han', country: 'Vietnam', city: 'Hanoi', cc: 'VN', coords: [105.8342, 21.0278] },
  { code: 'my-kua', country: 'Malaysia', city: 'Kuala Lumpur', cc: 'MY', coords: [101.6869, 3.1390] },
  { code: 'ph-man', country: 'Philippines', city: 'Manila', cc: 'PH', coords: [120.9842, 14.5995] },
  { code: 'tw-tai', country: 'Taiwan', city: 'Taipei', cc: 'TW', coords: [121.5654, 25.0330] },

  // Oceania
  { code: 'au-syd', country: 'Australia', city: 'Sydney', cc: 'AU', coords: [151.2093, -33.8688] },
  { code: 'au-mel', country: 'Australia', city: 'Melbourne', cc: 'AU', coords: [144.9631, -37.8136] },
  { code: 'au-per', country: 'Australia', city: 'Perth', cc: 'AU', coords: [115.8605, -31.9505] },
  { code: 'nz-auc', country: 'New Zealand', city: 'Auckland', cc: 'NZ', coords: [174.7633, -36.8485] },

  // South America
  { code: 'br-sao', country: 'Brazil', city: 'Sao Paulo', cc: 'BR', coords: [-46.6333, -23.5505] },
  { code: 'br-rio', country: 'Brazil', city: 'Rio de Janeiro', cc: 'BR', coords: [-43.1729, -22.9068] },
  { code: 'ar-bue', country: 'Argentina', city: 'Buenos Aires', cc: 'AR', coords: [-58.3816, -34.6037] },
  { code: 'cl-san', country: 'Chile', city: 'Santiago', cc: 'CL', coords: [-70.6693, -33.4489] },
  { code: 'co-bog', country: 'Colombia', city: 'Bogota', cc: 'CO', coords: [-74.0721, 4.7110] },
  { code: 'pe-lim', country: 'Peru', city: 'Lima', cc: 'PE', coords: [-77.0428, -12.0464] },

  // Africa / Middle East
  { code: 'za-joh', country: 'South Africa', city: 'Johannesburg', cc: 'ZA', coords: [28.0473, -26.2041] },
  { code: 'za-cap', country: 'South Africa', city: 'Cape Town', cc: 'ZA', coords: [18.4241, -33.9249] },
  { code: 'eg-cai', country: 'Egypt', city: 'Cairo', cc: 'EG', coords: [31.2357, 30.0444] },
  { code: 'ae-dub', country: 'UAE', city: 'Dubai', cc: 'AE', coords: [55.2708, 25.2048] },
  { code: 'tr-ist', country: 'Turkey', city: 'Istanbul', cc: 'TR', coords: [28.9784, 41.0082] },
  { code: 'il-tel', country: 'Israel', city: 'Tel Aviv', cc: 'IL', coords: [34.7818, 32.0853] },
  { code: 'sa-rya', country: 'Saudi Arabia', city: 'Riyadh', cc: 'SA', coords: [46.6753, 24.7136] },
];

function generateServerList(targetCount: number): ServerLocation[] {
  const servers: ServerLocation[] = [...HIGH_SPEED_SERVERS];
  const remainingCount = targetCount - HIGH_SPEED_SERVERS.length;
  // Ensure we cycle through cities enough times to hit target
  const locationsPerCity = Math.ceil(remainingCount / BASE_CITIES.length);
  
  BASE_CITIES.forEach((city, cityIdx) => {
    for (let i = 0; i < locationsPerCity; i++) {
      // Add randomness to stats to make them feel real
      const load = Math.floor(Math.random() * 85) + 5;
      
      // Calculate realistic latency based on region + jitter
      const baseLatency = city.cc === 'US' ? 30 : city.cc === 'GB' ? 45 : 90;
      const latencyJitter = Math.floor(Math.random() * 50) - 20;
      const latency = Math.max(12, baseLatency + latencyJitter + (i * 3)); 
      
      servers.push({
        id: `${city.code}-${i+1}-${cityIdx}`,
        name: city.country,
        city: `${city.city} Proxy #${i+1}`,
        countryCode: city.cc,
        latency: latency,
        load: load,
        coordinates: [city.coords[0] + (Math.random() * 0.1 - 0.05), city.coords[1] + (Math.random() * 0.1 - 0.05)], 
        premium: false 
      });
      
      // Stop exactly at target to avoid going over if division isn't clean
      if (servers.length >= targetCount) break;
    }
  });

  return servers;
}

// Generate 1024 Servers
export const SERVER_LOCATIONS: ServerLocation[] = generateServerList(1024);

export const MOCK_IPS = {
  DISCONNECTED: '192.168.0.1 (Exposed)',
  CONNECTED: '104.28.14.92 (Masked)',
};

export const APP_THEMES = [
  { id: 'cyan', name: 'Cyber Blue', primary: '#22d3ee', secondary: '#0891b2' },
  { id: 'emerald', name: 'Hacker Green', primary: '#34d399', secondary: '#059669' },
  { id: 'violet', name: 'Nebula Purple', primary: '#a78bfa', secondary: '#7c3aed' },
  { id: 'rose', name: 'Neon Rose', primary: '#fb7185', secondary: '#e11d48' },
  { id: 'python', name: 'Pythonic', primary: '#FFD43B', secondary: '#3776AB' },
  // New Themes
  { id: 'amber', name: 'Solar Flare', primary: '#fbbf24', secondary: '#d97706' },
  { id: 'fuchsia', name: 'Neon Tokyo', primary: '#e879f9', secondary: '#c026d3' },
  { id: 'sky', name: 'Arctic Frost', primary: '#38bdf8', secondary: '#0284c7' },
  { id: 'lime', name: 'Biohazard', primary: '#a3e635', secondary: '#65a30d' },
  { id: 'slate', name: 'Stealth Ops', primary: '#94a3b8', secondary: '#475569' },
];