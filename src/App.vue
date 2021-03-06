<script setup>
import { ref, computed, onMounted } from "vue";
import { useConnectionStore } from "./store";
import { useConnection } from "./connection/";
import { CONNECTION_URL, MENUS } from "./constants";

import Alert from "./components/Alert.vue";
import LoadingPopup from "./components/LoadingPopup.vue";
import Dashboard from "./routes/Dashboard.vue";
import Portfolio from "./routes/Portfolio.vue";

const connection = useConnectionStore();

const currentMenu = ref(MENUS.DASHBOARD);

const isLoaded = computed(() => {
	if (connection.loadComplete) {
		return true;
	} else {
		return false;
	}
});

onMounted(() => {
	useConnection(CONNECTION_URL);
});

const selectMenu = (menu) => {
	currentMenu.value = menu;
};
</script>

<template>
	<div class="container">
		<Alert />
		<LoadingPopup :show="!isLoaded" />
		<div v-if="isLoaded" class="main">
			<div class="main__tabs">
				<button
					v-for="menu in Object.keys(MENUS)"
					@click="selectMenu(MENUS[menu])"
					class="main__tab"
					:class="{
						'main__tab--active': MENUS[menu] === currentMenu,
					}"
				>
					{{ MENUS[menu] }}
				</button>
			</div>
			<div class="main__view">
				<Dashboard v-if="currentMenu === MENUS.DASHBOARD" />
				<Portfolio v-if="currentMenu === MENUS.PORTFOLIO" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.container {
	width: 96%;
	max-width: 1300px;
	margin: 0 auto;
	min-height: 100vh;
	padding-bottom: 4rem;

	&,
	& * {
		font-family: "Inter", sans-serif;
	}
}

.main {
	padding-top: 2rem;

	&__tabs {
		display: flex;
		align-items: center;
		margin: 0 auto;
		width: fit-content;
		padding: 0.375rem;
		border-radius: 0.5rem;
		background: rgb(51 65 85);
	}

	&__tab {
		padding: 0.5rem 0.75rem;
		color: white;
		border-radius: 0.25rem;
		font-size: 1rem;

		&--active {
			background: rgba(251, 191, 36, 1);
			color: rgb(30 41 59);
			font-weight: 500;
		}
	}

	&__view {
		margin-top: 2rem;
		background: rgb(15 23 42);
		padding: 2rem;
		border-radius: 1rem;
	}
}

input,
button {
	border: none;
	background: none;
}

button:not(:disabled) {
	cursor: pointer;
}

.heading {
	display: inline-block;
	font-weight: 600;
	position: relative;
}

.heading::before {
	content: "";
	position: absolute;
	bottom: -2px;
	left: 0;
	width: 100%;
	height: 2px;
	background: linear-gradient(
		90deg,
		rgba(251, 191, 36, 1) 50%,
		rgba(255, 255, 255, 1) 200%
	);
	border-radius: 0.25rem;
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
