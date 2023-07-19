import React from 'react';

import { Center, ScrollView, VStack } from 'native-base';

import { ScreenHeader, UserPhoto } from '@components/index';

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
				</Center>
			</ScrollView>
		</VStack>
	);
};

export default Profile;
