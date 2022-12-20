<script>
	import StationRow from './StationRow.svelte';

	export let data;
</script>

<table>
	<caption>
		{data.location}
	</caption>
	<tbody>
		{#each data.announcements as announcement}
			<StationRow {announcement} />
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}

	caption {
		font-size: 1.5em;
		font-weight: bold;
		margin-top: 0.83em;
	}
</style>
