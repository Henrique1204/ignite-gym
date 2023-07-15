import React from 'react';

import { HStack, VStack } from 'native-base';

import { Group, HomeHeader } from '@components/index';

const Home: React.FC = () => {
	return (
		<VStack>
			<HomeHeader />

			<HStack>
				<Group name='Costas' />
				<Group name='Ombro' />
			</HStack>
		</VStack>
	);
};

export default Home;
