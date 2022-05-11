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
			@keydown="onKeyDown"
			data-corner />
		<span class="invalid" v-if="invalid">invalid</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { PropType } from '@vue/runtime-core';

import { TCorner, TCornerName } from '@/types';
import { DimensionEngine } from '@/core';

const allowedCorners = [
	'topLeft',
	'topRight',
	'bottomLeft',
	'bottomRight',
];

const allowedNames = [
	'top-left',
	'top-right',
	'bottom-left',
	'bottom-right',
];

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
			validator: (v: string) => allowedCorners.indexOf(v) !== -1,
		},

		name: {
			type: String as PropType<TCornerName>,
			required: true,
			validator: (v: string) => allowedNames.indexOf(v) !== -1,
		},

		modelValue: {
			type: String,
			default: '0px',
		},
	},

	methods: {
		onChange(e: any): void {
			this.$data.invalid = false;
			const value = e.target.value;

			if (DimensionEngine.parseDim(value) === false) {
				this.$data.invalid = true;
			}

			this.$emit('update:modelValue', value);
		},

		onKeyDown(e: any): void {
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