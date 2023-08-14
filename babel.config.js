module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						'@types_': './src/@types',
						'@helpers': './src/core/helpers',
						'@utils': './src/core/utils',
						'@storage': './src/core/storage',
						'@assets': './src/core/assets',
						'@images': './src/core/assets/images',
						'@icons': './src/core/assets/icons',
						'@contexts': './src/contexts',
						'@hooks': './src/hooks',
						'@services': './src/services',
						'@routes': './src/routes',
						'@screens': './src/screens',
						'@components': './src/components',
					},
				},
			],
		],
	};
};
