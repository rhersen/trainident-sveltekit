import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	console.log(params);
	const locationsResponse = await fetch('https://trafikverket-locations.netlify.app/short.json');
	if (!locationsResponse.ok) throw error(locationsResponse.status, locationsResponse.statusText);

	const announcementsResponse = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
		method: 'POST',
		body: getBody({ train: '282', until: '2022-12-04T19:00:00.000+01:00' }),
		headers: {
			'Content-Type': 'application/xml',
			Accept: 'application/json'
		}
	});
	if (!announcementsResponse.ok)
		throw error(announcementsResponse.status, announcementsResponse.statusText);

	const { RESPONSE } = await announcementsResponse.json();
	const [result] = RESPONSE.RESULT;

	const announcements = result.TrainAnnouncement.filter(
		({ TimeAtLocationWithSeconds }) => TimeAtLocationWithSeconds
	);
	announcements.sort((a1, a2) => {
		const t1 = a1.TimeAtLocationWithSeconds.slice(11);
		const t2 = a2.TimeAtLocationWithSeconds.slice(11);
		if (t1 === t2) return 0;
		return t1 < t2 ? -1 : 1;
	});
	return {
		locations: await locationsResponse.json(),
		announcements
	};
};

function getBody({ train, until }) {
	return `
<REQUEST>
  <LOGIN authenticationkey='${process.env.TRAFIKVERKET_API_KEY}' />
    <QUERY sseurl='true' objecttype='TrainAnnouncement' orderby='TimeAtLocationWithSeconds' schemaversion='1.6'>
      <FILTER>
        <AND>
          <EQ name='AdvertisedTrainIdent' value='${train}'/>
          <LT name='AdvertisedTimeAtLocation' value='${until}'/>
        </AND>
      </FILTER>
      <INCLUDE>ActivityType</INCLUDE>
      <INCLUDE>AdvertisedTrainIdent</INCLUDE>
      <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
      <INCLUDE>LocationSignature</INCLUDE>
      <INCLUDE>TrackAtLocation</INCLUDE>
      <INCLUDE>TimeAtLocationWithSeconds</INCLUDE>
    </QUERY>
</REQUEST>`;
}
