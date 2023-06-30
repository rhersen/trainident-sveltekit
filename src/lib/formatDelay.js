import { differenceInSeconds, parseISO } from 'date-fns';

export default (announcement) => {
	if (!announcement.TimeAtLocationWithSeconds) return '';

	const number = differenceInSeconds(
		parseISO(announcement.TimeAtLocationWithSeconds),
		parseISO(announcement.AdvertisedTimeAtLocation)
	);

	if (number < 6) return '0';
	if (number < 30) return '⅒';
	if (number < 60) return '½';
	return number;
};
