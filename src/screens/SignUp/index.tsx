import React from 'react';

import { ScrollView, VStack, Image, Center, Text, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { IAuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Button, Input } from '@components/index';

import LogoSvg from '@icons/logo.svg';
import BackgroundImage from '@images/background.png';

const SignUp: React.FC = () => {
	const { navigate } = useNavigation<IAuthNavigatorRoutesProps>();

	const goToSignIn = () => navigate('signIn');

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<VStack flex={1} px={10} pb={16}>
				<Image
					source={BackgroundImage}
					defaultSource={BackgroundImage}
					alt='Pessoas se exercitando.'
					resizeMode='contain'
					position='absolute'
				/>

				<Center my={24}>
					<LogoSvg />

					<Text color='gray.100' fontSize='md'>
						Treine sua mente e o seu corpo
					</Text>
				</Center>

				<Center>
					<Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
						Crie sua conta
					</Heading>
				</Center>

				<Center mb={24}>
					<Input placeholder='Nome' />

					<Input
						placeholder='E-mail'
						keyboardType='email-address'
						autoCapitalize='none'
					/>

					<Input placeholder='Senha' secureTextEntry />

					<Button title='Criar e acessar' />
				</Center>

				<Button
					title='Voltar para login'
					variant='outline'
					onPress={goToSignIn}
				/>
			</VStack>
		</ScrollView>
	);
};

export default SignUp;
