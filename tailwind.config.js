const colors = require('tailwindcss/colors');
module.exports = {
	// purge: ['./src/**/*.{js, jsx, ts,tsx}', './public/index.html'],
	purge: {
		content: ['./src/**/*.{js, jsx, ts,tsx}', './public/index.html'],

		safelist: [
			'text-purple-800',
			'text-yellow-800',
			'text-lime-800',
			'text-cyan-800',
			'text-teal-800',
			'text-indigo-800',
			'text-rose-800',
			'text-emerald-800',
			'text-red-800',
			'text-blue-800',
			'text-purple-800',
			'text-gray-800',
			'text-indigo-800',
			'bg-purple-300',
			'bg-yellow-300',
			'bg-lime-300',
			'bg-cyan-300',
			'bg-teal-300',
			'bg-indigo-300',
			'bg-rose-300',
			'bg-emerald-300',
			'bg-red-300',
			'bg-blue-300',
			'bg-purple-300',
			'bg-indigo-300',
			'bg-gray-300',
		],
	},
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
		},
	},
	plugins: [],
};
