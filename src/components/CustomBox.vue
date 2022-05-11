<template>
	<div class="custom-box" :style="`border-radius: ${borderRadius}`">
		<span>
			border-radius:
			<span class="value">{{ borderRadius }}</span>
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
	name: 'CustomBox',

	props: {
		borderRadius: {
			type: String,
			default: '0px',
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/custom-box.scss';
</style>