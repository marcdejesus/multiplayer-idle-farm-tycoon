import { Room, Client } from '@colyseus/core'
import { FarmState } from '../schema/FarmState'

export class FarmRoom extends Room<FarmState> {
  onCreate() {
    this.setState(new FarmState())

    // Handle player movement
    this.onMessage('move', (client, data) => {
      const player = this.state.players.get(client.sessionId)
      if (!player) return

      player.x = data.x
      player.y = data.y
    })

    // Handle crop planting
    this.onMessage('plant', (client, data) => {
      const player = this.state.players.get(client.sessionId)
      if (!player) return

      // Add crop to farm grid
      this.state.crops.set(`${data.x},${data.y}`, {
        type: data.cropType,
        plantedAt: Date.now(),
        growthStage: 0,
      })
    })
  }

  onJoin(client: Client) {
    console.log(`Player ${client.sessionId} joined!`)
    
    // Create player instance
    this.state.players.set(client.sessionId, {
      id: client.sessionId,
      x: 0,
      y: 0,
      coins: 100,
      inventory: [],
    })
  }

  onLeave(client: Client) {
    console.log(`Player ${client.sessionId} left!`)
    this.state.players.delete(client.sessionId)
  }
} 