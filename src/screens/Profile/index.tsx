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

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Button, Input, ScreenHeader, UserPhoto } from '@components/index';

const PHOTO_SIZE = 33;

const DEFAULT_PHOTO = 'https://github.com/henrique1204.png';

const Profile: React.FC = () => {
	const [isPhotoLoading, setIsPhotoLoading] = React.useState<boolean>(false);

	const [userPhoto, setUserPhoto] = React.useState<string>(DEFAULT_PHOTO);

	const toast = useToast();

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

			setUserPhoto(photoUri);
		} catch (e) {
			console.log(e);
		} finally {
			setIsPhotoLoading(false);
		}
	};

	return (
		<VStack flex={1}>
			<ScreenHeader title='Perfil' />

			<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
				<Center mt={6} px={10}>
					<UserPhoto
						size={PHOTO_SIZE}
						source={{ uri: userPhoto }}
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

					<Input bg='gray.600' placeholder='Nome' value='Paulo Henrique' />
					<Input bg='gray.600' value='pauloh16.pdr@gmail.com' isDisabled />
				</Center>

				<VStack px={10} mt={12} mb={9} flex={1}>
					<Heading color='gray.200' fontSize='md' mb={2}>
						Alterar senha
					</Heading>

					<Input bg='gray.600' placeholder='Senha antiga' secureTextEntry />

					<Input bg='gray.600' placeholder='Nova senha' secureTextEntry />

					<Input
						bg='gray.600'
						placeholder='Confirma a nova senha'
						secureTextEntry
					/>

					<Button title='Atualizar' mt={4} />
				</VStack>
			</ScrollView>
		</VStack>
	);
};

export default Profile;
