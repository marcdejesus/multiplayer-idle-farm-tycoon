import { Schema, type, MapSchema } from '@colyseus/schema'

export class Player extends Schema {
  @type('string') id: string
  @type('number') x: number = 0
  @type('number') y: number = 0
  @type('number') coins: number = 100
  @type(['string']) inventory: string[] = []
}

export class Crop extends Schema {
  @type('string') type: string
  @type('number') plantedAt: number
  @type('number') growthStage: number = 0
}

export class FarmState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>()
  @type({ map: Crop }) crops = new MapSchema<Crop>()
} 