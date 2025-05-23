// Environment configuration
export const env = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
}

// API endpoints
export const endpoints = {
  game: {
    ws: process.env.NEXT_PUBLIC_GAME_SERVER_URL || 'ws://localhost:3001',
    http: process.env.NEXT_PUBLIC_GAME_SERVER_HTTP || 'http://localhost:3001',
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
}

// Game configuration
export const gameConfig = {
  version: process.env.NEXT_PUBLIC_GAME_VERSION || '0.1.0',
  tickRate: 60, // Server updates per second
  maxPlayers: 100, // Max players per server
  startingCoins: 100,
  maxInventorySize: 50,
}

// Farm configuration
export const farmConfig = {
  gridSize: 32,
  tileSize: 32,
  maxBuildings: 10,
  maxCrops: 100,
}

// UI configuration
export const uiConfig = {
  chatMaxLength: 100,
  maxEmojisPerMessage: 5,
  profanityFilter: true,
}

// Database tables
export const dbTables = {
  users: 'users',
  farms: 'farms',
  inventory: 'inventory',
  transactions: 'transactions',
  achievements: 'achievements',
} 