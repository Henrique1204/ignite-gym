import React from 'react';
import { ScrollView, VStack, Image, Center, Text, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { IAuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Button, Input } from '@components/index';

import LogoSvg from '@icons/logo.svg';
import BackgroundImage from '@images/background.png';

const SignIn: React.FC = () => {
	const { navigate } = useNavigation<IAuthNavigatorRoutesProps>();

	const goToSignUp = () => navigate('signUp');

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
						Acesse sua conta
					</Heading>
				</Center>

				<Center>
					<Input
						placeholder='E-mail'
						keyboardType='email-address'
						autoCapitalize='none'
					/>

					<Input placeholder='Senha' secureTextEntry />

					<Button title='Acessar' />
				</Center>

				<Center mt={24}>
					<Text color='gray.100' fontSize='sm' mb={3} fontFamily='body'>
						Ainda não tem acesso?
					</Text>

					<Button title='Criar conta' variant='outline' onPress={goToSignUp} />
				</Center>
			</VStack>
		</ScrollView>
	);
};

export default SignIn;
