import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, SignIn } from '@screens/index';

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
	return (
		<Navigator initialRouteName='signIn' screenOptions={{ headerShown: false }}>
			<Screen name='home' component={Home} />
			<Screen name='signIn' component={SignIn} />
		</Navigator>
	);
};

export default AppRoutes;
