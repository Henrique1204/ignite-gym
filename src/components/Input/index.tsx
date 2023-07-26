import React from 'react';

import {
	Input as NativeBaseInput,
	IInputProps,
	FormControl,
} from 'native-base';

interface IInput extends IInputProps {
	errorMessage?: string;
}

const Input: IComponent<IInput> = ({
	errorMessage = null,
	isInvalid,
	...props
}) => {
	const invalid = !!errorMessage || isInvalid;

	return (
		<FormControl isInvalid={invalid} mb={4}>
			<NativeBaseInput
				h={14}
				px={4}
				borderWidth={0}
				fontSize='md'
				fontFamily='body'
				color='white'
				bg='gray.700'
				placeholderTextColor='gray.300'
				isInvalid={invalid}
				_invalid={{
					borderWidth: 1,
					borderColor: 'red.500',
				}}
				_focus={{
					bg: 'gray.700',
					borderWidth: 1,
					borderColor: 'green.500',
				}}
				{...props}
			/>

			<FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
		</FormControl>
	);
};

export default Input;
