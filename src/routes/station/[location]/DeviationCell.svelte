<script>
	export let announcement;

	function descriptions(deviation) {
		return deviation.Description;
	}

	function deviationText() {
		return (announcement.Deviation || []).map(descriptions).filter((s) => !/Kort/.test(s));
	}
</script>

<td class="deviation">
	{#each deviationText(announcement) as c}
		<div>{c}</div>
	{/each}
</td>
