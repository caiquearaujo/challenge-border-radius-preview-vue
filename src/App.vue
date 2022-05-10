<template>
	<custom-box
		topLeft="10"
		topRight="10"
		bottomRight="10"
		bottomLeft="10" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomBox from './components/CustomBox.vue';

export default defineComponent({
	name: 'App',
	components: { CustomBox },
});
</script>
