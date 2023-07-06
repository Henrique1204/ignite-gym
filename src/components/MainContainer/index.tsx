import React from 'react';
import { Center } from 'native-base';

const MainContainer: IComponentWithChildren = ({ children }) => {
	return (
		<Center flex={1} bg='gray.700'>
			{children}
		</Center>
	);
};

export default MainContainer;
