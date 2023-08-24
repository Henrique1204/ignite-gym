import React from 'react';

import { Entypo } from '@expo/vector-icons';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base';

import { IExerciseDTO } from '@types_/dtos/ExerciceDTO';

import { getThumbUri } from '@helpers/getImage';

interface IExerciseCardProps
	extends TouchableOpacityProps,
		Omit<IExerciseDTO, 'id'> {}

const ExerciseCard: IComponent<IExerciseCardProps> = ({
	name,
	thumb,
	repetitions,
	series,
	...props
}) => {
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
					source={{ uri: getThumbUri(thumb) }}
					alt='Imagem do exercício'
					w={16}
					h={16}
					rounded='md'
					mr={4}
					resizeMode='cover'
				/>

				<VStack flex={1}>
					<Heading fontFamily='heading' fontSize='lg' color='white'>
						{name}
					</Heading>

					<Text fontSize='sm' color='gray.200' mt={1} numberOfLines={2}>
						{series} séries x {repetitions} repetições
					</Text>
				</VStack>

				<Icon as={Entypo} name='chevron-thin-right' color='gray.300' />
			</HStack>
		</TouchableOpacity>
	);
};

export default ExerciseCard;
