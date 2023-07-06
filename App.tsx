import React from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { THEME } from '@assets/theme/index';

import Routes from './src/routes';

import { Loader } from '@components/index';

const App: React.FC = () => {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold,
	});

	return (
		<NativeBaseProvider theme={THEME}>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>

			<Loader
				loading={!fontsLoaded}
				accessibilityLabel='Animação de carregamento esperando arquivos carregarem.'
				aria-hidden={fontsLoaded}
			>
				<Routes />
			</Loader>
		</NativeBaseProvider>
	);
};

export default App;
