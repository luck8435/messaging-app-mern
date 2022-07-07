import React, { useEffect, useState} from 'react';
import './App.css';
import Pusher from 'pusher-js'
import Sidebar from './components/Sidebar.js'
import Chat from './components/Chat.js'
import axios from './components/axios.js'
import Login from './components/Login'
import {useStateValue} from './components/StateProvider.js'

function App() {
  const [messages, setMessages] = useState([])
  const [{user}] = useStateValue()
  // const [user, setUser]= useState(null)
  useEffect( () => {
    axios.get("/messages/sync").then(res => {
      setMessages(res.data)
    })
  }, [])
  useEffect( () => {
    const pusher = new Pusher("f0b5451baa2a7f214f66", {
      cluster: 'ap2'
    })
    const channel = pusher.subscribe('messages')
    channel.bind('inserted', (data) => {
      setMessages([...messages, data])
    })
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])
  console.log(messages)
  return (
    <div className="app">
      { !user ? <Login/>:(
      <div className="app__body">
        <Sidebar messages = {messages} />
        <Chat messages={messages}/>
      </div>
      )}
    </div>
  );
}

export default App;
