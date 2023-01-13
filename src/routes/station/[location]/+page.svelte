<script>
	import locations from '$lib/short.json';
	import Row from './Row.svelte';
	import { onDestroy, onMount } from 'svelte';

	export let data;
	let eventSource;

	onMount(() => {
		eventSource = new EventSource(data.sseUrl);
		eventSource.onmessage = ({ data: s }) => {
			const { RESPONSE } = JSON.parse(s);
			const [{ TrainAnnouncement }] = RESPONSE.RESULT;
			const updated = data.announcements;
			for (let i = 0; i < TrainAnnouncement.length; i++) {
				const found = data.announcements.findIndex(
					({ AdvertisedTrainIdent }) =>
						AdvertisedTrainIdent === TrainAnnouncement[i].AdvertisedTrainIdent
				);
				if (found >= 0) updated[found] = TrainAnnouncement[i];
			}
			data.announcements = updated;
		};
	});

	onDestroy(() => {
		if (eventSource) eventSource.close();
	});
</script>

<table>
	<caption>
		{locations[data.location]}
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
