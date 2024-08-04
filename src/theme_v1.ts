import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme_v1: CustomThemeConfig = {
	name: 'theme_v1',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Quicksand, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Quicksand, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #264653
		'--color-primary-50': '222 227 229', // #dee3e5
		'--color-primary-100': '212 218 221', // #d4dadd
		'--color-primary-200': '201 209 212', // #c9d1d4
		'--color-primary-300': '168 181 186', // #a8b5ba
		'--color-primary-400': '103 126 135', // #677e87
		'--color-primary-500': '38 70 83', // #264653
		'--color-primary-600': '34 63 75', // #223f4b
		'--color-primary-700': '29 53 62', // #1d353e
		'--color-primary-800': '23 42 50', // #172a32
		'--color-primary-900': '19 34 41', // #132229
		// secondary | #2a9d8f
		'--color-secondary-50': '223 240 238', // #dff0ee
		'--color-secondary-100': '212 235 233', // #d4ebe9
		'--color-secondary-200': '202 231 227', // #cae7e3
		'--color-secondary-300': '170 216 210', // #aad8d2
		'--color-secondary-400': '106 186 177', // #6abab1
		'--color-secondary-500': '42 157 143', // #2a9d8f
		'--color-secondary-600': '38 141 129', // #268d81
		'--color-secondary-700': '32 118 107', // #20766b
		'--color-secondary-800': '25 94 86', // #195e56
		'--color-secondary-900': '21 77 70', // #154d46
		// tertiary | #d5bdaf
		'--color-tertiary-50': '249 245 243', // #f9f5f3
		'--color-tertiary-100': '247 242 239', // #f7f2ef
		'--color-tertiary-200': '245 239 235', // #f5efeb
		'--color-tertiary-300': '238 229 223', // #eee5df
		'--color-tertiary-400': '226 209 199', // #e2d1c7
		'--color-tertiary-500': '213 189 175', // #d5bdaf
		'--color-tertiary-600': '192 170 158', // #c0aa9e
		'--color-tertiary-700': '160 142 131', // #a08e83
		'--color-tertiary-800': '128 113 105', // #807169
		'--color-tertiary-900': '104 93 86', // #685d56
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
		// surface | #e6d690
		'--color-surface-50': '251 249 238', // #fbf9ee
		'--color-surface-100': '250 247 233', // #faf7e9
		'--color-surface-200': '249 245 227', // #f9f5e3
		'--color-surface-300': '245 239 211', // #f5efd3
		'--color-surface-400': '238 226 177', // #eee2b1
		'--color-surface-500': '230 214 144', // #e6d690
		'--color-surface-600': '207 193 130', // #cfc182
		'--color-surface-700': '173 161 108', // #ada16c
		'--color-surface-800': '138 128 86', // #8a8056
		'--color-surface-900': '113 105 71' // #716947
	}
};
