<template>
	<div class="custom-box" :style="`border-radius: ${borderRadiusValue}`">
		<span>
			border-radius:
			<span class="value">{{ borderRadiusValue }}</span>
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { parseDim } from '@/core';

export default defineComponent({
	name: 'CustomBox',

	props: {
		topLeft: {
			type: String,
			default: '0px',
		},
		topRight: {
			type: String,
			default: '0px',
		},
		bottomLeft: {
			type: String,
			default: '0px',
		},
		bottomRight: {
			type: String,
			default: '0px',
		},
	},

	computed: {
		borderRadiusValue(): string {
			return this.borderRadius(
				this.topLeft,
				this.topRight,
				this.bottomLeft,
				this.bottomRight
			);
		},
	},

	methods: {
		borderRadius(
			topLeft: string,
			topRight: string,
			bottomLeft: string,
			bottomRight: string
		): string {
			const corners = this.parseCorners(
				topLeft,
				topRight,
				bottomLeft,
				bottomRight
			);

			// Invalid corner found
			if (corners.includes(false)) {
				return '0px';
			}

			// Same corners
			if (corners.every(i => i === corners[0])) {
				return `${corners[0]}`;
			}

			const [tl, tr, br, bl] = corners;

			// top-left-and-bottom-right | top-right-and-bottom-left
			if (tl === br && tr === bl) {
				return `${tl} ${tr}`;
			}

			// top-left | top-right-and-bottom-left | bottom-right
			if (tl !== bl && tr === br) {
				return `${tl} ${tr} ${bl}`;
			}

			// top-left | top-right | bottom-right | bottom-left
			return corners.join(' ');
		},

		parseCorners(
			topLeft: string,
			topRight: string,
			bottomLeft: string,
			bottomRight: string
		): Array<boolean | string> {
			const corners = [topLeft, topRight, bottomRight, bottomLeft];
			return corners.map(i => parseDim(i));
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/custom-box.scss';
</style>