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
import { cssValue } from '@/core';

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
			return cssValue(
				this.topLeft,
				this.topRight,
				this.bottomLeft,
				this.bottomRight
			);
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/custom-box.scss';
</style>