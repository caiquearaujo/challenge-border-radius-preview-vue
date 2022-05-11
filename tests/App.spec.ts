import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App', () => {
	const mounted = mount(App);

	it('should mounted element exists', () => {
		expect(mounted.exists()).toBe(true);
	});

	it('should has default data', () => {
		expect(mounted.vm.corners).toStrictEqual({
			topLeft: '10px',
			topRight: '10px',
			bottomRight: '10px',
			bottomLeft: '10px',
		});

		expect(mounted.vm.showCopy).toBe(false);
	});

	const corners = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

	it.each(corners)(
		'should increase dimension at corner %s.',
		async corner => {
			await mounted.vm.onIncrease('10px', corner);
			expect(mounted.vm.corners[corner]).toBe('11px');
		}
	);

	it.each(corners)(
		'should decrease dimension at corner %s.',
		async corner => {
			await mounted.vm.onDecrease('10px', corner);
			expect(mounted.vm.corners[corner]).toBe('9px');
		}
	);
});
