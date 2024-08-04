import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { theme_v1 } from './src/theme_v1';
import { theme_v2 } from './src/theme_v2';
import { theme_v3 } from './src/theme_v3';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'modern',
						enhancements: true
					}
				],
				custom: [theme_v1, theme_v2, theme_v3]
			}
		})
	]
} satisfies Config;
