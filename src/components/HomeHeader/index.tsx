import React from 'react';

import { Heading, HStack, VStack, Text } from 'native-base';

import UserPhoto from '../UserPhoto';

const HomeHeader: IComponent = () => {
	return (
		<HStack bg='gray.600' pt={16} pb={5} px={8} alignItems='center'>
			<UserPhoto
				size={16}
				source={{ uri: 'https://github.com/henrique1204.png' }}
				alt='Imagem de perfil do usuário.'
				mr={4}
			/>

			<VStack>
				<Text color='gray.100' fontSize='md'>
					Olá,
				</Text>

				<Heading color='gray.100' fontSize='md'>
					Paulo
				</Heading>
			</VStack>
		</HStack>
	);
};

export default HomeHeader;
