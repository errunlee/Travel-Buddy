import { Post } from '@/models/Post';
import PostComponent from './Post';
import { fetchPosts } from '@/api/test/test';

const Posts = ({ posts }: { posts: Post[] }) => {
	fetchPosts();
	return (
		<div className="w-[650px] my-20 mx-auto space-y-5 ">
			{posts.map((post, idx) => {
				return <PostComponent key={idx} {...post} />;
			})}
		</div>
	);
};
export default Posts;
