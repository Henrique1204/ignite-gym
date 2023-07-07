import React from 'react';
import { VStack, Image, Center, Heading } from 'native-base';

import LogoSvg from '@icons/logo.svg';
import BackgroundImage from '@images/background.png';

import { Button, Input } from '@components/index';

const SignIn: React.FC = () => {
	return (
		<VStack flex={1} bg='gray.700' px={10}>
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

			<Input
				placeholder='E-mail'
				keyboardType='email-address'
				autoCapitalize='none'
			/>

			<Input placeholder='Senha' secureTextEntry />

			<Button title='Acessar' />

			<Button title='Criar conta' variant='outline' />
		</VStack>
	);
};

export default SignIn;
