<template>
	<div class="custom-box" :style="`border-radius: ${borderRadius}`">
		<span>
			border-radius:
			<span class="value">{{ borderRadius }}</span>
			;
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
	name: 'CustomBox',

	props: {
		topLeft: {
			type: Number,
			default: 0,
		},
		topRight: {
			type: Number,
			default: 0,
		},
		bottomLeft: {
			type: Number,
			default: 0,
		},
		bottomRight: {
			type: Number,
			default: 0,
		},
	},

	computed: {
		borderRadius(): string {
			if (
				[this.topLeft, this.topRight, this.bottomLeft, this.bottomRight].every(
					i => i === this.topLeft
				)
			) {
				return `${this.topLeft}px`;
			}

			if (this.topLeft === this.bottomLeft && this.topRight === this.bottomRight) {
				return `${this.topLeft}px ${this.topRight}px`;
			}

			if (this.topLeft !== this.bottomRight && this.topRight === this.bottomLeft) {
				return `${this.topLeft}px ${this.topRight}px ${this.bottomRight}px`;
			}

			return `${this.topLeft}px ${this.topRight}px ${this.bottomLeft}px ${this.bottomRight}px`;
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/custom-box.scss';
</style>