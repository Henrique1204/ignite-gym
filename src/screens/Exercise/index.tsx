import React from 'react';

import { TouchableOpacity } from 'react-native';
import { Heading, HStack, Icon, Text, VStack } from 'native-base';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { IAppNavigatorRoutesProps } from '@types_/routes';

import BodySvg from '@assets/icons/body.svg';

const Exercise: React.FC = () => {
	const { navigate } = useNavigation<IAppNavigatorRoutesProps>();

	const handleGoBack = () => navigate('home');

	return (
		<VStack flex={1}>
			<VStack px={8} bg='gray.600' pt={12}>
				<TouchableOpacity onPress={handleGoBack}>
					<Icon as={Feather} name='arrow-left' color='green.500' size={6} />
				</TouchableOpacity>

				<HStack
					mt={4}
					mb={8}
					justifyContent='space-between'
					alignItems='center'
				>
					<Heading color='gray.100' fontSize='lg' flexShrink={1}>
						Puxada frontal
					</Heading>

					<HStack alignItems='center'>
						<BodySvg />

						<Text color='gray.200' ml={1} textTransform='capitalize'>
							Costas
						</Text>
					</HStack>
				</HStack>
			</VStack>
		</VStack>
	);
};

export default Exercise;
