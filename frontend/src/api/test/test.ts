import { api } from '../instance';

export const testme = async () => {
	const res = await api.get('https://jsonplaceholder.typicode.com/users');
	// console.log(res);
};

export const fetchPosts = async () => {
	const res = await api.get('http://10.10.18.195:8000/api/trips/');
	// console.log(res);
};
