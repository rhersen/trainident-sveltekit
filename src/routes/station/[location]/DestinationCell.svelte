<script>
	import locations from '$lib/short.json';
	export let announcement;

	function loc(array) {
		return array.map((location) => locations[location.LocationName]).join();
	}
</script>

<td>
	<span class="from">{loc(announcement.FromLocation)}–</span><span
		>{loc(announcement.ToLocation)}</span
	>
</td>

<style>
	td {
		border: 1px solid gray;
		font-size: 22px;
		font-family: Palatino, serif;
		text-align: left;
		padding: 0 2px;
	}

	.from {
		font-size: smaller;
	}

	@media (max-width: 520px) {
		td {
			color: blue;
			text-decoration: underline;
		}
	}

	@media (max-width: 660px) {
		.from {
			display: none;
		}
	}
</style>
