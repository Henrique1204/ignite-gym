import { api } from '@services/api';

export const getThumbUri = (thumb: string) => {
	return `${api.defaults.baseURL}/exercise/thumb/${thumb}`;
};

export const getDemoUri = (demo: string) => {
	return `${api.defaults.baseURL}/exercise/demo/${demo}`;
};
