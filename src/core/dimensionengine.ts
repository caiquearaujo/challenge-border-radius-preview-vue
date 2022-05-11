export default class DimensionEngine {
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

	static parseCorners(corners: Array<string>): Array<boolean | string> {
		return corners.map(i => DimensionEngine.parseDim(i));
	}

	static parseDim(input: string): boolean | string {
		const match = DimensionEngine.matchDim(input);
		return match === null ? false : `${match.num}${match.dim}`;
	}

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

	static decreaseDim(input: string): string {
		const match = DimensionEngine.matchDim(input);

		return match === null
			? '0px'
			: `${match.num <= 0 ? 0 : match.num - 1}${match.dim}`;
	}

	static matchDim(input: string) {
		const match = input.match(/^(-?[0-9]+)(px|%)?$/i);

		if (!match) return null;

		return {
			num: parseInt(match[1]),
			dim: !match[2] ? 'px' : match[2],
		};
	}
}
