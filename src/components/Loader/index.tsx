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
		<Center flex={1} {...props}>
			<Spinner />
		</Center>
	);
};

export default Loader;
