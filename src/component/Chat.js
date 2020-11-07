import { Avatar, IconButton, } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import '../CSS/Chat.css'

import { InsertEmoticon, Message, SearchOutlined, } from '@material-ui/icons'
import { AttachFile } from '@material-ui/icons'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicSharpIcon from '@material-ui/icons/MicSharp';
import { useParams } from 'react-router-dom'
import db from '../firebase'
import { useStateValue } from '../StateProvider'
import firebase from 'firebase'

function Chat() {
	const [input, setInput] = useState('')
	const { roomId } = useParams();
	const [roomName, setRoomName] = useState('')
	const [seed, setseed] = useState('');
	const [messages, setMessages] = useState([]);
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		if (roomId) {
			db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
				setRoomName(snapshot.data().name)
			))

			db.collection('rooms')
				.doc(roomId)
				.collection('messages')
				.orderBy('timestamp', 'asc')
				.onSnapshot((snapshot) => (
					setMessages(snapshot.docs.map((doc) => doc.data()))
				))
		}
	}, [roomId])

	// const right = true;

	useEffect(() => {
		setseed(Math.floor(Math.random() * 3000));
	}, [roomId])

	const sendMessage = (e) => {
		e.preventDefault();

		db.collection('rooms')
			.doc(roomId).collection('messages').add({
				message: input,
				name: user.displayName,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			})
		setInput('')
	}

	return (
		<div className='chat'>
			<div className='chat_header'>
				<Avatar src={'https://avatars.dicebear.com/api/human/' + seed + '.svg'} />

				<div className='chat_headerInfo'>
					<h3>{roomName}</h3>
					<p>Last seen {' '}
						{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleString()}
					</p>
				</div>
				<div className='chat_headerRight'>
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>


			<div className='chat_body'>
				{messages.map((message) => (
					<p className={(message.name === user.displayName) ? "chat_reciever" : "chat_message"}>
						<span className='chat_name'>
							{message.name}</span>
						{message.message}
						<span className='chat_timestamp'>{new Date(message.timestamp?.toDate()).toLocaleTimeString()} </span>
					</p>
				))}
			</div>


			<div className='chat_footer'>
				<div className=''></div>
				<IconButton>
					<InsertEmoticon />
				</IconButton>
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type='text'
						placeholder='Type a message' />
					<button onClick={sendMessage} type="submit">send a messeage</button>
				</form>
				<IconButton>
					<MicSharpIcon />
				</IconButton>
			</div>
		</div >
	)
}

export default Chat

