import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	console.log(params);
	const locationsResponse = await fetch('https://trafikverket-locations.netlify.app/short.json');
	if (!locationsResponse.ok) throw error(locationsResponse.status, locationsResponse.statusText);

	const announcementsResponse = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
		method: 'POST',
		body: getBody({ train: '282', until: '2022-12-04T17:51:00.000+01:00' }),
		headers: {
			'Content-Type': 'application/xml',
			Accept: 'application/json'
		}
	});
	if (!announcementsResponse.ok)
		throw error(announcementsResponse.status, announcementsResponse.statusText);

	const { RESPONSE } = await announcementsResponse.json();
	const [announcements] = RESPONSE.RESULT;

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
      <INCLUDE>TimeAtLocation</INCLUDE>
      <INCLUDE>TimeAtLocationWithSeconds</INCLUDE>
      <INCLUDE>ToLocation</INCLUDE>
     </QUERY>
</REQUEST>`;
}
