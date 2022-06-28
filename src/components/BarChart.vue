<script setup>
import { defineProps, computed } from "vue";

import { Bar } from "vue-chartjs";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const props = defineProps({
	label: String,
	content: Object,
});

const chartData = computed(() => {
	return {
		labels: Object.keys(props.content),
		datasets: [
			{
				data: Object.values(props.content),
				backgroundColor: "rgb(217 70 239)",
				borderRadius: 5,
				lineTension: 0.6,
			},
		],
	};
});

const options = {
	responsive: true,
	interaction: {
		intersect: false,
	},
	plugins: {
		title: {
			display: false,
		},
		legend: {
			display: false,
		},
	},
};
</script>

<template>
	<div class="bar" v-if="Object.keys(props.content).length > 0">
		<h3 class="heading">
			{{ props.label }}
		</h3>
		<Bar :chart-data="chartData" :chart-options="options" :height="200" />
	</div>
</template>

<style lang="scss">
h3.heading {
	margin-bottom: 2.5rem;
}
</style>
