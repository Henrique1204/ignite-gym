import React from 'react';
import { Button as NativeBaseButton, Text } from 'native-base';

interface IButtonProps {
	title: string;
}

const Button: IComponent<IButtonProps> = ({ title, ...props }) => {
	return (
		<NativeBaseButton
			width='full'
			h={14}
			bg='green.700'
			rounded='sm'
			_pressed={{
				bg: 'green.500',
			}}
			{...props}
		>
			<Text color='white' fontFamily='heading' fontSize='sm'>
				{title}
			</Text>
		</NativeBaseButton>
	);
};

export default Button;
