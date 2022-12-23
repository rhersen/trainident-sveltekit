<script>
	import { differenceInSeconds, parseISO } from 'date-fns';

	export let announcement;
</script>

<td>
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
