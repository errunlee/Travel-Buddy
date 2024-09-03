import Navbar from '@/components/Nav/Navbar';
import Posts from '@/components/post/Posts';
import { Dialog } from '@/components/ui/dialog';
import AddPost from './AddPost';
import { api } from '@/api/instance';
import { useEffect, useState } from 'react';
// import { AddPost } from "./AddPost";

const Home: React.FC = () => {
	const [posts, setPosts] = useState([] as any);

	const getPosts = async () => {
		const res = await api.get('/api/trips/?format=json');
		console.log(res.data);
		setPosts(res.data);
	};

	useEffect(() => {
		getPosts();
	}, []);
	return (
		<div>
			<Posts posts={posts} />
			<Navbar />
		</div>
	);
};

export default Home;
