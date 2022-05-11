import { mount } from '@vue/test-utils';
import DimInput from '@/components/DimInput.vue';

describe('DimInput', () => {
	const mounted = mount(DimInput, {
		props: {
			corner: 'topLeft',
			name: 'top-left',
		},
	});

	it('should mounted element exists', () => {
		expect(mounted.exists()).toBe(true);
	});

	it('should has defaults props', () => {
		expect(mounted.props('corner')).toBe('topLeft');
		expect(mounted.props('name')).toBe('top-left');
		expect(mounted.props('modelValue')).toBe('0px');
	});

	it('should update:modelValue be emitted', async () => {
		await mounted.vm.$emit('update:modelValue', '10px');
		expect(mounted.emitted('update:modelValue')).toStrictEqual([
			['10px'],
		]);
	});

	it('should increase be emitted', async () => {
		await mounted.vm.$emit(
			'increase',
			'10px',
			mounted.props('corner')
		);
		expect(mounted.emitted('increase')).toStrictEqual([
			['10px', mounted.props('corner')],
		]);
	});

	it('should decrease be emitted', async () => {
		await mounted.vm.$emit(
			'decrease',
			'10px',
			mounted.props('corner')
		);
		expect(mounted.emitted('decrease')).toStrictEqual([
			['10px', mounted.props('corner')],
		]);
	});

	it('should onChange emit update:modelValue event', async () => {
		await mounted.vm.onChange({ target: { value: '100px' } });

		expect(
			mounted.emitted('update:modelValue')?.slice(-1)
		).toStrictEqual([['100px']]);
	});

	it('should onChange set data as default', async () => {
		await mounted.vm.onChange({ target: { value: 'invalid' } });

		expect(mounted.vm.invalid).toBe(true);
		expect(
			mounted.emitted('update:modelValue')?.slice(-1)
		).toStrictEqual([['invalid']]);
	});

	it('should onKeyDown emit increase event', async () => {
		await mounted.vm.onKeyDown({
			key: 'ArrowUp',
			target: { value: '50px', id: mounted.props('corner') },
		});

		expect(mounted.emitted('increase')?.slice(-1)).toStrictEqual([
			['50px', 'topLeft'],
		]);
	});

	it('should onKeyDown emit decrease event', async () => {
		await mounted.vm.onKeyDown({
			key: 'ArrowDown',
			target: { value: '50px', id: mounted.props('corner') },
		});

		expect(mounted.emitted('decrease')?.slice(-1)).toStrictEqual([
			['50px', 'topLeft'],
		]);
	});

	const corners = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

	it.each(corners)('should allow corner prop as %s.', async corner => {
		mounted.setProps({ corner });

		await mounted.vm.$nextTick;
		expect(mounted.find('[data-corner]').attributes().id).toBe(corner);
	});

	it('should validate corner props', () => {
		const cornerValidator = DimInput.props.corner.validator;

		corners.forEach(el => expect(cornerValidator(el)).toBe(true));
		expect(cornerValidator('unknown')).toBe(false);
	});

	const names = [
		'top-left',
		'top-right',
		'bottom-left',
		'bottom-right',
	];

	it.each(names)('should allow name prop as %s.', async name => {
		mounted.setProps({ name });
		await mounted.vm.$nextTick;
		expect(mounted.find('[data-corner]').attributes().name).toBe(name);
	});

	it('should validate name props', () => {
		const nameValidator = DimInput.props.name.validator;

		names.forEach(el => expect(nameValidator(el)).toBe(true));
		expect(nameValidator('unknown')).toBe(false);
	});
});
