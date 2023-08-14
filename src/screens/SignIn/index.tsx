import React from 'react';
import { ScrollView, VStack, Image, Center, Text, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Controller, useForm } from 'react-hook-form';

import { IAuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Button, Input } from '@components/index';

import LogoSvg from '@icons/logo.svg';
import BackgroundImage from '@images/background.png';

type IFormDataProps = {
	email: string;
	password: string;
};

const SignIn: React.FC = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormDataProps>();

	const { navigate } = useNavigation<IAuthNavigatorRoutesProps>();

	const goToSignUp = () => navigate('signUp');

	const handleSignIn = handleSubmit(async (body) => {
		console.log(body);
	});

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
					<Controller
						name='email'
						control={control}
						rules={{ required: 'Informa o e-mail.' }}
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder='E-mail'
								keyboardType='email-address'
								autoCapitalize='none'
								value={value}
								onChange={onChange}
								errorMessage={errors.email?.message}
							/>
						)}
					/>

					<Controller
						name='password'
						control={control}
						rules={{ required: 'Informa a senha.' }}
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder='Senha'
								secureTextEntry
								value={value}
								onChange={onChange}
								errorMessage={errors.password?.message}
							/>
						)}
					/>

					<Button title='Acessar' onPress={handleSignIn} />
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
