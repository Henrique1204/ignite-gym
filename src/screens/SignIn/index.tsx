import React from 'react';
import { Image, VStack } from 'native-base';

import BackgroundImage from '@images/background.png';

const SignIn: React.FC = () => {
	return (
		<VStack flex={1} bg='gray.700'>
			<Image
				source={BackgroundImage}
				alt='Pessoas se exercitando.'
				resizeMode='contain'
				position='absolute'
			/>
		</VStack>
	);
};

export default SignIn;
