import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Exercise, History, Home, Profile } from '@screens/index';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
	return (
		<Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
			<Screen name='exercise' component={Exercise} />
			<Screen name='history' component={History} />
			<Screen name='home' component={Home} />
			<Screen name='profile' component={Profile} />
		</Navigator>
	);
};

export default AppRoutes;
