import React from 'react';

import { IUserDTO } from '@types_/dtos/UserDTO';

import { api } from '@services/api';

import * as StorageUser from '@storage/storageUser';

import * as StorageToken from '@storage/storageToken';

type signInFn = (body: { email: string; password: string }) => Promise<void>;
type signOutFn = () => Promise<void>;
type updateUserProfileFn = (userUpdate: IUserDTO) => Promise<void>;

export interface IAuthContextData {
	user: IUserDTO | null;

	isLoadingStorageData: boolean;

	signIn: signInFn;
	signOut: signOutFn;
	updateUserProfile: updateUserProfileFn;
}

export const AuthContext = React.createContext<IAuthContextData>(
	{} as IAuthContextData
);

export const AuthContextProvider: IComponentWithChildren = ({ children }) => {
	const [user, setUser] = React.useState<IUserDTO | null>(null);

	const [isLoadingStorageData, setIsLoadingStorageData] =
		React.useState<boolean>(true);

	const userAndTokenUpdate = (userData: IUserDTO, token: string) => {
		api.defaults.headers['authorization'] = `Bearer ${token}`;

		setUser(userData);
	};

	const storageUseAndTokenSave = async (
		userData: IUserDTO,
		token?: string,
		refreshToken?: string
	) => {
		try {
			setIsLoadingStorageData(true);

			await StorageUser.storageUserSave(userData);

			if (token && refreshToken) {
				await StorageToken.storageTokenSave(token, refreshToken);
			}
		} catch (e) {
			throw e;
		} finally {
			setIsLoadingStorageData(false);
		}
	};

	const signIn: signInFn = async (body) => {
		try {
			const { data } = await api.post('/sessions', body);

			if (!data.user || !data.token || !data.refresh_token) return;

			await storageUseAndTokenSave(data.user, data.token, data.refresh_token);

			userAndTokenUpdate(data.user, data.token);
		} catch (e) {
			throw e;
		}
	};

	const signOut: signOutFn = async () => {
		try {
			setIsLoadingStorageData(true);

			setUser(null);

			StorageUser.storageUserClear();
			StorageToken.storageTokenClear();
		} catch (e) {
			throw e;
		} finally {
			setIsLoadingStorageData(false);
		}
	};

	const updateUserProfile: updateUserProfileFn = async (userUpdate) => {
		try {
			setUser(userUpdate);

			await storageUseAndTokenSave(userUpdate);
		} catch (e) {
			throw e;
		}
	};

	const loadUserData = async () => {
		try {
			setIsLoadingStorageData(true);

			const userLogged = await StorageUser.storageUserGet();
			const tokens = await StorageToken.storageTokenGet();

			if (tokens && userLogged) userAndTokenUpdate(userLogged, tokens.token);
		} catch (e) {
			throw e;
		} finally {
			setIsLoadingStorageData(false);
		}
	};

	React.useEffect(() => {
		loadUserData();
	}, []);

	React.useEffect(() => {
		const subscribe = api.registerInterceptTokenManager(signOut);

		return () => {
			subscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, isLoadingStorageData, signIn, signOut, updateUserProfile }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => React.useContext(AuthContext);
