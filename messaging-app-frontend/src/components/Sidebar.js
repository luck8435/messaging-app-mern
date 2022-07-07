import * as React from 'react';
import './Sidebar.css'
import Avatar from '@mui/material/Avatar'
import { Button } from '@material-ui/core'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat.js'
import { useStateValue } from './StateProvider'

const Sidebar = ( {messages} )  => {
    const [ {user}] = useStateValue()
    return ( 
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar__headerRight'>
                    <Button>
                        <DonutLargeIcon />
                    </Button>
                    <Button>
                        <ChatIcon/>
                    </Button>
                    <Button>
                        <MoreVertIcon/>
                    </Button>
                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlinedIcon/>
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat messages = {messages}/>
            </div>
        </div>
    )
}

export default Sidebar