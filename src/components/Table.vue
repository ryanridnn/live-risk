<script setup>
import { defineProps, computed } from "vue ";

const props = defineProps({
	label: String,
	content: [Array, Object],
	maxHeight: {
		type: Number,
		default: 600,
	},
	options: {
		type: Object,
		default: {
			keyAndValue: false,
			headings: [],
		},
	},
});

const tableHeadings = computed(() => {
	if (props.options.keyAndValue) {
		return props.options.headings;
	} else {
		return !props.content || props.content.length === 0
			? []
			: Object.keys(props.content[0]);
	}
});
</script>

<template>
	<div
		v-if="props.content && Object.keys(props.content).length > 0"
		class="table"
	>
		<h3 class="heading">{{ props.label }}</h3>
		<table
			class="table__element"
			:style="{ 'max-height': props.maxHeight + 'px' }"
		>
			<tr class="table__row table__row-heading">
				<th
					v-for="heading in tableHeadings"
					:key="heading"
					class="table__heading"
				>
					{{ heading }}
				</th>
			</tr>
			<template v-if="props.options.keyAndValue">
				<tr
					v-for="key in Object.keys(props.content)"
					class="table__row"
				>
					<td class="table__data">{{ key }}</td>
					<td class="table__data">{{ props.content[key] }}</td>
				</tr>
			</template>
			<template v-else>
				<tr v-for="data in props.content" class="table__row">
					<td v-for="key in Object.keys(data)" class="table__data">
						{{ data[key] }}
					</td>
				</tr>
			</template>
		</table>
	</div>
</template>

<style lang="scss">
.table {
	&__element {
		display: flex;
		flex-direction: column;
		color: #222;
		border-radius: 0.75rem;
		overflow-y: auto;
		position: relative;
		font-size: 0.875rem;
	}

	&__row {
		display: flex;
		width: 100%;
	}

	&__row-heading {
		top: 0;
		position: sticky;
	}

	&__heading,
	&__data {
		flex: 1;
		padding: 0.75rem;
		border: 0.5px solid rgb(51 65 85);
	}

	&__heading {
		font-weight: 500;
		background: rgb(37, 99, 235);
		color: white;
	}

	&__data {
		// background: rgb(30 41 59);
		color: white;
	}

	h3.heading {
		margin-bottom: 1.5rem;
	}
}
</style>
