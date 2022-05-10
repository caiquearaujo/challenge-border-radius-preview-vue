export function parseDimProp(input: string): boolean | string {
	const match = input.match(/([0-9]+)(px|%)?/i);

	// Invalid css dimension
	if (match === null) {
		return false;
	}

	// When only number, return as pixel
	if (!match[2]) return `${match[1]}px`;

	return input;
}
