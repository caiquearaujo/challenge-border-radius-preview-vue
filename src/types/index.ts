export type TCorner =
	| 'topLeft'
	| 'topRight'
	| 'bottomLeft'
	| 'bottomRight';
export type TCornerName =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right';

export type TUnit = {
	num: number;
	dim: 'px' | '%';
};

export type TOrNull<T> = T | null;
