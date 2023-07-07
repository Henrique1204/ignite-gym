import React from 'react';

import {
	Button as NativeBaseButton,
	IButtonProps as INativeBaseButtonProps,
	Text,
} from 'native-base';

interface IButtonProps extends INativeBaseButtonProps {
	title: string;
	variant?: 'solid' | 'outline';
}

const Button: IComponent<IButtonProps> = ({
	title,
	variant = 'solid',
	...props
}) => {
	return (
		<NativeBaseButton
			width='full'
			h={14}
			borderWidth={variant === 'outline' ? 1 : 0}
			borderColor='green.500'
			bg={variant === 'outline' ? 'transparent' : 'green.700'}
			rounded='sm'
			_pressed={{
				bg: variant === 'outline' ? 'gray.500' : 'green.500',
			}}
			{...props}
		>
			<Text
				color={variant === 'outline' ? 'green.500' : 'white'}
				fontFamily='heading'
				fontSize='sm'
			>
				{title}
			</Text>
		</NativeBaseButton>
	);
};

export default Button;
