<script>
	export let data;
</script>

<h1>Welcome to 282</h1>
<table>
	<tr>
		<th>activity</th>
		<th>train</th>
		<th>advertised</th>
		<th>LocationSignature</th>
		<th>track</th>
		<th>time</th>
	</tr>
	{#each data.announcements as { ActivityType, AdvertisedTrainIdent, AdvertisedTimeAtLocation, LocationSignature, TrackAtLocation, TimeAtLocation, TimeAtLocationWithSeconds }}
		<tr>
			<td>{ActivityType}</td>
			<td>{AdvertisedTrainIdent}</td>
			<td>{AdvertisedTimeAtLocation.slice(0, 16)}</td>
			<td>{data.locations[LocationSignature]}</td>
			<td>{TrackAtLocation}</td>
			<td>{TimeAtLocationWithSeconds?.slice(0, 19)}</td>
		</tr>
	{/each}
</table>
