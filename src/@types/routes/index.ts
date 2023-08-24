import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type IAppRoutes = {
	exercise: {
		exerciseId: string;
	};
	history: undefined;
	home: undefined;
	profile: undefined;
};

export type IAppNavigatorRoutesProps = BottomTabNavigationProp<IAppRoutes>;
