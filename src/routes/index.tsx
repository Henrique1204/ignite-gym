import React from 'react';

import { Box, useTheme } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
	const { colors } = useTheme();

	const theme = DefaultTheme;

	theme.colors.background = colors.gray[700];

	return (
		<Box bg='gray.700' flex={1}>
			<NavigationContainer theme={theme}>
				<AuthRoutes />
			</NavigationContainer>
		</Box>
	);
};

export default Routes;
