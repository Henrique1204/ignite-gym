import React from 'react';

import { IUserDTO } from '@types_/dtos/UserDTO';

import { api } from '@services/api';
import { storageUserGet, storageUserSave } from '@storage/storageUser';

type signInFn = (body: { email: string; password: string }) => Promise<void>;

export interface IAuthContextData {
	user: IUserDTO | null;
	isLoadingStorageData: boolean;
	signIn: signInFn;
}

export const AuthContext = React.createContext<IAuthContextData>(
	{} as IAuthContextData
);

export const AuthContextProvider: IComponentWithChildren = ({ children }) => {
	const [user, setUser] = React.useState<IUserDTO | null>(null);
	const [isLoadingStorageData, setIsLoadingStorageData] =
		React.useState<boolean>(true);

	const signIn: signInFn = async (body) => {
		try {
			const { data } = await api.post('/sessions', body);

			if (!data.user) return;

			setUser(data.user);
			storageUserSave(data.user);
		} catch (e) {
			throw e;
		}
	};

	const loadUserData = async () => {
		try {
			const user = await storageUserGet();

			setUser(user);
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
		<AuthContext.Provider value={{ user, isLoadingStorageData, signIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => React.useContext(AuthContext);
