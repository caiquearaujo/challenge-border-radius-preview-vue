export default class CopyEngine {
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
