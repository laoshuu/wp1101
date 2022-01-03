import Title from '../Components/Title'
import Messages from '../Components/Message'
import { Button, Input, Tag } from 'antd'
import { useState } from "react"


const ChatRoom = ({ me, messages, clearMessages, sendMessage, displayStatus }) => {
    const [body, setBody] = useState('')

    return (
        <>
            <Title>
                <h1>{me}'s Chat Room</h1>
                <Button type="primary" danger
                    onClick={clearMessages}>
                    Clear
                </Button>
            </Title>
            <Messages>{
                messages.map(({ name, body }, i) => (
                    <p className='App-message' key={i}>
                        <Tag color="blue">{name}</Tag>
                        {body}
                    </p>
                ))
            }
            </Messages>
            <Input.Search
                value={body}
                onChange={(e) => (setBody(e.target.value))}
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({ type: 'error', msg: 'Please enter a message body.' })
                    }
                    else {
                        sendMessage({ name: me, body: msg })
                        setBody('')
                    }
                }}
                enterButton="Send"
                placeholder="Type a message here..."
            ></Input.Search>
        </>
    )
}

export default ChatRoom