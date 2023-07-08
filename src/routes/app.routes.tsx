import React from 'react';
import { VStack } from 'native-base';

import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { Exercise, History, Home, Profile } from '@screens/index';

type IAppRoutes = {
	exercise: undefined;
	history: undefined;
	home: undefined;
	profile: undefined;
};

export type IAppNavigatorRoutesProps = NativeStackNavigationProp<IAppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<IAppRoutes>();

const AppRoutes: React.FC = () => {
	return (
		<VStack flex={1} bg='gray.700'>
			<Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
				<Screen name='exercise' component={Exercise} />
				<Screen name='history' component={History} />
				<Screen name='home' component={Home} />
				<Screen name='profile' component={Profile} />
			</Navigator>
		</VStack>
	);
};

export default AppRoutes;
