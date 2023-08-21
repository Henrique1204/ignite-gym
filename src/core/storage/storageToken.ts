import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE } from './storageConfig';

export const storageTokenSave = async (token: string) => {
	await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
};

export const storageTokenGet = async (): Promise<string | null> => {
	const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

	if (!token) return null;

	return token;
};

export const storageTokenClear = async () => {
	await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
};
