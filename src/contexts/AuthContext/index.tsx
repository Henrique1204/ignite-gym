import React from 'react';

import { IUserDTO } from '@types_/dtos/UserDTO';

import { api } from '@services/api';

type signInFn = (body: { email: string; password: string }) => Promise<void>;

export interface IAuthContextData {
	user: IUserDTO | null;
	signIn: signInFn;
}

export const AuthContext = React.createContext<IAuthContextData>(
	{} as IAuthContextData
);

export const AuthContextProvider: IComponentWithChildren = ({ children }) => {
	const [user, setUser] = React.useState<IUserDTO | null>(null);

	const signIn: signInFn = async (body) => {
		try {
			const { data } = await api.post('/sessions', body);

			if (data.user) setUser(data.user);
		} catch (e) {
			throw e;
		}
	};

	return (
		<AuthContext.Provider value={{ user, signIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => React.useContext(AuthContext);
