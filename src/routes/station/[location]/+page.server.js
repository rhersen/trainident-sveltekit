import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { location } = params;

	const r = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
		method: 'POST',
		body: getBody({ location }),
		headers: {
			'Content-Type': 'application/xml',
			Accept: 'application/json'
		}
	});
	if (!r.ok) throw error(r.status, r.statusText);

	const { RESPONSE } = await r.json();
	const [announcements] = RESPONSE.RESULT;

	return { location, announcements: announcements.TrainAnnouncement };
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
               <GT name='AdvertisedTimeAtLocation' value='$dateadd(-1:05:00)' />
               <GT name='EstimatedTimeAtLocation' value='$dateadd(-1:05:00)' />
            </OR>
            <LT name='AdvertisedTimeAtLocation' value='$dateadd(1:30:00)' />
         </AND>
      </FILTER>
      <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
      <INCLUDE>AdvertisedTrainIdent</INCLUDE>
      <INCLUDE>Deviation</INCLUDE>
      <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
      <INCLUDE>FromLocation</INCLUDE>
      <INCLUDE>ProductInformation</INCLUDE>
      <INCLUDE>TimeAtLocation</INCLUDE>
      <INCLUDE>TimeAtLocationWithSeconds</INCLUDE>
      <INCLUDE>ToLocation</INCLUDE>
      <INCLUDE>TrackAtLocation</INCLUDE>
     </QUERY>
</REQUEST>`;
}
