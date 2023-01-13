<script>
	import locations from '$lib/short.json';
	import Row from './Row.svelte';

	export let data;
</script>

<table>
	<caption>
		<div>
			{data.ProductInformation?.map(({ Description }) => Description).join(' ')}
			{data.AdvertisedTrainIdent}
			från
			{data.FromLocation?.map(({ LocationName }) => locations[LocationName]).join(' ')}
			till
			{data.ToLocation?.map(({ LocationName }) => locations[LocationName]).join(' ')}
		</div>
		{#if data.ViaToLocation}
			<div>
				via
				{data.ViaToLocation?.map(({ LocationName }) => locations[LocationName]).join(', ')}
			</div>
		{/if}
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
		font-family: Palatino, serif;
		font-weight: bold;
		margin-top: 0.83em;
	}

	caption div:nth-child(1) {
		font-size: 1.5em;
	}

	caption div:nth-child(2) {
		font-size: 1.2em;
	}
</style>
