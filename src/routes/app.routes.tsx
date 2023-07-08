import React from 'react';
import { VStack } from 'native-base';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@screens/index';

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
	return (
		<VStack flex={1} bg='gray.700'>
			<Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
				<Screen name='home' component={Home} />
			</Navigator>
		</VStack>
	);
};

export default AppRoutes;
