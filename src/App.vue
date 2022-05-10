<template>
	<div class="flex-wrapper">
		<div class="column">
			<dim-input
				corner="topLeft"
				name="top-left"
				v-model="corners.topLeft"
				@increase="onIncrease"
				@decrease="onDecrease" />
		</div>
		<div class="column">
			<dim-input
				corner="topRight"
				name="top-right"
				v-model="corners.topRight"
				@increase="onIncrease"
				@decrease="onDecrease" />
		</div>
		<div class="column">
			<dim-input
				corner="bottomLeft"
				name="bottom-left"
				v-model="corners.bottomLeft"
				@increase="onIncrease"
				@decrease="onDecrease" />
		</div>
		<div class="column">
			<dim-input
				corner="bottomRight"
				name="bottom-right"
				v-model="corners.bottomRight"
				@increase="onIncrease"
				@decrease="onDecrease" />
		</div>
	</div>
	<custom-box v-bind="corners" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CustomBox from './components/CustomBox.vue';
import DimInput from './components/DimInput.vue';

import { increaseDim, decreaseDim } from '@/core';
import { TCorner } from '@/types';

export default defineComponent({
	name: 'App',

	components: { CustomBox, DimInput },

	data() {
		return {
			corners: {
				topLeft: '10px',
				topRight: '10px',
				bottomRight: '10px',
				bottomLeft: '10px',
			} as Record<TCorner, string>,
		};
	},

	methods: {
		onIncrease(i: string, corner: TCorner): void {
			this.$data.corners[corner] = increaseDim(i);
		},

		onDecrease(i: string, corner: TCorner): void {
			this.$data.corners[corner] = decreaseDim(i);
		},
	},
});
</script>
