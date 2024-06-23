/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				primary: {
					500: '#8C66C3',
					100: '#F3E9FA',
				},
				dark: {
					100: '#1D1742',
					200: '#2C2456',
					300: '#4B428F',
					400: '#6960B1',
					500: '#16113A',
				},
				light: {
					900: '#FFFFFF',
					800: '#F7F5FA',
					850: '#FBFAFC',
					700: '#C9C2D9',
					500: '#A692D0',
					400: '#988EB6',
				},
				'accent-blue': '#1DA1F2',
			},
			fontFamily: {
				inter: ['var(--font-inter)'],
				spaceGrotesk: ['var(--font-robotoCondensed)'],
			},
			boxShadow: {
				'light-100':
					'0px 12px 20px 0px rgba(201, 194, 217, 0.1), 0px 6px 12px 0px rgba(201, 194, 217, 0.08), 0px 2px 4px 0px rgba(201, 194, 217, 0.1)',
				'light-200': '10px 10px 20px 0px rgba(166, 146, 208, 0.2)',
				'light-300': '-10px 10px 20px 0px rgba(166, 146, 208, 0.2)',
				'dark-100': '0px 2px 10px 0px rgba(44, 36, 86, 0.3)',
				'dark-200': '2px 0px 20px 0px rgba(29, 23, 66, 0.2)',
			},
			backgroundImage: {
				'auth-dark': "url('/assets/images/auth-dark.png')",
				'auth-light': "url('/assets/images/auth-light.png')",
			},
			screens: {
				xs: '420px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
