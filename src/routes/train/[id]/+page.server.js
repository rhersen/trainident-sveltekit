import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { id } = params;

	const announcementsResponse = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
		method: 'POST',
		body: getBody({ id }),
		headers: {
			'Content-Type': 'application/xml',
			Accept: 'application/json'
		}
	});
	if (!announcementsResponse.ok)
		throw error(announcementsResponse.status, announcementsResponse.statusText);

	const { RESPONSE } = await announcementsResponse.json();
	const [announcements] = RESPONSE.RESULT;

	return { id, announcements: announcements.TrainAnnouncement };
};

function getBody({ id }) {
	return `
<REQUEST>
  <LOGIN authenticationkey='${process.env.TRAFIKVERKET_API_KEY}' />
     <QUERY objecttype='TrainAnnouncement' orderby='AdvertisedTimeAtLocation' schemaversion='1.6'>
      <FILTER>
         <AND>
            <NE name='Canceled' value='true' />
            <EQ name='Advertised' value='true' />
            <EQ name='ActivityType' value='Avgang' />
        <EQ name='AdvertisedTrainIdent' value='${id}' />
            <OR>
               <GT name='AdvertisedTimeAtLocation' value='$dateadd(-1:05:00)' />
               <GT name='EstimatedTimeAtLocation' value='$dateadd(-1:05:00)' />
            </OR>
            <LT name='AdvertisedTimeAtLocation' value='$dateadd(1:30:00)' />
         </AND>
      </FILTER>
     </QUERY>
</REQUEST>`;
}
