import React from 'react';

import { FlatList, Heading, HStack, Text, VStack } from 'native-base';

import { Group, HomeHeader } from '@components/index';

const GROUPS = ['costas', 'bíceps', 'tríceps', 'ombro'];

const Home: React.FC = () => {
	const [groups, setGroups] = React.useState<string[]>(GROUPS);

	const [groupActive, setGroupActive] = React.useState<string>('');

	const handleChangeGroup = (name: string) => () => setGroupActive(name);

	return (
		<VStack flex={1}>
			<HomeHeader />

			<FlatList
				data={groups}
				keyExtractor={(item, index) => item + '_' + index}
				renderItem={({ item }) => (
					<Group
						name={item}
						isActive={groupActive === item}
						onPress={handleChangeGroup(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				_contentContainerStyle={{ px: 8 }}
				my={10}
				maxH={10}
			/>

			<VStack flex={1} px={8}>
				<HStack justifyContent='space-between' mb={5}>
					<Heading color='gray.200' fontSize='md'>
						Exercícios
					</Heading>

					<Text color='gray.200' fontSize='sm'>
						4
					</Text>
				</HStack>
			</VStack>
		</VStack>
	);
};

export default Home;
