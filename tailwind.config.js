const colors = require('tailwindcss/colors');
module.exports = {
	purge: ['./src/**/*.{js, jsx, ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				scrptai: [
					'Rubik',
					'sans-serif',
					// 'ui-serif',
					// 'Georgia',
					// 'Cambria',
					// '"Times New Roman"',
					// 'Times',
					// 'serif'
				],
			},

			colors: {
				teal: colors.teal,
				lime: colors.lime,
				cyan: colors.cyan,
				rose: colors.rose,
			},
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
			cursor: ['disabled'],
			margin: ['last'],
		},
	},
	plugins: [],
};
