module.exports = {
	// addons: [
	// 	{
	// 	  name: "storybook-preset-craco",
	// 	  options: {
	// 		cracoConfigFile: "../craco.config.js",
	// 	  },
	// 	},
	//   ],
	style: {
		postcss: {
			plugins: [require('tailwindcss'), require('autoprefixer')],
		},
	},
};
