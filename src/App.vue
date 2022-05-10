<template>
	<div class="flex-wrapper">
		<div class="column">
			<dim-input corner="top-left" v-model="corners.topLeft" />
		</div>
		<div class="column">
			<dim-input corner="top-right" v-model="corners.topRight" />
		</div>
		<div class="column">
			<dim-input corner="bottom-left" v-model="corners.bottomLeft" />
		</div>
		<div class="column">
			<dim-input corner="bottom-right" v-model="corners.bottomRight" />
		</div>
	</div>
	<custom-box v-bind="corners" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomBox from './components/CustomBox.vue';
import DimInput from './components/DimInput.vue';

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
			},
		};
	},
});
</script>
