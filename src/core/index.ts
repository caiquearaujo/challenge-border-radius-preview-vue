export function parseDim(input: string): boolean | string {
	const match = matchDim(input);

	// Invalid css dimension
	if (match === null) {
		return false;
	}

	// When only number, return as pixel
	if (!match.dim) return `${match.num}px`;

	return input;
}

export function increaseDim(input: string): string {
	const match = matchDim(input);

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

export function decreaseDim(input: string): string {
	const match = matchDim(input);

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

export function matchDim(input: string) {
	const match = input.match(/([0-9]+)(px|%)?/i);

	if (!match) return null;

	return { num: parseInt(match[1]), dim: match[2] };
}
