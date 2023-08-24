import React from 'react';

import { TouchableOpacity } from 'react-native';

import {
	Box,
	Heading,
	HStack,
	Icon,
	Image,
	Text,
	VStack,
	ScrollView,
	useToast,
} from 'native-base';

import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { IAppNavigatorRoutesProps, IAppRoutes } from '@types_/routes';
import { IExerciseDTO } from '@types_/dtos/ExerciceDTO';

import { api } from '@services/api';

import { getDemoUri } from '@helpers/getImage';
import AppError from '@utils/AppError';

import { Button, Loader } from '@components/index';

import BodySvg from '@assets/icons/body.svg';
import SeriesSvg from '@assets/icons/series.svg';
import RepetitionsSvg from '@assets/icons/repetitions.svg';

const Exercise: React.FC = () => {
	const [exercise, setExercise] = React.useState<IExerciseDTO | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);

	const { navigate } = useNavigation<IAppNavigatorRoutesProps>();

	const route = useRoute();
	const { exerciseId } = route.params as IAppRoutes['exercise'];

	const toast = useToast();

	const handleGoBack = () => navigate('home');

	const fetchExerciseDetails = async () => {
		try {
			setLoading(true);
			const response = await api.get(`/exercises/${exerciseId}`);

			setExercise(response.data);
		} catch (error) {
			const isAppError = error instanceof AppError;

			const title = isAppError
				? error.message
				: 'Não foi possível carregar os detelhes dos exercícios.';

			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			});
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		fetchExerciseDetails();
	}, [exerciseId]);

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
					<Heading
						fontFamily='heading'
						color='gray.100'
						fontSize='lg'
						flexShrink={1}
					>
						{exercise?.name}
					</Heading>

					<HStack alignItems='center'>
						<BodySvg />

						<Text color='gray.200' ml={1} textTransform='capitalize'>
							{exercise?.group}
						</Text>
					</HStack>
				</HStack>
			</VStack>

			<Loader loading={loading}>
				<ScrollView>
					<VStack p={8}>
						{exercise?.demo && (
							<Box rounded='lg' mb={3} overflow='hidden'>
								<Image
									source={{ uri: getDemoUri(exercise.demo) }}
									alt='nome do exercício'
									w='full'
									height={80}
									resizeMode='cover'
								/>
							</Box>
						)}

						<Box bg='gray.600' rounded='md' pb={4} px={4}>
							<VStack>
								<HStack
									mb={6}
									mt={5}
									justifyContent='space-around'
									alignItems='center'
								>
									<HStack>
										<SeriesSvg />

										<Text color='gray.200' ml={2}>
											{exercise?.series} séries
										</Text>
									</HStack>

									<HStack>
										<RepetitionsSvg />

										<Text color='gray.200' ml={2}>
											{exercise?.repetitions} repetiç˜ies
										</Text>
									</HStack>
								</HStack>
								<Button title='Marcar como realizado' />
							</VStack>
						</Box>
					</VStack>
				</ScrollView>
			</Loader>
		</VStack>
	);
};

export default Exercise;
