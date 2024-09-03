import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Lock } from 'lucide-react'; // Importing icons from lucide-react

type Props = {};

const Login = (props: Props) => {
	// Define validation schema
	const schema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required')
	});

	const form = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: yupResolver(schema)
	});

	const onSubmit = (values: any) => {
		console.log(values);
		// Add your login logic here
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				<Form {...form}>
					<div className="mb-4">
						<div className="relative">
							<Mail className="absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400" />
							<Input
								form={form}
								label="Email"
								name="email"
								type="email"
								placeholder="Enter your email"
								className="pl-10" // Add padding to make room for the icon
							/>
						</div>
					</div>
					<div className="mb-6">
						<div className="relative">
							<Lock className="absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400" />
							<Input
								form={form}
								label="Password"
								name="password"
								type="password"
								placeholder="Enter your password"
								className="pl-10" // Add padding to make room for the icon
							/>
						</div>
					</div>
					<Button
						onClick={form.handleSubmit(onSubmit)}
						type="submit"
						className="w-full"
					>
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default Login;
