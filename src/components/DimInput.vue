<template>
	<div :class="['dim-input', { invalid: invalid }]">
		<label :class="corner">{{ corner }}</label>
		<input
			:id="corner"
			:name="corner"
			type="text"
			:required="true"
			:value="modelValue"
			@input="onChange" />
		<span class="invalid" v-if="invalid">invalid</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { parseDimProp } from '@/core';

export default defineComponent({
	name: 'DimInput',

	data() {
		return {
			invalid: false,
		};
	},

	emits: ['update:modelValue', 'afterChange'],

	props: {
		corner: {
			type: String,
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

			if (parseDimProp(value) === false) {
				this.$data.invalid = true;
			}

			this.$emit('update:modelValue', value);
			this.$emit('afterChange', value);
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/dim-input.scss';
</style>