import React from 'react';

import { ScrollView, VStack, Image, Center, Text, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { IAuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Button, Input } from '@components/index';

import LogoSvg from '@icons/logo.svg';
import BackgroundImage from '@images/background.png';

const signUpSchema = yup.object({
	name: yup.string().required('Informe o nome.'),
	email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
	password: yup
		.string()
		.required('Informe a senha.')
		.min(6, 'A senha deve ter pelo menos 6 dígitos.'),
	password_confirm: yup
		.string()
		.required('Informe a senha de confirmação.')
		.oneOf([yup.ref('password')], 'A confirmação de senha não confere.'),
});

interface IFormDataProps {
	name: string;
	email: string;
	password: string;
	password_confirm: string;
}

const SignUp: React.FC = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormDataProps>({
		resolver: yupResolver(signUpSchema),
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

				<Center mb={12}>
					<Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
						Crie sua conta
					</Heading>

					<Controller
						name='name'
						control={control}
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder='Nome'
								value={value}
								onChangeText={onChange}
								errorMessage={errors.name?.message}
							/>
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
								errorMessage={errors.email?.message}
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
								errorMessage={errors.password?.message}
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
								errorMessage={errors.password_confirm?.message}
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
