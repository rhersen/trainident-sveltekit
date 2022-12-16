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
