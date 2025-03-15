import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				navbarColor: '#a61618',
			}
		}
	},
	plugins: [daisyui]
} as Config;
