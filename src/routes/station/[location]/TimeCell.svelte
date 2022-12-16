<script>
	import { format, parseISO } from 'date-fns';

	export let announcement;

	function hmm(advertised) {
		const parsed = parseISO(advertised);
		return format(parsed, parsed.getSeconds() ? 'H:mm:ss' : 'H:mm');
	}
</script>

<td class="time">
	{#if announcement.TimeAtLocation}
		<b>{hmm(announcement.TimeAtLocationWithSeconds)}</b>
	{:else if announcement.EstimatedTimeAtLocation}
		<i>{hmm(announcement.EstimatedTimeAtLocation)}</i>
	{:else}
		{hmm(announcement.AdvertisedTimeAtLocation)}
	{/if}
</td>
