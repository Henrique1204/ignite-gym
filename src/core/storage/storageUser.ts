import AsyncStorage from '@react-native-async-storage/async-storage';

import { IUserDTO } from '@types_/dtos/UserDTO';

import { USER_STORAGE } from './storageConfig';

export const storageUserSave = async (user: IUserDTO) => {
	await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
};

export const storageUserGet = async (): Promise<IUserDTO | null> => {
	const user = await AsyncStorage.getItem(USER_STORAGE);

	if (!user) return null;

	return JSON.parse(user);
};

export const storageUserClear = async () => {
	await AsyncStorage.removeItem(USER_STORAGE);
};
