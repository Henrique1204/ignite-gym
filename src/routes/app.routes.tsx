import React from 'react';
import { VStack } from 'native-base';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, SignIn, SignUp } from '@screens/index';

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
	return (
		<VStack flex={1} bg='gray.700'>
			<Navigator
				initialRouteName='signUp'
				screenOptions={{ headerShown: false }}
			>
				<Screen name='home' component={Home} />
				<Screen name='signIn' component={SignIn} />
				<Screen name='signUp' component={SignUp} />
			</Navigator>
		</VStack>
	);
};

export default AppRoutes;
