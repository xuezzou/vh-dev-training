// I don't like making this a .js file but controlling it with comments is nice.
module.exports = {
	extends: ['typescript', /* 'typescript/react', */ 'airbnb', 'typescript/prettier'],
	// settings: {
	// 	'import/resolver': {
	// 		webpack: {
	// 			config: 'webpack.dev.js',
	// 		},
	// 	},
	// },
	plugins: ['sort-keys-fix'],
	rules: {
		'no-console': 'off',
		'prettier/prettier': 'error',
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

		// 'react/jsx-filename-extension': [
		// 	2,
		// 	{
		// 		extensions: ['.tsx', '.jsx'],
		// 	},
		// ],
		'sort-keys-fix/sort-keys-fix': ['error', 'asc', { caseSensitive: true, natural: true }],
		// 'jsx-a11y/label-has-associated-control': [
		// 	1,
		// 	{
		// 		labelComponents: ['CustomInputLabel'],
		// 		labelAttributes: ['label'],
		// 		controlComponents: ['CustomInput'],
		// 		assert: 'either',
		// 	},
		// ],
		// 'jsx-a11y/label-has-for': [0],
	},
};
