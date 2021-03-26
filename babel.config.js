module.exports = function (api) {
	api.cache(true);

	return {
		'presets': [
			['@babel/preset-env', {
				'targets': [
					'> 1%',
					'ie 11'
				]
			}]
		]
	}
}