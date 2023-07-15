import React from 'react';

import { Text, Pressable, IPressableProps } from 'native-base';

interface IGroupProps extends IPressableProps {
	name: string;
}

const Group: IComponent<IGroupProps> = ({ name, ...props }) => {
	return (
		<Pressable
			mr={3}
			w={24}
			h={10}
			bg='gray.600'
			rounded='md'
			justifyContent='center'
			alignItems='center'
			overflow='hidden'
			_pressed={{
				borderColor: 'green.500',
				borderWidth: 1,
			}}
			{...props}
		>
			<Text
				color='gray.200'
				textTransform='uppercase'
				fontSize='xs'
				fontWeight='bold'
			>
				{name}
			</Text>
		</Pressable>
	);
};

export default Group;
