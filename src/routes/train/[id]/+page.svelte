<script>
	import locations from '$lib/short.json';
	import Row from './Row.svelte';

	export let data;
</script>

<table>
	<caption>
		{data.ProductInformation.map(({ Description }) => Description).join(' ')}
		{data.AdvertisedTrainIdent}
		från
		{data.FromLocation.map(({ LocationName }) => locations[LocationName]).join(' ')}
		till
		{data.ToLocation.map(({ LocationName }) => locations[LocationName]).join(' ')}
		via
		{data.ViaToLocation?.map(({ LocationName }) => locations[LocationName]).join(', ')}
	</caption>
	<tbody>
		{#each data.announcements as announcement}
			<Row {announcement} />
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
