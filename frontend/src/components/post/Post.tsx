import { Post } from '@/models/Post';
import { useNavigate } from 'react-router-dom';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';

interface PostExtended extends Post {}

export default function PostComponent({
	id,
	title,
	description,
	start_date,
	end_date
}: PostExtended) {
	const navigate = useNavigate();

	return (
		<Card
			onClick={() => {
				navigate(`/post/${id}`);
			}}
			className="post-card-main"
		>
			<CardHeader className="card-header-main">
				<div>
					<p className=" font-semibold text-gray-800 capitalize">{title}</p>
					<p className="text-sm text-gray-500">Starts : ({start_date})</p>
				</div>
			</CardHeader>
			<CardContent>
				<h3 className="card-title-main">{title}</h3>
				<p className="card-desc-main">{description}</p>
			</CardContent>
			<CardFooter className="p-4">{/* Optional footer content */}</CardFooter>
		</Card>
	);
}
