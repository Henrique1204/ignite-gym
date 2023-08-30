import axios, { AxiosError, AxiosInstance } from 'axios';

import AppError from '@utils/AppError';
import { storageTokenGet } from '@storage/storageToken';

type singOutFn = () => void;

type IPromiseType = {
	onSuccess: (token: string) => void;
	onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
	registerInterceptTokenManager: (singOut: singOutFn) => () => void;
};

export const api = axios.create({
	baseURL: 'http://192.168.1.222:3333',
}) as APIInstanceProps;

let failedQueue: Array<IPromiseType> = [];
let isRefreshing: boolean = false;

api.registerInterceptTokenManager = (signOut) => {
	const interceptTokenManager = api.interceptors.response.use(
		(response) => response,
		async (requestError) => {
			if (requestError?.response?.status === 401) {
				const errorsMessage = ['token.expired', 'token.invalid'];

				if (!errorsMessage.includes(requestError.response.data?.message)) {
					return signOut();
				}

				const tokens = await storageTokenGet();

				if (!tokens?.refreshToken) {
					signOut();

					return Promise.reject(requestError);
				}

				const originalRequestConfig = requestError.config;

				if (isRefreshing) {
					return new Promise((resolve, reject) => {
						failedQueue.push({
							onSuccess: () => {
								originalRequestConfig.headers = {
									authorization: `Bearer ${tokens.token}`,
								};

								resolve(api(originalRequestConfig));
							},
							onFailure: (error) => reject(error),
						});
					});
				}

				isRefreshing = true;
			}

			if (requestError.response && requestError.response.data) {
				return Promise.reject(new AppError(requestError.response.data.message));
			}

			return Promise.reject(
				new AppError('Erro no servidor. Tente novamente mais tarde.')
			);
		}
	);

	return () => {
		api.interceptors.response.eject(interceptTokenManager);

		signOut();
	};
};
