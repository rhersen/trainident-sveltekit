<script>
	import { format, parseISO } from 'date-fns';

	export let announcement;

	function time(announcement) {
		return hmm(announcement.AdvertisedTimeAtLocation);

		function hmm(advertised) {
			const parsed = parseISO(advertised);
			return format(parsed, parsed.getSeconds() ? 'H:mm:ss' : 'H:mm');
		}
	}
</script>

<td class="advertised">{time(announcement)}</td>
