export const load = async ({ params }) => {
	console.log(params);
	const response = await fetch('https://trafikverket-locations.netlify.app/short.json');
	if (!response.ok)
		return {
			statusCode: response.status,
			body: JSON.stringify({ msg: response.statusText })
		};

	const data = await response.json();

	return { locations: JSON.stringify(data) };
};
