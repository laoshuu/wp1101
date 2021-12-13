import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import http from 'http'
import WebSocket from 'ws'
import Message from './message'
import { initData, sendData, sendStatus } from './wssConnect'
import { send } from 'process'

dotenv.config();

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((e) => { throw new Error("MongoDB connection error" + e) })

const db = mongoose.connection
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

db.once('open', () => {
    console.log('MongoDB connected!')
    wss.on('connection', (ws) => {
        initData(ws)
        const broadcastMessage = (data, status) => {
            wss.clients.forEach((client) => {
                sendData(data, client)
                sendStatus(status, client)
            })
        }
        ws.onmessage = async (byteString) => {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            // console.log([payload])
            switch (task) {
                case 'input': {
                    const { name, body } = payload
                    const message = new Message({ name, body })
                    try { await message.save() }
                    catch (e) { throw new Error("Message DB save error" + e) }

                    // sendData(['output', [payload]], ws)
                    // sendStatus({ type: 'success', msg: 'Message sent.' }, ws)
                    broadcastMessage(['output', [payload]], { type: 'success', msg: 'Message sent.' })
                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        // sendData(['cleared'], ws)
                        // sendStatus({ type: 'info', msg: 'Message cache cleared.' }, ws)
                        broadcastMessage(['cleared'], { type: 'info', msg: 'Message cache cleared.' })
                    })
                    break
                }

                default: break
            }
        }
    })
    const port = process.env.PORT || 4000
    server.listen(port, () => {
        console.log(`Server is up on port ${port}.`)
    })
})