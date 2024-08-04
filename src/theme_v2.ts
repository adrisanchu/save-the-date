import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme_v2: CustomThemeConfig = {
	name: 'theme_v2',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Quicksand, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Quicksand, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': 'var(--color-primary-900)',
		'--theme-font-color-dark': 'var(--color-surface-200)',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #606C38
		'--color-primary-50': '231 233 225', // #e7e9e1
		'--color-primary-100': '223 226 215', // #dfe2d7
		'--color-primary-200': '215 218 205', // #d7dacd
		'--color-primary-300': '191 196 175', // #bfc4af
		'--color-primary-400': '144 152 116', // #909874
		'--color-primary-500': '96 108 56', // #606C38
		'--color-primary-600': '86 97 50', // #566132
		'--color-primary-700': '72 81 42', // #48512a
		'--color-primary-800': '58 65 34', // #3a4122
		'--color-primary-900': '47 53 27', // #2f351b
		// secondary | #283618
		'--color-secondary-50': '223 225 220', // #dfe1dc
		'--color-secondary-100': '212 215 209', // #d4d7d1
		'--color-secondary-200': '201 205 197', // #c9cdc5
		'--color-secondary-300': '169 175 163', // #a9afa3
		'--color-secondary-400': '105 114 93', // #69725d
		'--color-secondary-500': '40 54 24', // #283618
		'--color-secondary-600': '36 49 22', // #243116
		'--color-secondary-700': '30 41 18', // #1e2912
		'--color-secondary-800': '24 32 14', // #18200e
		'--color-secondary-900': '20 26 12', // #141a0c
		// tertiary | #FEFAE0
		'--color-tertiary-50': '255 254 250', // #fffefa
		'--color-tertiary-100': '255 254 249', // #fffef9
		'--color-tertiary-200': '255 254 247', // #fffef7
		'--color-tertiary-300': '255 253 243', // #fffdf3
		'--color-tertiary-400': '254 252 233', // #fefce9
		'--color-tertiary-500': '254 250 224', // #FEFAE0
		'--color-tertiary-600': '229 225 202', // #e5e1ca
		'--color-tertiary-700': '191 188 168', // #bfbca8
		'--color-tertiary-800': '152 150 134', // #989686
		'--color-tertiary-900': '124 123 110', // #7c7b6e
		// success | #8ab17d
		'--color-success-50': '237 243 236', // #edf3ec
		'--color-success-100': '232 239 229', // #e8efe5
		'--color-success-200': '226 236 223', // #e2ecdf
		'--color-success-300': '208 224 203', // #d0e0cb
		'--color-success-400': '173 200 164', // #adc8a4
		'--color-success-500': '138 177 125', // #8ab17d
		'--color-success-600': '124 159 113', // #7c9f71
		'--color-success-700': '104 133 94', // #68855e
		'--color-success-800': '83 106 75', // #536a4b
		'--color-success-900': '68 87 61', // #44573d
		// warning | #f4a261
		'--color-warning-50': '253 241 231', // #fdf1e7
		'--color-warning-100': '253 236 223', // #fdecdf
		'--color-warning-200': '252 232 216', // #fce8d8
		'--color-warning-300': '251 218 192', // #fbdac0
		'--color-warning-400': '247 190 144', // #f7be90
		'--color-warning-500': '244 162 97', // #f4a261
		'--color-warning-600': '220 146 87', // #dc9257
		'--color-warning-700': '183 122 73', // #b77a49
		'--color-warning-800': '146 97 58', // #92613a
		'--color-warning-900': '120 79 48', // #784f30
		// error | #9e2a2b
		'--color-error-50': '240 223 223', // #f0dfdf
		'--color-error-100': '236 212 213', // #ecd4d5
		'--color-error-200': '231 202 202', // #e7caca
		'--color-error-300': '216 170 170', // #d8aaaa
		'--color-error-400': '187 106 107', // #bb6a6b
		'--color-error-500': '158 42 43', // #9e2a2b
		'--color-error-600': '142 38 39', // #8e2627
		'--color-error-700': '119 32 32', // #772020
		'--color-error-800': '95 25 26', // #5f191a
		'--color-error-900': '77 21 21', // #4d1515
		// surface | #BC6C25
		'--color-surface-50': '245 233 222', // #f5e9de
		'--color-surface-100': '242 226 211', // #f2e2d3
		'--color-surface-200': '238 218 201', // #eedac9
		'--color-surface-300': '228 196 168', // #e4c4a8
		'--color-surface-400': '208 152 102', // #d09866
		'--color-surface-500': '188 108 37', // #BC6C25
		'--color-surface-600': '169 97 33', // #a96121
		'--color-surface-700': '141 81 28', // #8d511c
		'--color-surface-800': '113 65 22', // #714116
		'--color-surface-900': '92 53 18' // #5c3512
	}
};
