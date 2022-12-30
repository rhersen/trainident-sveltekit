export default (RESPONSE) =>
	RESPONSE.RESULT[0].TrainAnnouncement.filter(
		({ ActivityType, LocationSignature, ToLocation }) =>
			ActivityType === 'Avgang' ||
			ToLocation.some(({ LocationName }) => LocationName === LocationSignature)
	);
