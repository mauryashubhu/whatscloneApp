import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import  db  from '../firebase';

import '../CSS/Sidebar.css'

import SidebarChat from './SidebarChat'
import { useStateValue } from '../StateProvider';

function Sidebar() {
	const [rooms, setRooms] = React.useState([])
	const [ { user }, dispatch] = useStateValue();
	
	React.useEffect(() => {
		const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
			
			setRooms(snapshot.docs.map(doc =>
				({
					id: doc.id,
					data: doc.data(),

				})
			))
		))

		return () => {
			unsubscribe();
		}

	}, [])

	return (
		<div className='sidebar'>
			{/* <h1>sidebar component</h1> */}
			<div className='sidebar_header'>
				<Avatar  src={user?.photoURL} />
				<div className='sidebar_headerRight'>
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>


			<div className='sidbar_search'>
				<div className='sidebar_searchContainer'>
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<input placeholder="Search or start new chat" type="tect" />
				</div>

			</div>

			<div className='sidebar_chats'>
				<SidebarChat addNewChat />
				{
					rooms.map((room ) => (
						<SidebarChat key ={room.id} 
						id = {room.id} 
						name = {room.data.Name || room.data.name} />
					))
				}
			</div>
		</div>
	)
}

export default Sidebar
