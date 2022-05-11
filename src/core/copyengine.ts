export default class CopyEngine {
	/**
	 * It will copy value to clipboard, and
	 * after will trigger copied() callback.
	 *
	 * It implements a fallback if browser does
	 * not support navigator.clipboard.
	 *
	 * @param {string} value
	 * @param {function} copied
	 * @returns {void}
	 */
	static copy(value: string, copied: () => void): void {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(value)
				.then(() => copied())
				.catch(() => CopyEngine.fallback(value, copied));

			return;
		}

		CopyEngine.fallback(value, copied);
	}

	/**
	 * Fallback to old browsers. Tt creates a new
	 * textarea element out of screen, sets value
	 * to it, and selects content executing copy
	 * command.
	 *
	 * After copying, trigger copied() callback.
	 *
	 * @param {string} value
	 * @param {function} copied
	 * @returns {void}
	 */
	static fallback(value: string, copied: () => void): void {
		const el = document.createElement('textarea');

		el.value = value;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);

		el.select();
		el.setSelectionRange(0, 99999);

		const copy = document.execCommand('copy');
		document.body.removeChild(el);

		if (copy) {
			copied();
		}

		if (
			window.getSelection() !== null &&
			window.getSelection() !== undefined
		) {
			(window.getSelection() as any).removeAllRanges();
		}
	}
}
