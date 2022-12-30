<script>
	export let announcement;
</script>

<td>
	{announcement.ProductInformation?.map(({ Description }) => Description).join(' ')}
</td>

<style>
	td {
		border: 1px solid gray;
		font-size: 22px;
		font-family: Palatino, serif;
		text-align: left;
		padding: 0 2px;
	}

	@media (max-width: 800px) {
		td {
			display: none;
		}
	}
</style>
