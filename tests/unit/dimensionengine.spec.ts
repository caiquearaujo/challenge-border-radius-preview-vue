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

	const parseDataSet = [
		{ input: '-10', response: '-10px' },
		{ input: '10', response: '10px' },
		{ input: '-10px', response: '-10px' },
		{ input: '10px', response: '10px' },
		{ input: '-10%', response: '-10%' },
		{ input: '10%', response: '10%' },
		{ input: '-10p', response: false },
		{ input: '10p', response: false },
		{ input: 'a', response: false },
		{ input: 'invalid', response: false },
	];

	it.each(parseDataSet)(
		'can parse $input as $response',
		({ input, response }) => {
			expect(DimensionEngine.parseDim(input)).toStrictEqual(response);
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

	const cornersDataSet = [
		{
			input: {
				topLeft: 'a',
				topRight: '10',
				bottomLeft: '10',
				bottomRight: '10',
			},
			response: '0px',
		},
		{
			input: {
				topLeft: '10',
				topRight: 'a',
				bottomLeft: '10',
				bottomRight: '10',
			},
			response: '0px',
		},
		{
			input: {
				topLeft: '10',
				topRight: '10',
				bottomLeft: 'a',
				bottomRight: '10',
			},
			response: '0px',
		},
		{
			input: {
				topLeft: '10',
				topRight: '10',
				bottomLeft: '10',
				bottomRight: 'a',
			},
			response: '0px',
		},
		{
			input: {
				topLeft: 'a',
				topRight: 'a',
				bottomLeft: '10k',
				bottomRight: 'a',
			},
			response: '0px',
		},
		{
			input: {
				topLeft: '0',
				topRight: '0',
				bottomLeft: '0',
				bottomRight: '0',
			},
			response: '0px',
		},
		{
			input: {
				topLeft: '10',
				topRight: '10',
				bottomLeft: '10',
				bottomRight: '10',
			},
			response: '10px',
		},
		{
			input: {
				topLeft: '10px',
				topRight: '10px',
				bottomLeft: '10px',
				bottomRight: '10px',
			},
			response: '10px',
		},
		{
			input: {
				topLeft: '10%',
				topRight: '10%',
				bottomLeft: '10%',
				bottomRight: '10%',
			},
			response: '10%',
		},
		{
			input: {
				topLeft: '10',
				topRight: '20',
				bottomLeft: '20',
				bottomRight: '10',
			},
			response: '10px 20px',
		},
		{
			input: {
				topLeft: '10px',
				topRight: '20px',
				bottomLeft: '20px',
				bottomRight: '10px',
			},
			response: '10px 20px',
		},
		{
			input: {
				topLeft: '10%',
				topRight: '20%',
				bottomLeft: '20%',
				bottomRight: '10%',
			},
			response: '10% 20%',
		},
		{
			input: {
				topLeft: '30',
				topRight: '20',
				bottomLeft: '20',
				bottomRight: '50',
			},
			response: '30px 20px 50px',
		},
		{
			input: {
				topLeft: '30px',
				topRight: '20px',
				bottomLeft: '20px',
				bottomRight: '50px',
			},
			response: '30px 20px 50px',
		},
		{
			input: {
				topLeft: '30%',
				topRight: '20%',
				bottomLeft: '20%',
				bottomRight: '50%',
			},
			response: '30% 20% 50%',
		},
		{
			input: {
				topLeft: '10',
				topRight: '20',
				bottomLeft: '30',
				bottomRight: '40',
			},
			response: '10px 20px 40px 30px',
		},
		{
			input: {
				topLeft: '10px',
				topRight: '20px',
				bottomLeft: '30px',
				bottomRight: '40px',
			},
			response: '10px 20px 40px 30px',
		},
		{
			input: {
				topLeft: '10%',
				topRight: '20%',
				bottomLeft: '30%',
				bottomRight: '40%',
			},
			response: '10% 20% 40% 30%',
		},
		{
			input: {
				topLeft: '10%',
				topRight: '20px',
				bottomLeft: '30%',
				bottomRight: '40px',
			},
			response: '10% 20px 40px 30%',
		},
	];

	it.each(cornersDataSet)(
		'can parse $input as $response',
		({ input, response }) => {
			expect(
				DimensionEngine.cssValue(
					input.topLeft,
					input.topRight,
					input.bottomLeft,
					input.bottomRight
				)
			).toStrictEqual(response);
		}
	);
});
