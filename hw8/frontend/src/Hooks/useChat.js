import { useState } from "react"


const client = new WebSocket('ws://localhost:4000')

const useChat = () => {
    const [messages, setMessages] = useState([])
    const [status, setStatus] = useState({})

    client.onmessage = (byteString) => {
        const { data } = byteString
        const [task, payload] = JSON.parse(data)
        switch (task) {
            case 'init': {
                setMessages(() => payload)
                break
            }
            case 'output': {
                setMessages(() => [...messages, ...payload])
                break
            }
            case 'status': {
                setStatus(payload)
                break
            }
            case 'cleared': {
                setMessages([])
                break
            }
            default: break
        }
    }

    const sendData = (data) => {
        client.send(JSON.stringify(data))
    }

    const clearMessages = () => {
        sendData(['clear'])
    }

    const sendMessage = (payload) => { sendData(['input', payload]) }
    return { status, messages, sendMessage, clearMessages }


}

export default useChat;