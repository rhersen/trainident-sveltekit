<script>
	import AdvertisedTimeCell from '$lib/components/AdvertisedTimeCell.svelte';
	import TrackCell from '$lib/components/TrackCell.svelte';
	import ShortCell from '$lib/components/ShortCell.svelte';
	import TimeCell from '$lib/components/TimeCell.svelte';
	import DelayCell from '$lib/components/DelayCell.svelte';
	import DeviationCell from '$lib/components/DeviationCell.svelte';
	import LocationCell from './LocationCell.svelte';

	export let announcement;
</script>

<tr>
	<TrackCell {announcement} />
	<ShortCell {announcement} />
	<LocationCell {announcement} />
	<AdvertisedTimeCell {announcement} />
	<TimeCell {announcement} />
	<DelayCell {announcement} />
	<DeviationCell {announcement} />
</tr>

<style>
	tr.northbound {
		background-color: #fdd;
	}

	tr.southbound {
		background-color: lightblue;
	}
</style>
