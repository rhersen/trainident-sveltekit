import { error } from '@sveltejs/kit';
import announcements from '$lib/announcements.js';

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

	const [
		{
			AdvertisedTrainIdent,
			FromLocation,
			Operator,
			ProductInformation,
			ToLocation,
			TrainOwner,
			ViaToLocation
		}
	] = RESPONSE.RESULT[0].TrainAnnouncement;
	console.log({
		AdvertisedTrainIdent,
		FromLocation,
		Operator,
		ProductInformation,
		ToLocation,
		TrainOwner,
		ViaToLocation
	});
	return {
		AdvertisedTrainIdent,
		FromLocation,
		Operator,
		ProductInformation,
		ToLocation,
		TrainOwner,
		ViaToLocation,
		announcements: announcements(RESPONSE)
	};
};

function getBody({ id }) {
	return `
<REQUEST>
  <LOGIN authenticationkey='${process.env.TRAFIKVERKET_API_KEY}' />
     <QUERY objecttype='TrainAnnouncement' orderby='AdvertisedTimeAtLocation' schemaversion='1.6'>
      <FILTER>
         <AND>
            <NE name='Canceled' value='true' />
        		<EQ name='AdvertisedTrainIdent' value='${id}' />
            <OR>
               <GT name='AdvertisedTimeAtLocation' value='$dateadd(-12:00:00)' />
               <GT name='EstimatedTimeAtLocation' value='$dateadd(-12:00:00)' />
            </OR>
            <LT name='AdvertisedTimeAtLocation' value='$dateadd(12:00:00)' />
         </AND>
      </FILTER>
     </QUERY>
</REQUEST>`;
}
