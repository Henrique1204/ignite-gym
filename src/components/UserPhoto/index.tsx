import React from 'react';

import { Image, IImageProps, Skeleton } from 'native-base';

interface IUserPhotoProps extends IImageProps {
	size: number;
	loading?: boolean;
}

const UserPhoto: IComponent<IUserPhotoProps> = ({
	testID = 'user-photo',
	size,
	loading,
	...props
}) => {
	if (loading) {
		return (
			<Skeleton
				w={size}
				height={size}
				rounded='full'
				startColor='gray.500'
				endColor='gray.400'
			/>
		);
	}

	return (
		<Image
			testID={testID}
			w={size}
			h={size}
			rounded='full'
			borderWidth={2}
			borderColor='gray.400'
			{...props}
		/>
	);
};

export default UserPhoto;
