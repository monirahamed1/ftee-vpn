import { ServerLocation } from './types';

export const SERVER_LOCATIONS: ServerLocation[] = [
  // North America
  { id: 'us-ny', name: 'United States', city: 'New York', countryCode: 'US', latency: 24, load: 45, coordinates: [-74.006, 40.7128], premium: false },
  { id: 'us-la', name: 'United States', city: 'Los Angeles', countryCode: 'US', latency: 65, load: 52, coordinates: [-118.2437, 34.0522], premium: false },
  { id: 'us-chi', name: 'United States', city: 'Chicago', countryCode: 'US', latency: 45, load: 38, coordinates: [-87.6298, 41.8781], premium: false },
  { id: 'us-mia', name: 'United States', city: 'Miami', countryCode: 'US', latency: 50, load: 60, coordinates: [-80.1918, 25.7617], premium: false },
  { id: 'us-dal', name: 'United States', city: 'Dallas', countryCode: 'US', latency: 55, load: 42, coordinates: [-96.7970, 32.7767], premium: false },
  { id: 'us-sea', name: 'United States', city: 'Seattle', countryCode: 'US', latency: 70, load: 35, coordinates: [-122.3321, 47.6062], premium: false },
  { id: 'us-sf', name: 'United States', city: 'San Francisco', countryCode: 'US', latency: 68, load: 48, coordinates: [-122.4194, 37.7749], premium: false },
  { id: 'us-atl', name: 'United States', city: 'Atlanta', countryCode: 'US', latency: 48, load: 40, coordinates: [-84.3880, 33.7490], premium: false },
  { id: 'us-den', name: 'United States', city: 'Denver', countryCode: 'US', latency: 60, load: 30, coordinates: [-104.9903, 39.7392], premium: false },
  { id: 'us-wdc', name: 'United States', city: 'Washington DC', countryCode: 'US', latency: 28, load: 55, coordinates: [-77.0369, 38.9072], premium: false },
  { id: 'us-bos', name: 'United States', city: 'Boston', countryCode: 'US', latency: 30, load: 42, coordinates: [-71.0589, 42.3601], premium: false },
  { id: 'us-hou', name: 'United States', city: 'Houston', countryCode: 'US', latency: 52, load: 46, coordinates: [-95.3698, 29.7604], premium: false },
  { id: 'us-phx', name: 'United States', city: 'Phoenix', countryCode: 'US', latency: 62, load: 33, coordinates: [-112.0740, 33.4484], premium: false },
  { id: 'ca-tor', name: 'Canada', city: 'Toronto', countryCode: 'CA', latency: 35, load: 44, coordinates: [-79.3832, 43.6532], premium: false },
  { id: 'ca-van', name: 'Canada', city: 'Vancouver', countryCode: 'CA', latency: 72, load: 36, coordinates: [-123.1207, 49.2827], premium: false },
  { id: 'ca-mtl', name: 'Canada', city: 'Montreal', countryCode: 'CA', latency: 38, load: 41, coordinates: [-73.5673, 45.5017], premium: false },
  { id: 'mx-mex', name: 'Mexico', city: 'Mexico City', countryCode: 'MX', latency: 80, load: 58, coordinates: [-99.1332, 19.4326], premium: false },

  // Europe
  { id: 'uk-lon', name: 'United Kingdom', city: 'London', countryCode: 'GB', latency: 89, load: 62, coordinates: [-0.1276, 51.5074], premium: false },
  { id: 'uk-man', name: 'United Kingdom', city: 'Manchester', countryCode: 'GB', latency: 92, load: 58, coordinates: [-2.2426, 53.4808], premium: false },
  { id: 'fr-par', name: 'France', city: 'Paris', countryCode: 'FR', latency: 95, load: 65, coordinates: [2.3522, 48.8566], premium: false },
  { id: 'de-ber', name: 'Germany', city: 'Berlin', countryCode: 'DE', latency: 98, load: 55, coordinates: [13.4050, 52.5200], premium: false },
  { id: 'de-fra', name: 'Germany', city: 'Frankfurt', countryCode: 'DE', latency: 96, load: 70, coordinates: [8.6821, 50.1109], premium: false },
  { id: 'nl-ams', name: 'Netherlands', city: 'Amsterdam', countryCode: 'NL', latency: 90, load: 75, coordinates: [4.9041, 52.3676], premium: false },
  { id: 'es-mad', name: 'Spain', city: 'Madrid', countryCode: 'ES', latency: 105, load: 48, coordinates: [-3.7038, 40.4168], premium: false },
  { id: 'it-rom', name: 'Italy', city: 'Rome', countryCode: 'IT', latency: 110, load: 50, coordinates: [12.4964, 41.9028], premium: false },
  { id: 'ch-zur', name: 'Switzerland', city: 'Zurich', countryCode: 'CH', latency: 100, load: 35, coordinates: [8.5417, 47.3769], premium: false },
  { id: 'se-sto', name: 'Sweden', city: 'Stockholm', countryCode: 'SE', latency: 115, load: 40, coordinates: [18.0686, 59.3293], premium: false },
  { id: 'no-osl', name: 'Norway', city: 'Oslo', countryCode: 'NO', latency: 118, load: 38, coordinates: [10.7522, 59.9139], premium: false },
  { id: 'pl-war', name: 'Poland', city: 'Warsaw', countryCode: 'PL', latency: 112, load: 45, coordinates: [21.0122, 52.2297], premium: false },
  { id: 'at-vie', name: 'Austria', city: 'Vienna', countryCode: 'AT', latency: 108, load: 42, coordinates: [16.3738, 48.2082], premium: false },
  { id: 'be-bru', name: 'Belgium', city: 'Brussels', countryCode: 'BE', latency: 93, load: 52, coordinates: [4.3517, 50.8503], premium: false },
  { id: 'ie-dub', name: 'Ireland', city: 'Dublin', countryCode: 'IE', latency: 88, load: 46, coordinates: [-6.2603, 53.3498], premium: false },
  { id: 'pt-lis', name: 'Portugal', city: 'Lisbon', countryCode: 'PT', latency: 102, load: 39, coordinates: [-9.1393, 38.7223], premium: false },
  { id: 'dk-cop', name: 'Denmark', city: 'Copenhagen', countryCode: 'DK', latency: 106, load: 41, coordinates: [12.5683, 55.6761], premium: false },
  { id: 'fi-hel', name: 'Finland', city: 'Helsinki', countryCode: 'FI', latency: 120, load: 33, coordinates: [24.9384, 60.1699], premium: false },
  { id: 'cz-pra', name: 'Czech Republic', city: 'Prague', countryCode: 'CZ', latency: 104, load: 47, coordinates: [14.4378, 50.0755], premium: false },
  { id: 'hu-bud', name: 'Hungary', city: 'Budapest', countryCode: 'HU', latency: 110, load: 43, coordinates: [19.0402, 47.4979], premium: false },
  { id: 'ro-buc', name: 'Romania', city: 'Bucharest', countryCode: 'RO', latency: 125, load: 36, coordinates: [26.1025, 44.4268], premium: false },
  { id: 'bg-sof', name: 'Bulgaria', city: 'Sofia', countryCode: 'BG', latency: 128, load: 30, coordinates: [23.3219, 42.6977], premium: false },
  { id: 'gr-ath', name: 'Greece', city: 'Athens', countryCode: 'GR', latency: 135, load: 50, coordinates: [23.7275, 37.9838], premium: false },
  { id: 'ua-kyi', name: 'Ukraine', city: 'Kyiv', countryCode: 'UA', latency: 130, load: 45, coordinates: [30.5238, 50.4501], premium: false },

  // Asia Pacific
  { id: 'jp-tok', name: 'Japan', city: 'Tokyo', countryCode: 'JP', latency: 150, load: 30, coordinates: [139.6917, 35.6895], premium: false },
  { id: 'jp-osa', name: 'Japan', city: 'Osaka', countryCode: 'JP', latency: 155, load: 28, coordinates: [135.5023, 34.6937], premium: false },
  { id: 'kr-seo', name: 'South Korea', city: 'Seoul', countryCode: 'KR', latency: 148, load: 35, coordinates: [126.9780, 37.5665], premium: false },
  { id: 'sg-sin', name: 'Singapore', city: 'Singapore', countryCode: 'SG', latency: 180, load: 20, coordinates: [103.8198, 1.3521], premium: false },
  { id: 'hk-hon', name: 'Hong Kong', city: 'Hong Kong', countryCode: 'HK', latency: 165, load: 45, coordinates: [114.1694, 22.3193], premium: false },
  { id: 'in-mum', name: 'India', city: 'Mumbai', countryCode: 'IN', latency: 190, load: 55, coordinates: [72.8777, 19.0760], premium: false },
  { id: 'in-ban', name: 'India', city: 'Bangalore', countryCode: 'IN', latency: 195, load: 50, coordinates: [77.5946, 12.9716], premium: false },
  { id: 'id-jak', name: 'Indonesia', city: 'Jakarta', countryCode: 'ID', latency: 200, load: 60, coordinates: [106.8456, -6.2088], premium: false },
  { id: 'th-ban', name: 'Thailand', city: 'Bangkok', countryCode: 'TH', latency: 185, load: 40, coordinates: [100.5018, 13.7563], premium: false },
  { id: 'vn-han', name: 'Vietnam', city: 'Hanoi', countryCode: 'VN', latency: 192, load: 38, coordinates: [105.8342, 21.0278], premium: false },
  { id: 'tw-tai', name: 'Taiwan', city: 'Taipei', countryCode: 'TW', latency: 168, load: 32, coordinates: [121.5654, 25.0330], premium: false },
  { id: 'my-kua', name: 'Malaysia', city: 'Kuala Lumpur', countryCode: 'MY', latency: 182, load: 25, coordinates: [101.6869, 3.1390], premium: false },

  // Oceania
  { id: 'au-syd', name: 'Australia', city: 'Sydney', countryCode: 'AU', latency: 210, load: 40, coordinates: [151.2093, -33.8688], premium: false },
  { id: 'au-mel', name: 'Australia', city: 'Melbourne', countryCode: 'AU', latency: 215, load: 38, coordinates: [144.9631, -37.8136], premium: false },
  { id: 'nz-auc', name: 'New Zealand', city: 'Auckland', countryCode: 'NZ', latency: 220, load: 30, coordinates: [174.7633, -36.8485], premium: false },

  // South America
  { id: 'br-sao', name: 'Brazil', city: 'Sao Paulo', countryCode: 'BR', latency: 140, load: 65, coordinates: [-46.6333, -23.5505], premium: false },
  { id: 'ar-bue', name: 'Argentina', city: 'Buenos Aires', countryCode: 'AR', latency: 155, load: 50, coordinates: [-58.3816, -34.6037], premium: false },
  { id: 'cl-san', name: 'Chile', city: 'Santiago', countryCode: 'CL', latency: 160, load: 45, coordinates: [-70.6693, -33.4489], premium: false },
  { id: 'co-bog', name: 'Colombia', city: 'Bogota', countryCode: 'CO', latency: 130, load: 55, coordinates: [-74.0721, 4.7110], premium: false },
  { id: 'pe-lim', name: 'Peru', city: 'Lima', countryCode: 'PE', latency: 135, load: 48, coordinates: [-77.0428, -12.0464], premium: false },

  // Africa & Middle East
  { id: 'za-joh', name: 'South Africa', city: 'Johannesburg', countryCode: 'ZA', latency: 230, load: 42, coordinates: [28.0473, -26.2041], premium: false },
  { id: 'eg-cai', name: 'Egypt', city: 'Cairo', countryCode: 'EG', latency: 145, load: 50, coordinates: [31.2357, 30.0444], premium: false },
  { id: 'ae-dub', name: 'UAE', city: 'Dubai', countryCode: 'AE', latency: 170, load: 35, coordinates: [55.2708, 25.2048], premium: false },
  { id: 'il-tel', name: 'Israel', city: 'Tel Aviv', countryCode: 'IL', latency: 140, load: 40, coordinates: [34.7818, 32.0853], premium: false },
  { id: 'tr-ist', name: 'Turkey', city: 'Istanbul', countryCode: 'TR', latency: 130, load: 58, coordinates: [28.9784, 41.0082], premium: false },
];

export const MOCK_IPS = {
  DISCONNECTED: '192.168.0.1 (Exposed)',
  CONNECTED: '104.28.14.92 (Masked)',
};