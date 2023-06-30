export default (RESPONSE) => RESPONSE.RESULT[0].TrainAnnouncement.filter(announcementFilter);

export function announcementFilter({ ActivityType, LocationSignature, ToLocation = [] }) {
	return (
		ActivityType === 'Avgang' ||
		ToLocation.some(({ LocationName }) => LocationName === LocationSignature)
	);
}
