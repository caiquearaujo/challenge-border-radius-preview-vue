import { DimensionEngine } from '@/core';

describe('Dimension Engine', () => {
	const matchDataSet = [
		{ input: '-10', response: { num: -10, dim: 'px' } },
		{ input: '10', response: { num: 10, dim: 'px' } },
		{ input: '-10px', response: { num: -10, dim: 'px' } },
		{ input: '10px', response: { num: 10, dim: 'px' } },
		{ input: '-10%', response: { num: -10, dim: '%' } },
		{ input: '10%', response: { num: 10, dim: '%' } },
		{ input: '-10p', response: null },
		{ input: '10p', response: null },
		{ input: 'a', response: null },
		{ input: 'invalid', response: null },
	];

	it.each(matchDataSet)(
		'can match $input as $response',
		({ input, response }) => {
			expect(DimensionEngine.matchDim(input)).toStrictEqual(response);
		}
	);

	const decreaseDataSet = [
		{ input: 'invalid', response: '0px' },
		{ input: '-5px', response: '0px' },
		{ input: '0px', response: '0px' },
		{ input: '10px', response: '9px' },
		{ input: '100px', response: '99px' },
		{ input: '-5%', response: '0%' },
		{ input: '0%', response: '0%' },
		{ input: '10%', response: '9%' },
		{ input: '100%', response: '99%' },
	];

	it.each(decreaseDataSet)(
		'can decrease $input to $response',
		({ input, response }) => {
			expect(DimensionEngine.decreaseDim(input)).toStrictEqual(response);
		}
	);

	const increaseDataSet = [
		{ input: 'invalid', response: '0px' },
		{ input: '-5px', response: '0px' },
		{ input: '0px', response: '1px' },
		{ input: '10px', response: '11px' },
		{ input: '100px', response: '101px' },
		{ input: '-5%', response: '0%' },
		{ input: '0%', response: '1%' },
		{ input: '10%', response: '11%' },
		{ input: '99%', response: '100%' },
		{ input: '100%', response: '100%' },
		{ input: '105%', response: '100%' },
	];

	it.each(increaseDataSet)(
		'can increase $input to $response',
		({ input, response }) => {
			expect(DimensionEngine.increaseDim(input)).toStrictEqual(response);
		}
	);
});
