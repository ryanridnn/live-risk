<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useConnection } from "./connection/";
import { CONNECTION_URL } from "./constants";

import Alert from "./components/Alert.vue";

const route = useRoute();

onMounted(() => {
	useConnection(CONNECTION_URL);
});
</script>

<template>
	<div class="container">
		<Alert />
		<div class="main">
			<div class="main__tabs">
				<router-link
					to="/"
					class="main__tab"
					:class="{ 'main__tab--active': route.path === '/' }"
					>Dashboard</router-link
				>
				<router-link
					to="/portfolio"
					class="main__tab"
					:class="{
						'main__tab--active': route.path === '/portfolio',
					}"
					>Portfolio</router-link
				>
				<router-link
					to="/settings"
					class="main__tab"
					:class="{ 'main__tab--active': route.path === '/settings' }"
					>Settings</router-link
				>
			</div>
			<div class="main__view">
				<router-view></router-view>
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
