import axios, { AxiosError, AxiosInstance } from 'axios';

import AppError from '@utils/AppError';
import { storageTokenGet, storageTokenSave } from '@storage/storageToken';

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

				return new Promise(async (resolve, reject) => {
					try {
						const { data } = await api.post('/sessions/refresh-token', {
							refresh_token: tokens.refreshToken,
						});

						await storageTokenSave(data.token, data.refresh_token);

						if (originalRequestConfig.data) {
							originalRequestConfig.data = JSON.parse(
								originalRequestConfig.data
							);
						}

						originalRequestConfig.headers = {
							authorization: `Bearer ${data.token}`,
						};

						api.defaults.headers.common[
							'authorization'
						] = `Bearer ${data.token}`;

						failedQueue.forEach((request) => request.onSuccess(data.token));

						resolve(api(originalRequestConfig));
					} catch (error: any) {
						failedQueue.forEach((request) => request.onFailure(error));

						signOut();
						reject(error);
					} finally {
						isRefreshing = false;
						failedQueue = [];
					}
				});
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
