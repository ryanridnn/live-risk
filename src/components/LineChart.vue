<script setup>
import { defineProps, computed } from "vue";

import { Line } from "vue-chartjs";
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
				borderColor: "rgb(52 211 153)",
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
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
						color: "white",
					},
					grid: {
						borderColor: "white",
					},
				},
			],
		},
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
	<div class="line" v-if="Object.keys(props.content).length > 0">
		<h3 class="heading">
			{{ props.label }}
		</h3>
		<Line :chart-data="chartData" :chart-options="options" :height="200" />
	</div>
</template>

<style lang="scss">
h3.heading {
	margin-bottom: 2.5rem;
}
</style>
