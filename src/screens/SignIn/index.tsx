import React from 'react';
import { VStack, Image, Center, Heading } from 'native-base';

import LogoSvg from '@icons/logo.svg';

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

			<Center my={24}>
				<LogoSvg />
			</Center>

			<Center>
				<Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
					Treine sua mente e o seu corpo
				</Heading>
			</Center>
		</VStack>
	);
};

export default SignIn;
