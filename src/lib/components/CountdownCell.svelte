<script>
	import { addSeconds, differenceInSeconds, format, parseISO } from 'date-fns';

	export let announcement;

	function countdown(announcement, now) {
		if (!now) return '';

		const dateLeft =
			announcement.TimeAtLocationWithSeconds ||
			announcement.EstimatedTimeAtLocation ||
			announcement.AdvertisedTimeAtLocation;
		const seconds = differenceInSeconds(parseISO(dateLeft), now);

		if (seconds <= -100) return '';
		if (seconds >= 600) return `${format(addSeconds(new Date(0), seconds), 'm')}min`;
		if (seconds >= 100) return format(addSeconds(new Date(0), seconds), 'm:ss');
		return `${seconds}s`;
	}
</script>

<td>{countdown(announcement, new Date())}</td>

<style>
	td {
		border: 1px solid gray;
		font-size: 22px;
		font-family: Palatino, serif;
		text-align: left;
		padding: 0 2px;
	}

	@media (max-width: 370px) {
		td {
			display: none;
		}
	}
</style>
