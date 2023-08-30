import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE } from './storageConfig';

export const storageTokenSave = async (token: string, refreshToken: string) => {
	await AsyncStorage.setItem(
		AUTH_TOKEN_STORAGE,
		JSON.stringify({ token, refreshToken })
	);
};

export const storageTokenGet = async (): Promise<{
	token: string;
	refreshToken: string;
} | null> => {
	const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

	if (!response) return null;

	const { token, refreshToken } = JSON.parse(response);

	return { token, refreshToken };
};

export const storageTokenClear = async () => {
	await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
};
