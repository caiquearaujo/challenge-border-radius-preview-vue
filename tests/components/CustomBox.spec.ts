import { mount } from '@vue/test-utils';
import CustomBox from '@/components/CustomBox.vue';

describe('CustomBox', () => {
	const mounted = mount(CustomBox);

	it('should mounted element exists', () => {
		expect(mounted.exists()).toBe(true);
	});

	it('should has defaults props', () => {
		expect(mounted.props('borderRadius')).toBe('0px');
	});

	const borderRadius = [
		'10px',
		'10px 10px',
		'10px 10px 10px',
		'10px 10px 10px 10px',
	];

	it.each(borderRadius)(
		'should set borderRadius prop as %s.',
		async bRadius => {
			mounted.setProps({ borderRadius: bRadius });
			await mounted.vm.$nextTick;
			expect(mounted.attributes().style).toContain(
				`border-radius: ${bRadius}`
			);
		}
	);
});
