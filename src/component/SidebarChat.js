import React from 'react'
import '../CSS/SidebarChat.css'
import { Avatar } from "@material-ui/core";
import db from '../firebase';
import { Link } from 'react-router-dom'

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setseed] = React.useState('');
    const [lastmessage, setLastMessage] = React.useState("");
    React.useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => (
                    setLastMessage(snapshot.docs.map((doc) => doc.data()))
                ))
        }
    }, [id])

    React.useEffect(() => {
        setseed(Math.floor(Math.random() * 3000));
    }, [])

    const createChat = () => {
        const roomName = prompt('Please enter name for chat');
        // alert(roomName)
        if (roomName) {
            // do some clever databse stuff...
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={'/rooms/' + id}>
            <div className='sidebarChat'>
                {/* <h1>hey</h1> */}
                <Avatar src={'https://avatars.dicebear.com/api/human/' + seed + '.svg'} />
                <div className='sidebarChat_info'>
                    <h2>{name}</h2>
                    <p>{lastmessage[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
            <div onClick={createChat}
                className='sidebarChat'>
                <h2>Add new Chat</h2>
            </div>
        )
}

export default SidebarChat
