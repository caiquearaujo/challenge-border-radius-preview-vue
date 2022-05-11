import { CopyEngine } from '@/core';

declare const global: Record<string, any>;
const clipboard = { ...global.navigator.clipboard };
const execCommand = { ...global.document.execCommand };

beforeEach(() => {
	let dataClipboard: string;

	const mockClipboard = {
		writeText: jest.fn(
			data =>
				new Promise<void>((res, rej) => {
					dataClipboard = data;
					res();
				})
		),
		readText: jest.fn(() => dataClipboard),
	};

	global.navigator.clipboard = mockClipboard;

	global.document.execCommand = jest.fn();
});

afterEach(() => {
	jest.resetAllMocks();

	global.navigator.clipboard = clipboard;
	global.document.execCommand = execCommand;
});

describe('Copy Engine', () => {
	it('can copy data to navigator.cliboard', () => {
		const expected = 'border-radius: 10px;';
		const copied = () =>
			expect(navigator.clipboard.readText()).toBe(expected);

		return CopyEngine.copy(expected, copied);
	});

	it('can copy data as fallback', () => {
		const expected = 'border-radius: 10px;';
		const copied = () =>
			expect(document.execCommand).toHaveBeenCalledWith('copy');

		return CopyEngine.fallback(expected, copied);
	});
});
