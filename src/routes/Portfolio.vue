<script setup>
import { computed, ref } from "vue";
import { useConnectionStore } from "../store";
import { validateSubmit } from "../utils";
import { updateParam } from "../connection";

import Table from "../components/Table.vue";

const connection = useConnectionStore();

const timeout = ref(null);

const portfolio = computed(() => connection.dagNodes[0]);

const trades = computed(() =>
	portfolio.value ? portfolio.value.output_params.Trades : []
);

const handleUpdate = (e, key) => {
	validateSubmit(e, () => {
		updateParam(0, key, e.target.value);
	});
};

const progress = computed(() => connection.dagNodesProgress[0] || 0);
const status = computed(() => connection.dagNodesStatus[0]);

const progressStyle = computed(() => ({
	width: progress.value * 100 + "%",
}));
</script>

<template>
	<div class="portfolio">
		<div class="portfolio__top">
			<h2 class="portfolio__heading heading">Portfolio Settings</h2>
			<div class="portfolio__form">
				<div class="portfolio__input input">
					<label for="numTrades" class="portfolio__label"
						>Num Trades</label
					>
					<input
						type="number"
						class="portfolio__field"
						id="numTrades"
						:value="portfolio && portfolio.input_params.NumTrades"
						@keydown="(e) => handleUpdate(e, 'NumTrades')"
					/>
				</div>
				<div class="portfolio__input input">
					<label for="valDate" class="portfolio__label"
						>Valuation Date</label
					>
					<input
						type="number"
						class="portfolio__field"
						id="valDate"
						:value="portfolio && portfolio.input_params.ValDate"
						@keydown="(e) => handleUpdate(e, 'ValDate')"
					/>
				</div>
			</div>
		</div>
		<div class="portfolio__bottom">
			<div class="portfolio__output">
				<h3 class="heading">Kernel Creation</h3>
				<div class="portfolio__progress progress">
					<div class="progress__text">
						{{
							progress === 1 ? 100 : (progress * 100).toFixed(2)
						}}% Complete
					</div>
					<div :style="progressStyle" class="progress__bar"></div>
				</div>
			</div>
			<Table label="Trades" :content="trades" />
		</div>
	</div>
</template>

<style lang="scss">
.portfolio {
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
		width: 440px;
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
	}

	&__output {
		margin-bottom: 2rem;
	}
}

h3.heading {
	margin-bottom: 1.25rem;
}

.progress {
	height: 2.5rem;
	background: rgb(240, 152, 5);
	border-radius: 0.5rem;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	&__text {
		position: relative;
		z-index: 1;
		color: rgb(30, 41, 59);
		font-weight: bold;
	}

	&__bar {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background: rgb(251, 191, 36);
		border-top-right-radius: 0.375rem;
		border-bottom-right-radius: 0.375rem;
		transition: all 0.2s ease;
	}
}
</style>
