<script setup>
import { computed, ref, watchEffect, onUnmounted } from "vue";
import { useConnectionStore, useAlertStore } from "../store";
import { updateParam } from "../connection";
import { generateRandomNumber } from "../utils";

import LineChart from "../components/LineChart.vue";
import BarChart from "../components/BarChart.vue";
import Table from "../components/Table.vue";
import RangeInput from "../components/RangeInput.vue";

const connection = useConnectionStore();
const alert = useAlertStore();
const randomInputInterval = ref(null);

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
	if (e.target.value !== "" && !!Number(e.target.value)) {
		if (
			!Number(e.target.value) ||
			Number(e.target.value) < -3 ||
			Number(e.target.value) > 3
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
		updateParam(1, key, Number(e.target.value), true);
	});
};

const onRandomInput = (e) => {
	if (e.target.checked) {
		randomInputInterval.value = setInterval(() => {
			updateParam(1, "parallel_shift", generateRandomNumber(-3, 3), true);
			updateParam(1, "parallel_tilt", generateRandomNumber(-3, 3), true);
			updateParam(1, "parallel_twist", generateRandomNumber(-3, 3), true);
		}, 2000);
	} else {
		clearInterval(randomInputInterval.value);
	}
};

onUnmounted(() => {
	clearInterval(randomInputInterval.value);
});
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
							@input="onRandomInput"
						/>
						<label for="randomMarketData" class="toggle__wrapper">
							<div class="toggle__circle"></div>
						</label>
					</div>
				</div>
				<div class="dashboard__input input">
					<label for="parallelShift" class="dashboard__label"
						>Parallel Shift</label
					>
					<RangeInput
						:onInput="(e) => handleUpdate(e, 'parallel_shift')"
						:options="{ min: -3, max: 3, step: 0.005 }"
						:value="
							priceAndRisk &&
							priceAndRisk.input_params.parallel_shift
						"
					/>
				</div>
				<div class="dashboard__input input">
					<label for="parallelTilt" class="dashboard__label"
						>Parallel Tilt</label
					>
					<RangeInput
						:onInput="(e) => handleUpdate(e, 'parallel_tilt')"
						:options="{ min: -3, max: 3, step: 0.005 }"
						:value="
							priceAndRisk &&
							priceAndRisk.input_params.parallel_tilt
						"
					/>
				</div>
				<div class="dashboard__input input">
					<label for="parallelTwist" class="dashboard__label"
						>Parallel Twist</label
					>
					<RangeInput
						:onInput="(e) => handleUpdate(e, 'parallel_twist')"
						:options="{ min: -3, max: 3, step: 0.005 }"
						:value="
							priceAndRisk &&
							priceAndRisk.input_params.parallel_twist
						"
					/>
				</div>
			</div>
		</div>
		<div class="dashboard__bottom">
			<div class="dashboard__outputs">
				<LineChart label="Market Rates" :content="marketRates" />
				<LineChart label="Fitted Values" :content="fittedValues" />
			</div>
			<div class="dashboard__outputs">
				<BarChart label="Risk Graph" :content="risk" />
				<Table
					label="Risk Table"
					:content="risk"
					:options="{ keyAndValue: true, headings: ['Key', 'Value'] }"
					:maxHeight="440"
				/>
			</div>
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
		width: 640px;
		padding: 0.25rem;
	}

	&__toggle-group {
		.toggle {
			width: 400px;
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
		gap: 3rem;
	}

	&__outputs {
		display: flex;
		max-width: 100%;
		gap: 3rem;

		& > * {
			flex: 1;
		}
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
