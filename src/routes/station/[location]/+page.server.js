import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	console.log(params);
	const { location } = params;

	const announcementsResponse = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
		method: 'POST',
		body: getBody({ location }),
		headers: {
			'Content-Type': 'application/xml',
			Accept: 'application/json'
		}
	});
	if (!announcementsResponse.ok)
		throw error(announcementsResponse.status, announcementsResponse.statusText);

	const { RESPONSE } = await announcementsResponse.json();
	const [announcements] = RESPONSE.RESULT;

	return { location, announcements };
};

function getBody({ location }) {
	return `
<REQUEST>
  <LOGIN authenticationkey='${process.env.TRAFIKVERKET_API_KEY}' />
     <QUERY objecttype='TrainAnnouncement' orderby='AdvertisedTimeAtLocation' schemaversion='1.6'>
      <FILTER>
         <AND>
            <NE name='Canceled' value='true' />
            <EQ name='Advertised' value='true' />
            <EQ name='ActivityType' value='Avgang' />
            <EQ name='LocationSignature' value='${location}' />
            <OR>
               <GT name='AdvertisedTimeAtLocation' value='$dateadd(-0:05:00)' />
               <GT name='EstimatedTimeAtLocation' value='$dateadd(-0:05:00)' />
            </OR>
            <LT name='AdvertisedTimeAtLocation' value='$dateadd(0:30:00)' />
         </AND>
      </FILTER>
     </QUERY>
</REQUEST>`;
}
