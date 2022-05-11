import { TOrNull, TUnit } from '@/types';

export default class DimensionEngine {
	/**
	 * Convert corners to a valid css syntax.
	 *
	 * @param {string} topLeft
	 * @param {string} topRight
	 * @param {string} bottomLeft
	 * @param {string} bottomRight
	 * @returns {string}
	 */
	static cssValue(
		topLeft: string,
		topRight: string,
		bottomLeft: string,
		bottomRight: string
	): string {
		const corners = DimensionEngine.parseCorners([
			topLeft,
			topRight,
			bottomRight,
			bottomLeft,
		]);

		// Invalid corner found
		if (corners.includes(false)) {
			return '0px';
		}

		// Same corners
		if (corners.every(i => i === corners[0])) {
			return `${corners[0]}`;
		}

		const [tl, tr, br, bl] = corners;

		// top-left-and-bottom-right | top-right-and-bottom-left
		if (tl === br && tr === bl) {
			return `${tl} ${tr}`;
		}

		// top-left | top-right-and-bottom-left | bottom-right
		if (tl !== br && tr === bl) {
			return `${tl} ${tr} ${br}`;
		}

		// top-left | top-right | bottom-right | bottom-left
		return corners.join(' ');
	}

	/**
	 * Parse each corner to a valid unit of measure.
	 *
	 * @param {Array<string>} corners
	 * @returns {Array<boolean|string>}
	 */
	static parseCorners(corners: Array<string>): Array<boolean | string> {
		return corners.map(i => DimensionEngine.parseDim(i));
	}

	/**
	 * Parses any input to a valid unit of measure.
	 *
	 * @param {string} input
	 * @returns {boolean|string}
	 */
	static parseDim(input: string): boolean | string {
		const match = DimensionEngine.matchDim(input);
		return match === null ? false : `${match.num}${match.dim}`;
	}

	/**
	 * Parses input to a valid unit of measure
	 * and increase its value.
	 *
	 * @param {string} input
	 * @returns {string}
	 */
	static increaseDim(input: string): string {
		const match = DimensionEngine.matchDim(input);

		if (match === null) {
			return '0px';
		}

		let num = match.num >= 0 ? match.num + 1 : 0;

		if (match.dim === '%') {
			num = num >= 100 ? 100 : num;
		}

		return `${num}${match.dim}`;
	}

	/**
	 * Parses input to a valid unit of measure
	 * and decrease its value.
	 *
	 * @param {string} input
	 * @returns {string}
	 */
	static decreaseDim(input: string): string {
		const match = DimensionEngine.matchDim(input);

		return match === null
			? '0px'
			: `${match.num <= 0 ? 0 : match.num - 1}${match.dim}`;
	}

	/**
	 * Matches input to unit expression and return
	 * unit formatted.
	 *
	 * When unit measure is not set, default will
	 * be as pixel.
	 *
	 * Unit number will always be converted to an
	 * integer number.
	 *
	 * @param {string} input
	 * @returns {TOrNull<TUnit>}
	 */
	static matchDim(input: string): TOrNull<TUnit> {
		const match = input.match(/^(-?[0-9]+)(px|%)?$/i);

		if (!match) return null;

		return {
			num: parseInt(match[1]),
			dim: (!match[2] ? 'px' : match[2]) as 'px' | '%',
		};
	}
}
