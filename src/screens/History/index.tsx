import React from 'react';

import { VStack } from 'native-base';

import { ScreenHeader, HistoryCard } from '@components/index';

const History: React.FC = () => {
	return (
		<VStack>
			<ScreenHeader title='Histórico de Exercícios' />

			<HistoryCard />
			<HistoryCard />
			<HistoryCard />
		</VStack>
	);
};

export default History;
