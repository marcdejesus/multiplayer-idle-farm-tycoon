import { Server } from '@colyseus/core'
import { WebSocketTransport } from '@colyseus/ws-transport'
import { monitor } from '@colyseus/monitor'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { config } from 'dotenv'
import { FarmRoom } from './rooms/FarmRoom'

// Load environment variables
config()

const port = Number(process.env.PORT) || 3001
const app = express()

// Enable CORS
app.use(cors())
app.use(express.json())

// Create WebSocket server
const server = createServer(app)
const gameServer = new Server({
  transport: new WebSocketTransport({
    server,
  }),
})

// Register game rooms
gameServer.define('farm', FarmRoom)

// Register monitor route
app.use('/colyseus', monitor())

// Start server
gameServer.listen(port)
console.log(`🎮 Game server running on ws://localhost:${port}`) 