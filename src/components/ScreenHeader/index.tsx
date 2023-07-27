import React from 'react';

import { Center, Heading } from 'native-base';

interface IScreenHeader {
	title: string;
}

const ScreenHeader: IComponent<IScreenHeader> = ({ title }) => {
	return (
		<Center bg='gray.600' pb={6} pt={16}>
			<Heading fontFamily='heading' color='gray.100' fontSize='xl'>
				{title}
			</Heading>
		</Center>
	);
};

export default ScreenHeader;
