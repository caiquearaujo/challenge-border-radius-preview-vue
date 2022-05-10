<template>
	<h1 class="title">Border-Radius Previewer</h1>
	<p class="description">
		Preview how the shape looks while changing border-radius corners.
	</p>
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
				corner="bottomRight"
				name="bottom-right"
				v-model="corners.bottomRight"
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
	</div>
	<custom-box :borderRadius="borderRadiusValue" />
	<button class="copy" @click="() => copy()">
		<div :class="['copied-box', { hidden: !showCopy }]">
			Copied to clipboard
		</div>
		Copy CSS
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CustomBox from './components/CustomBox.vue';
import DimInput from './components/DimInput.vue';

import { TCorner } from '@/types';
import { CopyEngine, DimensionEngine } from '@/core';

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
			showCopy: false,
		};
	},

	computed: {
		borderRadiusValue(): string {
			return DimensionEngine.cssValue(
				this.$data.corners.topLeft,
				this.$data.corners.topRight,
				this.$data.corners.bottomLeft,
				this.$data.corners.bottomRight
			);
		},
	},

	methods: {
		onIncrease(i: string, corner: TCorner): void {
			this.$data.corners[corner] = DimensionEngine.increaseDim(i);
		},

		onDecrease(i: string, corner: TCorner): void {
			this.$data.corners[corner] = DimensionEngine.decreaseDim(i);
		},

		copy(): void {
			CopyEngine.copy(
				`border-radius: ${this.borderRadiusValue};`,
				this.copied.bind(this)
			);
		},

		copied(): void {
			this.showCopy = true;

			setTimeout(() => {
				this.showCopy = false;
			}, 1500);
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/copy-button.scss';
</style>