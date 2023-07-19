import React from 'react';

import { Heading, SectionList, Text, VStack } from 'native-base';

import { ScreenHeader, HistoryCard } from '@components/index';

interface IExerciseType {
	title: string;
	data: string[];
}

const History: React.FC = () => {
	const [exercise, setExercise] = React.useState<IExerciseType[]>([
		{
			title: '26.08.22',
			data: ['Puxada frontal', 'Remada unilateral'],
		},
		{
			title: '27.08.22',
			data: ['Puxada frontal'],
		},
	]);

	return (
		<VStack flex={1}>
			<ScreenHeader title='Histórico de Exercícios' />

			<SectionList
				px={8}
				sections={exercise}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <HistoryCard />}
				contentContainerStyle={
					exercise.length === 0 && {
						flex: 1,
						justifyContent: 'center',
					}
				}
				renderSectionHeader={({ section }) => (
					<Heading color='gray.200' fontSize='md' mt={10} mb={3}>
						{section.title}
					</Heading>
				)}
				ListEmptyComponent={() => (
					<Text color='gray.100' textAlign='center'>
						Não há exercícios registrados ainda.{'\n'}
						Vamos fazer exercícios hoje?
					</Text>
				)}
			/>
		</VStack>
	);
};

export default History;
