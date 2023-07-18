import React from 'react';

import { VStack } from 'native-base';

import { ScreenHeader } from '@components/index';

const History: React.FC = () => {
	return (
		<VStack>
			<ScreenHeader title='Histórico de Exercícios' />
		</VStack>
	);
};

export default History;
