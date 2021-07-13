const colors = require('tailwindcss/colors');
module.exports = {
	purge: ['./src/**/*.{js, jsx, ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				scrptai: ['Rubik', 'sans-serif'],
				emoji: [
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'NotoColorEmoji',
					'Noto Color Emoji',
					'Segoe UI Symbol',
					'Android Emoji',
					'EmojiSymbols',
				],
			},

			colors: {
				primary: colors.rose,
				teal: colors.teal,
				lime: colors.lime,
				cyan: colors.cyan,
				rose: colors.rose,
				emerald: colors.emerald,
				indigo: colors.indigo,
				purple: colors.purple,
			},
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
			cursor: ['disabled'],
			margin: ['last'],
			scale: ['group-hover'],
			animation: ['disabled', 'hover'],
		},
	},
	plugins: [],
};
