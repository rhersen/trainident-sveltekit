<script>
	export let announcement;

	function descriptions(deviation) {
		return deviation.Description;
	}

	function shortText(announcement) {
		const deviations = (announcement.Deviation || []).map(descriptions);

		return deviations
			? deviations
					.map((s) => {
						if (/Kort/.test(s)) return 'K';
						if (s.length) return '*';
						return s;
					})
					.join()
			: '';
	}
</script>

<td class="short">{shortText(announcement)}</td>
