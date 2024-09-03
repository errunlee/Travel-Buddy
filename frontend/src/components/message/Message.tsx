import { UserContext } from '@/context/UserContext';
import { useContext, useState } from 'react';
import { socket } from '../../socket';
import { MessageCircle } from 'lucide-react';

const Message = ({ trip }: { trip: string }) => {
	const [content, setContent] = useState('');
	const { user } = useContext(UserContext);
	// const [showMessageIcon, setShowMessageIcon] = useState(true);
	// if (showMessageIcon) {
	// 	return <MessageCircle className="fixed bottom-12 right-[3rem]" />;
	// }
	return (
		<div className="absolute right-5 bottom-10">
			<div>
				<form
					className="border border-3 m-auto w-400"
					onSubmit={(e) => {
						e.preventDefault();
						socket.emit('chat message', {
							username: user.username,
							content: content,
							trip: trip
						});
					}}
				>
					<input
						className="w-400"
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<button>send</button>
				</form>
			</div>
		</div>
	);
};
export default Message;
