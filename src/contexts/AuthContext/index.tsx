import React from 'react';

import { IUserDTO } from '@types_/dtos/UserDTO';

export interface IAuthContextData {
	user: IUserDTO;
}

export const AuthContext = React.createContext<IAuthContextData>(
	{} as IAuthContextData
);

export const AuthContextProvider: IComponentWithChildren = ({ children }) => {
	const [user, setUser] = React.useState<IUserDTO>({
		avatar: '',
		email: '',
		id: '',
		name: '',
	});

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = () => React.useContext(AuthContext);
