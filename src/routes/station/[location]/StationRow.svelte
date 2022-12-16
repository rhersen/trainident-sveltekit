<script>
	import TrainIdCell from './TrainIdCell.svelte';
	import AdvertisedTimeCell from './AdvertisedTimeCell.svelte';
	import DestinationCell from './DestinationCell.svelte';
	import TrackCell from './TrackCell.svelte';
	import ShortCell from './ShortCell.svelte';
	import TimeCell from './TimeCell.svelte';
	import DelayCell from './DelayCell.svelte';
	import DeviationCell from './DeviationCell.svelte';

	export let announcement;
</script>

<tr>
	<TrainIdCell {announcement} />
	<TrackCell {announcement} />
	<ShortCell {announcement} />
	<DestinationCell {announcement} />
	<AdvertisedTimeCell {announcement} />
	<TimeCell {announcement} />
	<DelayCell {announcement} />
	<DeviationCell {announcement} />
</tr>
