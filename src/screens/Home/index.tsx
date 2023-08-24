import React from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base';

import { IAppNavigatorRoutesProps } from '@types_/routes';
import { IExerciseDTO } from '@types_/dtos/ExerciceDTO';

import { api } from '@services/api';

import AppError from '@utils/AppError';

import { ExerciseCard, Group, HomeHeader, Loader } from '@components/index';

const Home: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	const [groups, setGroups] = React.useState<string[]>([]);
	const [exercises, setExercises] = React.useState<IExerciseDTO[]>([]);
	const [groupActive, setGroupActive] = React.useState<string>('');

	const { navigate } = useNavigation<IAppNavigatorRoutesProps>();

	const toast = useToast();

	const handleChangeGroup = (name: string) => () => setGroupActive(name);

	const handleOpenExercise = (exerciseId: string) => {
		navigate('exercise', { exerciseId });
	};

	const fetchGroups = async () => {
		try {
			const response = await api.get('/groups');

			setGroups(response.data);
			setGroupActive(response.data[0]);
		} catch (error) {
			const isAppError = error instanceof AppError;

			const title = isAppError
				? error.message
				: 'Não foi possível carregar os grupos musculares.';

			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			});
		}
	};

	const fetchExerciseByGroup = async (group: string) => {
		try {
			setIsLoading(true);

			const response = await api.get(`/exercises/bygroup/${group}`);

			setExercises(response?.data);
		} catch (error) {
			const isAppError = error instanceof AppError;

			const title = isAppError
				? error.message
				: 'Não foi possível carregar os grupos exercícios.';

			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			});
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		fetchGroups();
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			fetchExerciseByGroup(groupActive);
		}, [groupActive])
	);

	return (
		<VStack flex={1}>
			<HomeHeader />

			<FlatList
				data={groups}
				keyExtractor={(item, index) => item + '_' + index}
				renderItem={({ item }) => (
					<Group
						name={item}
						isActive={groupActive.toLowerCase() === item.toLowerCase()}
						onPress={handleChangeGroup(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				_contentContainerStyle={{ px: 8 }}
				my={10}
				maxH={10}
				minH={10}
			/>

			<Loader loading={isLoading}>
				<VStack flex={1} px={8}>
					<HStack justifyContent='space-between' mb={5}>
						<Heading fontFamily='heading' color='gray.200' fontSize='md'>
							Exercícios
						</Heading>

						<Text color='gray.200' fontSize='sm'>
							{exercises.length}
						</Text>
					</HStack>

					<FlatList
						data={exercises}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<ExerciseCard
								{...item}
								id={item.id.toString()}
								onPress={() => handleOpenExercise(item.id.toString())}
							/>
						)}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{ paddingBottom: 20 }}
						my={10}
					/>
				</VStack>
			</Loader>
		</VStack>
	);
};

export default Home;
