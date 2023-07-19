import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'native-base';

import {
	createBottomTabNavigator,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import { Exercise, History, Home, Profile } from '@screens/index';

import HistorySvg from '@icons/history.svg';
import HomeSvg from '@icons/home.svg';
import ProfileSvg from '@icons/profile.svg';

type IAppRoutes = {
	exercise: undefined;
	history: undefined;
	home: undefined;
	profile: undefined;
};

export type IAppNavigatorRoutesProps = BottomTabNavigationProp<IAppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<IAppRoutes>();

const AppRoutes: React.FC = () => {
	const { sizes, colors } = useTheme();

	const iconsSize = sizes[6];

	return (
		<Navigator
			initialRouteName='profile'
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.green[500],
				tabBarInactiveTintColor: colors.gray[200],
				tabBarStyle: {
					height: Platform.OS === 'android' ? 'auto' : 96,
					paddingBottom: sizes[10],
					paddingTop: sizes[6],
					borderTopWidth: 0,
					backgroundColor: colors.gray[600],
				},
			}}
		>
			<Screen
				name='home'
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<HomeSvg fill={color} width={iconsSize} height={iconsSize} />
					),
				}}
			/>

			<Screen
				name='history'
				component={History}
				options={{
					tabBarIcon: ({ color }) => (
						<HistorySvg fill={color} width={iconsSize} height={iconsSize} />
					),
				}}
			/>

			<Screen
				name='profile'
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<ProfileSvg fill={color} width={iconsSize} height={iconsSize} />
					),
				}}
			/>

			<Screen
				name='exercise'
				component={Exercise}
				options={{ tabBarButton: () => null }}
			/>
		</Navigator>
	);
};

export default AppRoutes;
