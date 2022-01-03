import Message from './message'

const initData = (ws) => {
    Message.find().sort({ created_at: -1 }).limit(100)
        .exec((err, res) => {
            if (err) throw err
            sendData(['init', res], ws)
        })
}

const sendData = async (data, ws) => {
    await ws.send(JSON.stringify(data))
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws)
}



export { sendData, sendStatus, initData }