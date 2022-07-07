import React, { useEffect, useState } from 'react'
import {IconButton} from '@material-ui/core'
import { Avatar } from '@mui/material'
import MoreVert from '@mui/icons-material/MoreVert'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MicIcon from '@mui/icons-material/Mic'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import './Chat.css'
import { useStateValue} from './StateProvider.js'
import axios from './axios.js'

const Chat = ({ messages }) => {
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
    const [{ user }] = useStateValue()
    
    const sendMessage = async (e) => {        
        e.preventDefault()
        await axios.post('/messages/new', {
            message: input,
            name: user.displayName,
            timeStamp: new Date().toUTCString(),
            received: true
        })
        setInput("")
    }

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
                <div className='chat__headerInfo'>
                <h3>Dev Help</h3>
                    <p>Last seen at {" "}
                        {messages[messages.length -1]?.timeStamp}
                    </p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {messages.map(message => (
                    <React.Fragment key={Math.random()}>
                        <p className={`chat__message 
                        ${message.name === user.displayName  && 'chat__receiver'}`}>
                            <span
                            className="chat__name">{message.name}
                            </span>
                            {message.message}
                            <span className="chat__timestamp">
                                {message.timeStamp}
                            </span>
                        </p>
                    </React.Fragment>
                ))}
                
            </div>
            <div className='chat__footer'>
                <InsertEmoticonIcon/>
                <form>
                    <input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder='Type a message'
                        type='text'
                    />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat