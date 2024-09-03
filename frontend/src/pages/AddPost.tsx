import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { DevTool } from '@hookform/devtools';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
	DialogClose
} from '@/components/ui/dialog';
import { Calendar, Image, User } from 'lucide-react'; // Import necessary icons
import { Form } from '@/components/ui/form';
import { addNewPost } from '@/api/post/addNewPost';

// Define the validation schema using Yup
const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	start_date: yup.string().required('Start date is required'),
	end_date: yup.string().required('End date is required')
	//   cover_image: yup.string().url("Invalid URL format").nullable(),
	//   participants: yup.array().nullable(),
});

type FormValues = yup.InferType<typeof schema>;

const AddPost = ({ isOpen, setIsOpen }) => {
	const form = useForm<any>({
		defaultValues: {
			title: '',
			description: '',
			start_date: '',
			end_date: '',
			cover_image: '',
			participants: ['1'],
			creator: '2'
		},
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data: any) => {
		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('start_date', data.start_date);
		formData.append('end_date', data.end_date);
		formData.append('participants', data.participants);
		formData.append('creator', data.creator);

		if (data.cover_image && data.cover_image.length > 0) {
			formData.append('cover_image', data.cover_image[0]);
		}

		try {
			await addNewPost(formData);
			console.log('Post added successfully');
			setIsOpen(false);
		} catch (error) {
			console.error('Error adding post:', error);
		}
	};

	return (
		<div>
			{/* Trigger button to open the dialog */}
			{/* <Button
				onClick={() => setIsOpen(true)}
				className="px-4 py-2 bg-blue-500 text-white rounded"
			>
				Add Post
			</Button> */}

			{/* Dialog component */}
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button onClick={() => setIsOpen(true)} className="hidden">
						Add Post
					</Button>
				</DialogTrigger>
				<DialogContent className="max-h-[550px] overflow-auto min-w-[70%]">
					<DialogHeader>
						<DialogTitle>Create New Post</DialogTitle>
						<DialogDescription>
							Fill in the details below to create a new post.
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<div className="mb-4">
							<Input
								icon={<User />}
								form={form}
								name="title"
								label="Title"
								type="text"
								placeholder="Enter the post title"
								className="pl-10"
							/>
						</div>
						<div className="mb-4">
							<Textarea
								id="description"
								name="description"
								label="Description"
								form={form}
								placeholder="Enter the post description"
							/>
						</div>
						<div className="mb-4">
							<Input
								icon={<Calendar />}
								form={form}
								name="start_date"
								label="Start Date"
								type="date"
								placeholder="Select start date"
								className="pl-10"
							/>
						</div>
						<div className="mb-4">
							<Input
								icon={<Calendar />}
								form={form}
								name="end_date"
								label="End Date"
								type="date"
								placeholder="Select end date"
								className="pl-10"
							/>
						</div>
						<div className="mb-4">
							<div className="mb-4">
								<label
									htmlFor="cover_image"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Cover Image
								</label>
								<input
									{...form.register('cover_image')}
									id="cover_image"
									name="cover_image"
									type="file"
									className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 dark:file:bg-gray-700 dark:file:text-gray-300 dark:file:border-gray-600 dark:file:hover:bg-gray-600"
								/>
							</div>
						</div>
						{/* <div className="mb-4">
              <Input
                icon={<User />}
                form={form}
                name="participants"
                label="Participants IDs (comma separated)"
                type="text"
                placeholder="Enter participant IDs"
                className="pl-10"
              />
            </div> */}
						<DialogFooter>
							<Button
								onClick={form.handleSubmit(onSubmit)}
								type="submit"
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								Add Post
							</Button>
							<DialogClose asChild>
								<Button
									type="button"
									className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
									onClick={() => setIsOpen(false)}
								>
									Cancel
								</Button>
							</DialogClose>
						</DialogFooter>
					</Form>
				</DialogContent>
			</Dialog>
			{/* <DevTool control={form.control} /> */}
		</div>
	);
};

export default AddPost;
