declare module '*.svg' {
	import React from 'react';

	import { SvgProps } from 'react-native-svg';

	const content: IComponent<SvgProps>;

	export default content;
}
