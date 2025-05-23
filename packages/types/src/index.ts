// Re-export database types
export * from './database'

// Game enums
export enum CropType {
  WHEAT = 'wheat',
  CORN = 'corn',
  POTATO = 'potato',
  CARROT = 'carrot',
  TOMATO = 'tomato',
}

export enum BuildingType {
  HOUSE = 'house',
  BARN = 'barn',
  SILO = 'silo',
  MARKET = 'market',
  SALOON = 'saloon',
}

// Game interfaces
export interface Player {
  id: string
  x: number
  y: number
  coins: number
  inventory: string[]
}

export interface Crop {
  type: CropType
  plantedAt: number
  growthStage: number
}

export interface Building {
  type: BuildingType
  x: number
  y: number
  level: number
}

// Game constants
export const GRID_SIZE = 32
export const TILE_SIZE = 32
export const MAX_INVENTORY_SIZE = 50
export const GROWTH_STAGES = 4
export const CROP_GROWTH_TIME = {
  [CropType.WHEAT]: 5 * 60 * 1000, // 5 minutes
  [CropType.CORN]: 10 * 60 * 1000,
  [CropType.POTATO]: 15 * 60 * 1000,
  [CropType.CARROT]: 8 * 60 * 1000,
  [CropType.TOMATO]: 12 * 60 * 1000,
} 