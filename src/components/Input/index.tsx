import React from 'react';

import { Input as NativeBaseInput, IInputProps } from 'native-base';

const Input: IComponent<IInputProps> = (props) => {
	return (
		<NativeBaseInput
			h={14}
			px={4}
			borderWidth={0}
			mb={4}
			fontSize='md'
			fontFamily='body'
			color='white'
			bg='gray.700'
			placeholderTextColor='gray.300'
			_focus={{
				bg: 'gray.700',
				borderWidth: 1,
				borderColor: 'green.500',
			}}
			{...props}
		/>
	);
};

export default Input;
