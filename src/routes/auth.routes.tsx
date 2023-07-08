import React from 'react';

import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { SignIn, SignUp } from '@screens/index';

type IAuthRoutes = {
	signIn: undefined;
	signUp: undefined;
};

export type IAuthNavigatorRoutesProps = NativeStackNavigationProp<IAuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<IAuthRoutes>();

const AuthRoutes: React.FC = () => {
	return (
		<Navigator initialRouteName='signIn' screenOptions={{ headerShown: false }}>
			<Screen name='signIn' component={SignIn} />
			<Screen name='signUp' component={SignUp} />
		</Navigator>
	);
};

export default AuthRoutes;
