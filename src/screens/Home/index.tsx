import React from 'react';

import { FlatList, VStack } from 'native-base';

import { Group, HomeHeader } from '@components/index';

const GROUPS = ['costas', 'bíceps', 'tríceps', 'ombro'];

const Home: React.FC = () => {
	const [groups, setGroups] = React.useState<string[]>(GROUPS);

	const [groupActive, setGroupActive] = React.useState<string>('');

	const handleChangeGroup = (name: string) => () => setGroupActive(name);

	return (
		<VStack>
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
		</VStack>
	);
};

export default Home;
