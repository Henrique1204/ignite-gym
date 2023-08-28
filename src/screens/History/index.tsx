import React from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { Heading, SectionList, Text, useToast, VStack } from 'native-base';

import { IHistoryByDayDTO } from '@types_/dtos/HistoryByDayDTO';

import { api } from '@services/api';

import AppError from '@utils/AppError';

import { ScreenHeader, HistoryCard, Loader } from '@components/index';

const History: React.FC = () => {
	const [exercises, setExercises] = React.useState<IHistoryByDayDTO[]>([]);

	const [loading, setLoading] = React.useState<boolean>(true);

	const toast = useToast();

	const fetchHistory = async () => {
		try {
			setLoading(true);
			const response = await api.get(`/history`);

			setExercises(response.data);
		} catch (error) {
			const isAppError = error instanceof AppError;

			const title = isAppError
				? error.message
				: 'Não foi possível carregar o histórico.';

			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			});
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			fetchHistory();
		}, [])
	);

	return (
		<VStack flex={1}>
			<ScreenHeader title='Histórico de Exercícios' />

			<Loader loading={loading}>
				<SectionList
					px={8}
					sections={exercises}
					keyExtractor={({ id }) => `history-exercise-${id}`}
					renderItem={({ item }) => <HistoryCard data={item} />}
					contentContainerStyle={
						exercises.length === 0 && {
							flex: 1,
							justifyContent: 'center',
						}
					}
					renderSectionHeader={({ section }) => (
						<Heading
							fontFamily='heading'
							color='gray.200'
							fontSize='md'
							mt={10}
							mb={3}
						>
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
			</Loader>
		</VStack>
	);
};

export default History;
