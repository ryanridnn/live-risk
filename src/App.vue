<script setup>
import { ref, onMounted } from "vue";
import { useConnection } from "./connection/";
import { CONNECTION_URL, MENUS } from "./constants";

import Alert from "./components/Alert.vue";
import Dashboard from "./routes/Dashboard.vue";
import Portfolio from "./routes/Portfolio.vue";

const currentMenu = ref(MENUS.DASHBOARD);

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
		<div class="main">
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
}

.main {
	margin-top: 2rem;

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
</style>
