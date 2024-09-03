import axios from 'axios';

const token = localStorage.getItem('token');
export const api = axios.create({
	baseURL: 'http://192.168.40.65:8000',
	headers: {
		'Content-Type': 'application/json',
		Authorization: token ? `Bearer ${token}` : ''
	}
});
