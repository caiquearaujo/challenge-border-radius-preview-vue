<template>
	<div class="dim-input">
		<label :class="corner">{{ corner }}</label>
		<input
			:id="corner"
			:name="corner"
			type="text"
			:required="true"
			:value="modelValue"
			@input="onChange" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
	name: 'DimInput',

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
			this.$emit('update:modelValue', e.target.value);
			this.$emit('afterChange', e.target.value);
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/dim-input.scss';
</style>