import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Center, Heading, HStack, ScrollView, Text, VStack } from 'native-base';

import { Button, Input, ScreenHeader, UserPhoto } from '@components/index';

const PHOTO_SIZE = 33;

const Profile: React.FC = () => {
	const [isPhotoLoading, setIsPhotoLoading] = React.useState<boolean>(false);

	return (
		<VStack flex={1}>
			<ScreenHeader title='Perfil' />

			<ScrollView>
				<Center mt={6} px={10}>
					<UserPhoto
						size={PHOTO_SIZE}
						source={{ uri: 'https://github.com/henrique1204.png' }}
						alt='Imagem de perfil do usuário.'
						loading={isPhotoLoading}
					/>

					<TouchableOpacity>
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
