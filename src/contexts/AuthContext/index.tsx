import React from 'react';

import { IUserDTO } from '@types_/dtos/UserDTO';

import { api } from '@services/api';

import * as StorageUser from '@storage/storageUser';

import * as StorageToken from '@storage/storageToken';

type signInFn = (body: { email: string; password: string }) => Promise<void>;
type signOutFn = () => Promise<void>;

export interface IAuthContextData {
	user: IUserDTO | null;

	isLoadingStorageData: boolean;

	signIn: signInFn;
	signOut: signOutFn;
}

export const AuthContext = React.createContext<IAuthContextData>(
	{} as IAuthContextData
);

export const AuthContextProvider: IComponentWithChildren = ({ children }) => {
	const [user, setUser] = React.useState<IUserDTO | null>(null);

	const [isLoadingStorageData, setIsLoadingStorageData] =
		React.useState<boolean>(true);

	const userAndTokenUpdate = (userData: IUserDTO, token: string) => {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		setUser(userData);
	};

	const storageUseAndTokenSave = async (userData: IUserDTO, token: string) => {
		try {
			setIsLoadingStorageData(true);

			await StorageUser.storageUserSave(userData);
			await StorageToken.storageTokenSave(token);
		} catch (e) {
			throw e;
		} finally {
			setIsLoadingStorageData(false);
		}
	};

	const signIn: signInFn = async (body) => {
		try {
			const { data } = await api.post<{ user: IUserDTO; token: string }>(
				'/sessions',
				body
			);

			if (!data.user || !data.token) return;

			await storageUseAndTokenSave(data.user, data.token);

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

	const loadUserData = async () => {
		try {
			setIsLoadingStorageData(true);

			const userLogged = await StorageUser.storageUserGet();
			const token = await StorageToken.storageTokenGet();

			if (token && userLogged) userAndTokenUpdate(userLogged, token);
		} catch (e) {
			throw e;
		} finally {
			setIsLoadingStorageData(false);
		}
	};

	React.useEffect(() => {
		loadUserData();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, isLoadingStorageData, signIn, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => React.useContext(AuthContext);
