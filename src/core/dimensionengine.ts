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
			bottomLeft,
			bottomRight,
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
		if (tl !== bl && tr === br) {
			return `${tl} ${tr} ${bl}`;
		}

		// top-left | top-right | bottom-right | bottom-left
		return corners.join(' ');
	}

	static parseCorners(corners: Array<string>): Array<boolean | string> {
		return corners.map(i => DimensionEngine.parseDim(i));
	}

	static parseDim(input: string): boolean | string {
		const match = DimensionEngine.matchDim(input);

		// Invalid css dimension
		if (match === null) {
			return false;
		}

		// When only number, return as pixel
		if (!match.dim) return `${match.num}px`;

		return input;
	}

	static increaseDim(input: string): string {
		const match = DimensionEngine.matchDim(input);

		if (match === null) {
			return '0px';
		}

		// px
		if (!match.dim || match.dim === 'px') {
			return `${match.num >= 0 ? match.num + 1 : 0}px`;
		}

		console.log(match);
		// %
		return `${
			match.num >= 0 ? (match.num < 100 ? match.num + 1 : 100) : 0
		}%`;
	}

	static decreaseDim(input: string): string {
		const match = DimensionEngine.matchDim(input);

		if (match === null) {
			return '0px';
		}

		// px
		if (!match.dim || match.dim === 'px') {
			return `${match.num <= 0 ? 0 : match.num - 1}px`;
		}

		// %
		return `${match.num <= 0 ? 0 : match.num - 1}%`;
	}

	static matchDim(input: string) {
		const match = input.match(/([0-9]+)(px|%)?/i);

		if (!match) return null;

		return { num: parseInt(match[1]), dim: match[2] };
	}
}
