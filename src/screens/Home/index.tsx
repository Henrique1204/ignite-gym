import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base';

import { IAppNavigatorRoutesProps } from '@types_/routes';

import { api } from '@services/api';

import AppError from '@utils/AppError';

import { ExerciseCard, Group, HomeHeader } from '@components/index';

const EXERCISES: string[] = [
	'Remada unilateral',
	'Rosca',
	'Rosca invertida',
	'Leg Press',
];

const Home: React.FC = () => {
	const [groups, setGroups] = React.useState<string[]>([]);
	const [exercises, setExercises] = React.useState<string[]>(EXERCISES);
	const [groupActive, setGroupActive] = React.useState<string>('');

	const { navigate } = useNavigation<IAppNavigatorRoutesProps>();

	const toast = useToast();

	const handleChangeGroup = (name: string) => () => setGroupActive(name);

	const handleOpenExercise = () => navigate('exercise');

	const fetchGroups = async () => {
		try {
			const response = await api.get('/groups');

			setGroups(response.data);
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

	React.useEffect(() => {
		fetchGroups();
	}, []);

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

			<VStack flex={1} px={8}>
				<HStack justifyContent='space-between' mb={5}>
					<Heading fontFamily='heading' color='gray.200' fontSize='md'>
						Exercícios
					</Heading>

					<Text color='gray.200' fontSize='sm'>
						4
					</Text>
				</HStack>

				<FlatList
					data={exercises}
					keyExtractor={(item, index) => item + '_' + index}
					renderItem={({ item }) => (
						<ExerciseCard title={item} onPress={handleOpenExercise} />
					)}
					showsVerticalScrollIndicator={false}
					_contentContainerStyle={{ paddingBottom: 20 }}
					my={10}
				/>
			</VStack>
		</VStack>
	);
};

export default Home;
