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
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
		},
	},
	plugins: [],
};
