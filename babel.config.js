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
						'@hooks': './src/hooks',
						'@routes': './src/routes',
						'@screens': './src/screens',
						'@components': './src/components',
					},
				},
			],
		],
	};
};
