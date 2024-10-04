/**
 * List of available colors
 */
type ColorKeys = 'primary' | 'secondary' | 'tertiary' | 'surface' | 'success' | 'error';
type Colors = { [key in ColorKeys]: string };

/**
 * Colors accessor
 * @param key A string included in ColorKeys
 */
const colors: Colors = {
	primary: '',
	secondary: '',
	tertiary: '',
	surface: '',
	success: '',
	error: ''
};

/**
 * Convert a Tailwind color string to RGB or RGBA format
 * @param color A string in Tailwind color format (eg. '255 255 255')
 * @returns A string in rgb() or rgba() format
 */
function convertToRGB(color: string) {
	const [r, g, b, a] = color.split(' ');
	if (!a) return `rgb(${r}, ${g}, ${b})`;
	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Access one of the available colors from the theme
 * @param key A string included in ColorKeys
 * @param transparency A number ranging from 0 to 1
 * @returns A string in RGB or RGBA format
 */
export function getColor(key: ColorKeys, transparency: number = 0) {
	return convertToRGB(colors[key] + ` ${transparency}`);
}

/**
 * Once the HTML is ready, access the colors defined on the theme
 * and populate the colors accessor
 * @param style CSSStyleDeclaration -using getComputedStyle(document.body)-;
 */
export function initColors(style: CSSStyleDeclaration) {
	colors['primary'] = style.getPropertyValue('--color-primary-500');
	colors['secondary'] = style.getPropertyValue('--color-secondary-500');
	colors['tertiary'] = style.getPropertyValue('--color-tertiary-600');
	colors['surface'] = style.getPropertyValue('--color-surface-500');
	colors['success'] = style.getPropertyValue('--color-success-500');
	colors['error'] = style.getPropertyValue('--color-error-500');
}
