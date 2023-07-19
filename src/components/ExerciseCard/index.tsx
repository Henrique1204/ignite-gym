import React from 'react';

import { Entypo } from '@expo/vector-icons';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base';

interface IExerciseCardProps extends TouchableOpacityProps {
	title: string;
}

const ExerciseCard: IComponent<IExerciseCardProps> = ({ title, ...props }) => {
	return (
		<TouchableOpacity {...props}>
			<HStack
				bg='gray.500'
				alignItems='center'
				p={2}
				pr={4}
				mb={3}
				rounded='md'
			>
				<Image
					source={{
						uri: 'data:image/jpeg;base64,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',
					}}
					alt='Imagem do exerício'
					w={16}
					h={16}
					rounded='md'
					mr={4}
					resizeMode='center'
				/>

				<VStack flex={1}>
					<Heading fontSize='lg' color='white'>
						{title}
					</Heading>

					<Text fontSize='sm' color='gray.200' mt={1} numberOfLines={2}>
						3 séries x 12 repetições
					</Text>
				</VStack>

				<Icon as={Entypo} name='chevron-thin-right' color='gray.300' />
			</HStack>
		</TouchableOpacity>
	);
};

export default ExerciseCard;