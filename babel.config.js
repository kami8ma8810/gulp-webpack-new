module.exports = function (api) {
	api.cache(true);

	const presets = [
		// プリセット指定でES2020をES5に変換
		'@babel/preset-env',
		{
			targets: ['web', 'es5'],
		},
	];

	return {
		presets,
	};
}