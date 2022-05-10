<template>
	<div :class="['dim-input', { invalid: invalid }]">
		<label :class="name">{{ name }}</label>
		<input
			:id="corner"
			:name="name"
			type="text"
			:required="true"
			:value="modelValue"
			@input="onChange"
			@keydown="onKeyDown" />
		<span class="invalid" v-if="invalid">invalid</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { PropType } from '@vue/runtime-core';

import { TCorner, TCornerName } from '@/types';
import { DimensionEngine } from '@/core';

export default defineComponent({
	name: 'DimInput',

	data() {
		return {
			invalid: false,
		};
	},

	emits: ['update:modelValue', 'increase', 'decrease'],

	props: {
		corner: {
			type: String as PropType<TCorner>,
			required: true,
		},

		name: {
			type: String as PropType<TCornerName>,
			required: true,
		},

		modelValue: {
			type: String,
			default: '0px',
		},
	},

	methods: {
		onChange(e: Event & { target: HTMLInputElement }): void {
			this.$data.invalid = false;
			const value = e.target.value;

			if (DimensionEngine.parseDim(value) === false) {
				this.$data.invalid = true;
			}

			this.$emit('update:modelValue', value);
		},

		onKeyDown(e: KeyboardEvent & { target: HTMLInputElement }): void {
			const key = e.key || e.keyCode;

			if (key === 'ArrowUp' || key === 38) {
				this.$emit('increase', e.target.value, e.target.id);
			} else if (key === 'ArrowDown' || key === 40) {
				this.$emit('decrease', e.target.value, e.target.id);
			}
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/dim-input.scss';
</style>