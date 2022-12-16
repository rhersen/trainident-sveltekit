<script>
	import { differenceInSeconds, parseISO } from 'date-fns';

	export let announcement;
</script>

<td class="delay"
	>{announcement.TimeAtLocationWithSeconds
		? differenceInSeconds(
				parseISO(announcement.TimeAtLocationWithSeconds),
				parseISO(announcement.AdvertisedTimeAtLocation)
		  ).toString()
		: ''}</td
>
