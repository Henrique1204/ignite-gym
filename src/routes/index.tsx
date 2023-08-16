import React from 'react';

import { Box, useTheme } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { useAuthContext } from '@contexts/AuthContext';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import Loader from '@components/Loader';

const Routes: React.FC = () => {
	const { colors } = useTheme();

	const theme = DefaultTheme;
	theme.colors.background = colors.gray[700];

	const { user, isLoadingStorageData } = useAuthContext();

	return (
		<Loader loading={isLoadingStorageData}>
			<Box bg='gray.700' flex={1}>
				<NavigationContainer theme={theme}>
					{user === null ? <AuthRoutes /> : <AppRoutes />}
				</NavigationContainer>
			</Box>
		</Loader>
	);
};

export default Routes;
