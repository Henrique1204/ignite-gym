import React from 'react';

import { ScrollView, VStack, Image, Center, Text, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

import { IAuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Button, Input } from '@components/index';

import LogoSvg from '@icons/logo.svg';
import BackgroundImage from '@images/background.png';

interface IFormDataProps {
	name: string;
	email: string;
	password: string;
	password_confirm: string;
}

const SignUp: React.FC = () => {
	const { control, handleSubmit } = useForm<IFormDataProps>({
		defaultValues: {
			email: '',
			name: '',
			password: '',
			password_confirm: '',
		},
	});

	const { navigate } = useNavigation<IAuthNavigatorRoutesProps>();

	const goToSignIn = () => navigate('signIn');

	const handleSignUp = handleSubmit((data) => {
		console.log(data);
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

				<Center mb={24}>
					<Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
						Crie sua conta
					</Heading>

					<Controller
						name='name'
						control={control}
						render={({ field: { value, onChange } }) => (
							<Input placeholder='Nome' value={value} onChangeText={onChange} />
						)}
					/>

					<Controller
						name='email'
						control={control}
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder='E-mail'
								keyboardType='email-address'
								autoCapitalize='none'
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>

					<Controller
						name='password'
						control={control}
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder='Senha'
								secureTextEntry
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>

					<Controller
						name='password_confirm'
						control={control}
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder='Confirme a senha'
								secureTextEntry
								value={value}
								onChangeText={onChange}
								onSubmitEditing={handleSignUp}
								returnKeyType='send'
							/>
						)}
					/>

					<Button title='Criar e acessar' onPress={handleSignUp} />
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
