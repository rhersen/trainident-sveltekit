<script>
	import locations from '$lib/short.json';
	export let announcement;

	function fromLocation(announcement) {
		return (
			announcement.FromLocation &&
			announcement.FromLocation.map((location) => locations[location.LocationName]).join()
		);
	}
</script>

<td class="destination">
	<span class="from">{fromLocation(announcement)}–</span>
	{announcement.ToLocation &&
		announcement.ToLocation.map((location) => locations[location.LocationName]).join()}
</td>
