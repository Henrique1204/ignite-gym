import axios from 'axios';

import AppError from '@utils/AppError';

export const api = axios.create({
	baseURL: 'http://192.168.1.222:3333',
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error);
		if (error.response && error.response.data) {
			return Promise.reject(new AppError(error.response.data.message));
		}

		return Promise.reject(
			new AppError('Erro no servidor. Tente novamente mais tarde.')
		);
	}
);