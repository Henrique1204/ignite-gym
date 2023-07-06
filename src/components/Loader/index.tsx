import React from 'react';
import { Center, Spinner } from 'native-base';

interface ILoaderProps {
	loading: boolean;
}

const Loader: IComponentWithChildren<ILoaderProps> = ({
	children,
	loading,
	...props
}) => {
	if (!loading) return <>{children}</>;

	return (
		<Center flex={1} bg='gray.700' {...props}>
			<Spinner color='green.500' />
		</Center>
	);
};

export default Loader;
