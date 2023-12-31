import React from 'react';
import { TouchableOpacity } from 'react-native';

import {
	Center,
	Heading,
	ScrollView,
	Text,
	useToast,
	VStack,
} from 'native-base';

import { useFocusEffect } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { getAvatarUri } from '@helpers/getImage';
import { useAuthContext } from '@contexts/AuthContext';

import AppError from '@utils/AppError';

import { api } from '@services/api';

import { Button, Input, ScreenHeader, UserPhoto } from '@components/index';

import userPhotoDefault from '@assets/images/userPhotoDefault.png';

const PHOTO_SIZE = 33;

interface IFormDataProps {
	name: string;
	email: string;
	old_password: string;
	password: string;
	password_confirm: string;
}

const profileSchema = yup.object({
	name: yup.string().required('Informe o nome.'),
	email: yup.string().required('Informe o email.'),
	password: yup
		.string()
		.min(6, 'A senha deve ter pelo menos 6 dígitos.')
		.nullable()
		.transform((value) => (!!value ? value : null)),
	password_confirm: yup
		.string()
		.nullable()
		.transform((value) => (!!value ? value : null))
		.oneOf([yup.ref('password')], 'A confirmação de senha não confere.')
		.when('password', {
			is: (Field: any) => Field,
			then: (schema) =>
				schema
					.required('Informe a confirmação da senha')
					.nullable()
					.transform((value) => (!!value ? value : null)),
		}),
});

const Profile: React.FC = () => {
	const [isPhotoLoading, setIsPhotoLoading] = React.useState<boolean>(false);
	const [isUpdating, setIsUpdating] = React.useState<boolean>(false);

	const { user, updateUserProfile } = useAuthContext();

	const toast = useToast();

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormDataProps>({
		defaultValues: {
			name: user?.name,
			email: user?.email,
		},
		// @ts-ignore | Não reconhece o yupResolver por não ter validação pra todos os campos.
		resolver: yupResolver(profileSchema),
	});

	const handleUserPhotoSelect = async () => {
		try {
			setIsPhotoLoading(true);

			const photoSelected = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true,
			});

			const photoUri = photoSelected.assets?.[0].uri;

			if (photoSelected.canceled || !photoUri) return;

			const photoInfo = await FileSystem.getInfoAsync(photoUri);

			if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
				return toast.show({
					title: 'Essa imagem é muito grande, escolha uma de até 5mb.',
					placement: 'top',
					bg: 'red.500',
					mx: 4,
				});
			}

			const fileExtension = photoUri.split('.').pop();

			const photoFile = {
				name: `${user!.name
					.trim()
					.replace(/ /g, '-')}.${fileExtension}`.toLowerCase(),
				uri: photoUri,
				type: `${photoSelected.assets[0].type}/${fileExtension}`,
			} as any;

			const userPhotoUploadForm = new FormData();

			userPhotoUploadForm.append('avatar', photoFile);

			const avatarUpdatedResponse = await api.patch(
				'/users/avatar',
				userPhotoUploadForm,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			const userUpdated = { ...user! };
			userUpdated.avatar = avatarUpdatedResponse.data.avatar;

			updateUserProfile(userUpdated);

			toast.show({
				title: 'Foto atualizada!',
				placement: 'top',
				bgColor: 'green.500',
			});
		} catch (e) {
			console.log(e);
		} finally {
			setIsPhotoLoading(false);
		}
	};

	const handleProfileUpdate = handleSubmit(async (data) => {
		try {
			setIsUpdating(true);

			await api.put('/users', data);

			const userUpdated = { ...user! };
			userUpdated.name = data.name;

			await updateUserProfile(userUpdated);

			toast.show({
				title: 'Perfil atualizado com sucesso!',
				placement: 'top',
				bgColor: 'green.500',
			});
		} catch (e) {
			const isAppError = e instanceof AppError;

			toast.show({
				title: isAppError
					? e.message
					: 'Não foi possível atualizar os dados do perfil. Tente novamente mais tarde.',
				placement: 'top',
				bgColor: 'red.500',
			});
		} finally {
			setIsUpdating(false);
		}
	});

	useFocusEffect(
		React.useCallback(() => {
			reset();
		}, [])
	);

	return (
		<VStack flex={1}>
			<ScreenHeader title='Perfil' />

			<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
				<Center mt={6} px={10}>
					<UserPhoto
						size={PHOTO_SIZE}
						source={
							user?.avatar
								? { uri: getAvatarUri(user.avatar) }
								: userPhotoDefault
						}
						alt='Imagem de perfil do usuário.'
						loading={isPhotoLoading}
					/>

					<TouchableOpacity onPress={handleUserPhotoSelect}>
						<Text
							color='green.500'
							fontWeight='bold'
							fontSize='md'
							mt={2}
							mb={8}
						>
							Alterar foto
						</Text>
					</TouchableOpacity>

					<Controller
						name='name'
						control={control}
						render={({ field: { value, onChange } }) => (
							<Input
								bg='gray.600'
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
						render={({ field: { value } }) => (
							<Input bg='gray.600' value={value} isDisabled />
						)}
					/>
				</Center>

				<VStack px={10} mt={12} mb={9} flex={1}>
					<Heading fontFamily='heading' color='gray.200' fontSize='md' mb={2}>
						Alterar senha
					</Heading>

					<Controller
						name='old_password'
						control={control}
						render={({ field: { value, onChange } }) => (
							<Input
								secureTextEntry
								bg='gray.600'
								placeholder='Senha antiga'
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
								secureTextEntry
								bg='gray.600'
								placeholder='Nova senha'
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
								secureTextEntry
								bg='gray.600'
								placeholder='Confirma a nova senha'
								value={value}
								onChangeText={onChange}
								errorMessage={errors.password_confirm?.message}
							/>
						)}
					/>

					<Button
						title='Atualizar'
						mt={4}
						isLoading={isUpdating}
						onPress={handleProfileUpdate}
					/>
				</VStack>
			</ScrollView>
		</VStack>
	);
};

export default Profile;
