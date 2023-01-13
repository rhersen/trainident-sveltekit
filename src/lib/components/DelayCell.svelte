<script>
	import { differenceInSeconds, parseISO } from 'date-fns';
	import hue from '$lib/hue.js';

	export let announcement;

	const delay =
		announcement?.TimeAtLocationWithSeconds &&
		differenceInSeconds(
			parseISO(announcement.TimeAtLocationWithSeconds),
			parseISO(announcement.AdvertisedTimeAtLocation)
		);

	const h = hue(delay);
</script>

<td style={h && `background-color: hsl(${h}deg, 100%, 70%)`}>
	{announcement.TimeAtLocationWithSeconds
		? differenceInSeconds(
				parseISO(announcement.TimeAtLocationWithSeconds),
				parseISO(announcement.AdvertisedTimeAtLocation)
		  ).toString()
		: ''}
</td>

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
