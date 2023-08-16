import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Heading, HStack, VStack, Text, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuthContext } from '@contexts/AuthContext';

import userPhotoDefault from '@assets/images/userPhotoDefault.png';

import UserPhoto from '../UserPhoto';

const HomeHeader: IComponent = () => {
	const { user } = useAuthContext();

	return (
		<HStack bg='gray.600' pt={16} pb={5} px={8} alignItems='center'>
			<UserPhoto
				size={16}
				source={
					user?.avatar
						? {
								uri: user?.avatar,
						  }
						: userPhotoDefault
				}
				alt='Imagem de perfil do usuário.'
				mr={4}
			/>

			<VStack flex={1}>
				<Text color='gray.100' fontSize='md'>
					Olá,
				</Text>

				<Heading fontFamily='heading' color='gray.100' fontSize='md'>
					{user?.name}
				</Heading>
			</VStack>

			<TouchableOpacity>
				<Icon as={MaterialIcons} name='logout' color='gray.200' size={7} />
			</TouchableOpacity>
		</HStack>
	);
};

export default HomeHeader;
