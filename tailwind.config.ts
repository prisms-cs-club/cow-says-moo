import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				navbarColor: '#a61618'
			}
		}
	},
	plugins: []
} as Config;
