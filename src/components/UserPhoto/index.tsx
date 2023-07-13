import React from 'react';

import { Image, IImageProps } from 'native-base';

interface IUserPhotoProps extends IImageProps {
	size: number;
}

const UserPhoto: IComponent<IUserPhotoProps> = ({
	testID = 'user-photo',
	size,
	...props
}) => {
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
