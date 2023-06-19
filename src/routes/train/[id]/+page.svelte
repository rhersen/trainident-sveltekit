<script>
	import locations from '$lib/short.json';
	import Row from './Row.svelte';
	import {onDestroy, onMount} from "svelte";

	export let data;
	let eventSource;

	function update(announcements, updates) {
		const a = [...announcements];

		for (const update of updates) {
			const i = data.announcements.findIndex(sameId(update));
			if (i >= 0) a[i] = update; else a.push(update)
		}

		return a;

		function sameId(a1) {
			return (a2) => a1.LocationSignature === a2.LocationSignature;
		}
	}

	onMount(() => {
		if (!data?.sseUrl) return;

		eventSource = new EventSource(data.sseUrl);
		eventSource.onmessage = ({ data: s }) => {
			const { RESPONSE } = JSON.parse(s);
			const [{ TrainAnnouncement }] = RESPONSE.RESULT;
			data.announcements = update(data.announcements, TrainAnnouncement);
		};
	});

	onDestroy(() => {
		if (eventSource) eventSource.close();
	});
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
