import React from 'react';

import { Center, ScrollView, VStack } from 'native-base';

import { ScreenHeader, UserPhoto } from '@components/index';

const Profile: React.FC = () => {
	return (
		<VStack flex={1}>
			<ScreenHeader title='Perfil' />

			<ScrollView>
				<Center mt={6} px={10}>
					<UserPhoto
						size={33}
						source={{ uri: 'https://github.com/henrique1204.png' }}
						alt='Imagem de perfil do usuário.'
					/>
				</Center>
			</ScrollView>
		</VStack>
	);
};

export default Profile;
