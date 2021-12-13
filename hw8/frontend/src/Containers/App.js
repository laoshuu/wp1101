// import './App.css'
import useChat from '../Hooks/useChat'
import { useEffect, useState } from "react"
import SignIn from './signIn'
import ChatRoom from './ChatRoom'
import Backgroud from '../Components/Backgroud'
import { message } from 'antd'

function App() {
  const LOCALSTORAGE_KEY = "save-me"
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [me, setMe] = useState(savedMe || '')
  const [signedIn, setSignedIn] = useState(false)
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    if (signedIn)
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    displayStatus(status)
  }, [status, signedIn, me])

  return (
    <div>
      <Backgroud>
        {signedIn ? (<ChatRoom me={me} messages={messages} clearMessages={clearMessages} sendMessage={sendMessage} displayStatus={displayStatus} />) :
          <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus} />}
      </Backgroud>

    </div>
  )
}

export default App
