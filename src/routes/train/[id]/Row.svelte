<script>
	import AdvertisedTimeCell from '$lib/components/AdvertisedTimeCell.svelte';
	import TrackCell from '$lib/components/TrackCell.svelte';
	import ShortCell from '$lib/components/ShortCell.svelte';
	import TimeCell from '$lib/components/TimeCell.svelte';
	import DelayCell from '$lib/components/DelayCell.svelte';
	import DeviationCell from '$lib/components/DeviationCell.svelte';
	import LocationCell from './LocationCell.svelte';
	import CountdownCell from '$lib/components/CountdownCell.svelte';
	import { differenceInMinutes, parseISO } from 'date-fns';

	export let announcement;

	function getColor() {
		const delay =
			announcement.TimeAtLocationWithSeconds &&
			differenceInMinutes(
				parseISO(announcement.TimeAtLocationWithSeconds),
				parseISO(announcement.AdvertisedTimeAtLocation)
			).toString();
		if (delay) return delay < 1 ? '1' : delay < 2 ? '2' : delay < 4 ? '4' : delay < 8 ? '8' : '9';
	}
</script>

<tr class={`delay-${getColor()}`}>
	<TrackCell {announcement} />
	<ShortCell {announcement} />
	<LocationCell {announcement} />
	<AdvertisedTimeCell {announcement} />
	<TimeCell {announcement} />
	<DelayCell {announcement} />
	<CountdownCell {announcement} />
	<DeviationCell {announcement} />
</tr>

<style>
	.delay-1 {
		background-color: #8f8;
	}
	.delay-2 {
		background-color: #ccc;
	}
	.delay-4 {
		background-color: #ff8;
	}
	.delay-8 {
		background-color: #fc8;
	}
	.delay-9 {
		background-color: #f88;
	}
</style>
