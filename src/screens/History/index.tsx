import React from 'react';

import { Heading, SectionList, VStack } from 'native-base';

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
		<VStack>
			<ScreenHeader title='Histórico de Exercícios' />

			<SectionList
				sections={exercise}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <HistoryCard />}
				renderSectionHeader={({ section }) => (
					<Heading color='gray.200' fontSize='md' mt={10} mb={3}>
						{section.title}
					</Heading>
				)}
				px={8}
			/>
		</VStack>
	);
};

export default History;
