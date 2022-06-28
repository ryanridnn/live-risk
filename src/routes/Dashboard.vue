<script setup>
import { computed, watchEffect } from "vue";
import { useConnectionStore, useAlertStore } from "../store";
import { updateParam } from "../connection";

import LineChart from "../components/LineChart.vue";
import BarChart from "../components/BarChart.vue";
import Table from "../components/Table.vue";

const connection = useConnectionStore();
const alert = useAlertStore();

const priceAndRisk = computed(() => connection.dagNodes[1]);

const marketRates = computed(
	() =>
		(priceAndRisk.value
			? priceAndRisk.value.output_params.MarketRates
			: {}) || {}
);

const fittedValues = computed(
	() =>
		(priceAndRisk.value
			? priceAndRisk.value.output_params.fitted_values
			: []) || []
);

const risk = computed(
	() =>
		(priceAndRisk.value ? priceAndRisk.value.output_params.Risk : []) || []
);

const validateSubmit = (e, callback) => {
	if (
		e.code === "Enter" &&
		e.target.value !== "" &&
		!!Number(e.target.value)
	) {
		if (
			!Number(e.target.value) ||
			Number(e.target.value) < -0.05 ||
			Number(e.target.value) > 0.05
		) {
			alert.showAlert("Alert: Insert value between -0.05 and 0.05");
			return;
		} else {
			callback();
		}
	}
};

const handleUpdate = (e, key) => {
	validateSubmit(e, () => {
		updateParam(1, key, e.target.value);
	});
};
</script>

<template>
	<div class="dashboard">
		<div class="dashboard__top">
			<h2 class="dashboard__heading heading">
				Market Data Stream Simulation
			</h2>
			<div class="dashboard__form">
				<div class="dashboard__input dashboard__toggle-group">
					<label for="randomMarketData" class="dashboard__label"
						>Random Market Data</label
					>
					<div class="toggle">
						<input
							type="checkbox"
							class="toggle__checkbox"
							id="randomMarketData"
						/>
						<label for="randomMarketData" class="toggle__wrapper">
							<div class="toggle__circle"></div>
						</label>
					</div>
				</div>
				<div class="dashboard__input input">
					<label for="parallelShift" class="dashboard__label"
						>Paralllel Shift</label
					>
					<input
						type="number"
						class="dashboard__field"
						id="parallelShift"
						:value="
							priceAndRisk &&
							priceAndRisk.input_params.parallel_shift
						"
						@keydown="(e) => handleUpdate(e, 'parallel_shift')"
					/>
				</div>
				<div class="dashboard__input input">
					<label for="parallelTilt" class="dashboard__label"
						>Paralllel Tilt</label
					>
					<input
						type="number"
						class="dashboard__field"
						id="parallelTilt"
						:value="
							priceAndRisk &&
							priceAndRisk.input_params.parallel_tilt
						"
						@keydown="(e) => handleUpdate(e, 'parallel_tilt')"
					/>
				</div>
				<div class="dashboard__input input">
					<label for="parallelTwist" class="dashboard__label"
						>Paralllel Twist</label
					>
					<input
						type="number"
						class="dashboard__field"
						id="parallelTwist"
						:value="
							priceAndRisk &&
							priceAndRisk.input_params.parallel_twist
						"
						@keydown="(e) => handleUpdate(e, 'parallel_twist')"
					/>
				</div>
			</div>
		</div>
		<div class="dashboard__bottom">
			<LineChart label="Market Rates" :content="marketRates" />
			<LineChart label="Fitted Values" :content="fittedValues" />
			<BarChart label="Risk Graph" :content="risk" />
			<Table
				label="Risk Table"
				:content="risk"
				:options="{ keyAndValue: true, headings: ['Key', 'Value'] }"
			/>
		</div>
	</div>
</template>

<style lang="scss">
.dashboard {
	&__top {
		border: 2px dashed rgb(71 85 105);
		padding: 1.5rem;
		border-radius: 1rem;
	}

	&__form {
		margin-top: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	&__input {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 480px;
	}

	&__toggle-group {
		.toggle {
			width: 230px;
		}
	}

	&__label {
		font-weight: 500;
	}

	&__field {
		padding: 0.5rem;
		background: rgb(51 65 85);
		border-radius: 0.25rem;
		color: white;

		&:focus {
			outline: 1px solid rgb(226 232 240);
		}
	}

	&__bottom {
		margin-top: 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
}

.toggle {
	&__checkbox {
		display: none;
	}

	&__checkbox:checked + &__wrapper {
		background: rgb(34 197 94);
		transition: all 0.2s ease;

		.toggle__circle {
			transform: translateX(1.75rem);
		}
	}

	&__wrapper {
		display: flex;
		align-items: center;
		height: 2rem;
		width: 3.5rem;
		border-radius: 0.5rem;
		background: rgb(51, 65, 85);
		cursor: pointer;
	}

	&__circle {
		height: 1.25rem;
		width: 1.25rem;
		background: #eee;
		border-radius: 0.25rem;
		transform: translateX(0.5rem);
		transition: all 0.2s ease;
	}
}
</style>
